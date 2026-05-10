#!/usr/bin/env python3
# SPDX-License-Identifier: AGPL-3.0-only
"""Generate one blog image via Replicate ``openai/gpt-image-2``.

Designed for agents drafting CL8Y posts: **one create per invocation** — no outer
retries around ``predictions.create`` (retries duplicate spend). Long HTTP ``wait``
on create often hits proxy disconnects *after* Replicate already queued the job;
this script defaults to a **short** create wait and polls the **same** prediction id.

Environment:

  ``REPLICATE_API_TOKEN`` — required (see ``.env.example``).

  Optional:

  - ``REPLICATE_MAX_GENERATION_SECONDS`` — poll wall-clock cap (default ``600``).
  - ``REPLICATE_CREATE_WAIT_SECONDS`` — Prefer: wait on create, 1–60 (default ``1``).

Examples::

  cd blog_gen
  python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
  export REPLICATE_API_TOKEN=...
  python3 generate_image.py --prompt "Dark UI hero, aqua and gold..." --output ../public/images/blog/hero.jpg

  # Only enqueue; if local polling breaks, finish via dashboard then:
  python3 generate_image.py --submit-only --prompt "..." 
  python3 generate_image.py --fetch xxxxxxxxxxxx --output ../public/images/blog/hero.jpg

  python3 generate_image.py --prompt-file ./prompt.txt --input-image ./ref.png --output ./out.png
"""

from __future__ import annotations

import argparse
import os
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

MODEL_OWNER = "openai"
MODEL_NAME = "gpt-image-2"

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent

DEFAULT_MAX_GENERATION_SECONDS = 600.0
_DEFAULT_CREATE_WAIT = 1


def load_env() -> None:
    try:
        from dotenv import load_dotenv
    except ImportError:
        return
    load_dotenv(REPO_ROOT / ".env")
    load_dotenv(SCRIPT_DIR / ".env")


def _create_wait_seconds() -> int:
    raw = os.environ.get("REPLICATE_CREATE_WAIT_SECONDS", "").strip()
    if raw:
        try:
            return max(1, min(60, int(raw)))
        except ValueError:
            pass
    return _DEFAULT_CREATE_WAIT


def max_generation_seconds() -> float:
    raw = os.environ.get("REPLICATE_MAX_GENERATION_SECONDS", "").strip()
    if not raw:
        return DEFAULT_MAX_GENERATION_SECONDS
    return max(60.0, float(raw))


def _is_transient_network_error(exc: BaseException) -> bool:
    text = f"{type(exc).__name__}: {exc!s}".lower()
    return any(
        n in text
        for n in (
            "remoteprotocolerror",
            "disconnected",
            "connection reset",
            "connection aborted",
            "broken pipe",
            "eof",
            "timed out",
            "timeout",
            "temporarily unavailable",
            "502",
            "503",
            "504",
        )
    )


def _reload_prediction_resilient(prediction: object, *, job_label: str) -> None:
    net_errors = 0
    while True:
        try:
            prediction.reload()
            return
        except Exception as exc:
            if not _is_transient_network_error(exc) or net_errors >= 40:
                raise
            net_errors += 1
            wait = min(8.0, 0.35 * net_errors + 0.15 * (net_errors**1.5))
            pid = getattr(prediction, "id", "?")
            print(
                f"[{job_label}] reload flake ({exc!s}); same prediction "
                f"https://replicate.com/p/{pid} retry {net_errors}/40 in {wait:.1f}s…",
                file=sys.stderr,
            )
            time.sleep(wait)


def wait_prediction_bounded(
    prediction: object,
    client: object,
    *,
    max_seconds: float,
    job_label: str,
    poll_progress: bool,
) -> None:
    from replicate.exceptions import ModelError

    t0 = time.monotonic()
    last_log = t0
    poll_interval = float(getattr(client, "poll_interval", 0.5))
    while getattr(prediction, "status", "") not in ("succeeded", "failed", "canceled"):
        now = time.monotonic()
        if poll_progress and now - last_log >= 30.0 and now - t0 < max_seconds:
            elapsed = now - t0
            print(
                f"[{job_label}] status={getattr(prediction, 'status', '?')!r} "
                f"{elapsed:.0f}s / {max_seconds:.0f}s",
                file=sys.stderr,
            )
            last_log = now
        if now - t0 > max_seconds:
            try:
                prediction.cancel()
            except Exception as exc:
                print(
                    f"[{job_label}] deadline cancel failed (check dashboard): {exc}",
                    file=sys.stderr,
                )
            pid = getattr(prediction, "id", "?")
            raise TimeoutError(
                f"{job_label}: exceeded {max_seconds:.0f}s; prediction_id={pid} "
                f"last_status={getattr(prediction, 'status', '?')} "
                f"https://replicate.com/p/{pid}"
            )
        time.sleep(poll_interval)
        _reload_prediction_resilient(prediction, job_label=job_label)

    if prediction.status == "failed":
        raise ModelError(prediction)
    if prediction.status == "canceled":
        raise RuntimeError(f"{job_label}: prediction {prediction.id} canceled")
    if prediction.status != "succeeded":
        raise RuntimeError(
            f"{job_label}: unexpected status {prediction.status!r} id={prediction.id}"
        )


def _parse_prediction_id(raw: str) -> str:
    s = raw.strip()
    m = re.search(r"replicate\.com/p/([a-z0-9]+)", s, re.I)
    if m:
        return m.group(1)
    if re.fullmatch(r"[a-z0-9]+", s, re.I):
        return s
    raise ValueError(f"Could not parse prediction id from: {raw!r}")


def _output_url_from_prediction(pred: object) -> str:
    out = getattr(pred, "output", None)
    if out is None:
        raise RuntimeError("Prediction has no output.")
    if isinstance(out, list):
        if not out:
            raise RuntimeError("Prediction output is an empty list.")
        out = out[0]
    if isinstance(out, str) and out.startswith("http"):
        return out
    url = getattr(out, "url", None)
    if isinstance(url, str) and url.startswith("http"):
        return url
    raise RuntimeError(f"Unexpected prediction.output type: {type(out)!r}")


def _download_url(url: str, *, job_label: str) -> bytes:
    last: BaseException | None = None
    for attempt in range(1, 6):
        try:
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "cl8y-blog-gen/1.0"},
            )
            with urllib.request.urlopen(req, timeout=300) as resp:
                data = resp.read()
            if len(data) < 512:
                raise RuntimeError(f"short download: {len(data)} bytes")
            return data
        except (urllib.error.URLError, TimeoutError, OSError, RuntimeError) as exc:
            last = exc
            if attempt >= 5:
                break
            wait = min(45.0, 3.0 * attempt)
            print(
                f"[{job_label}] GET failed ({exc!r}); retry {attempt}/5 in {wait:.0f}s",
                file=sys.stderr,
            )
            time.sleep(wait)
    assert last is not None
    raise last


def build_input(
    *,
    prompt: str,
    aspect_ratio: str,
    quality: str,
    moderation: str,
    background: str,
    output_format: str,
    output_compression: int,
    input_image_paths: list[Path],
) -> dict:
    inp: dict = {
        "prompt": prompt.strip(),
        "aspect_ratio": aspect_ratio,
        "quality": quality,
        "moderation": moderation,
        "background": background,
        "output_format": output_format,
        "number_of_images": 1,
        "output_compression": output_compression,
        "input_images": [],
    }
    if input_image_paths:
        inp["input_images"] = [open(p, "rb") for p in input_image_paths]
    return inp


def close_input_handles(inp: dict) -> None:
    handles = inp.get("input_images") or []
    if not handles:
        return
    for h in handles:
        try:
            h.close()
        except Exception:
            pass
    inp["input_images"] = []


def cmd_fetch(
    *,
    prediction_ref: str,
    output_path: Path,
    max_seconds: float,
    poll_progress: bool,
) -> int:
    import replicate

    token = os.environ.get("REPLICATE_API_TOKEN", "").strip()
    if not token:
        print("Error: REPLICATE_API_TOKEN is not set.", file=sys.stderr)
        return 2
    os.environ["REPLICATE_API_TOKEN"] = token

    client = replicate.Client()
    pid = _parse_prediction_id(prediction_ref)
    prediction = client.predictions.get(pid)
    label = "fetch"

    if prediction.status not in ("succeeded", "failed", "canceled"):
        print(
            f"[{label}] polling existing prediction https://replicate.com/p/{pid}",
            file=sys.stderr,
        )
        wait_prediction_bounded(
            prediction,
            client,
            max_seconds=max_seconds,
            job_label=label,
            poll_progress=poll_progress,
        )

    if prediction.status != "succeeded":
        print(
            f"Error: prediction {pid} status={prediction.status!r} (need succeeded).",
            file=sys.stderr,
        )
        return 1

    url = _output_url_from_prediction(prediction)
    data = _download_url(url, job_label=label)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(data)
    print(f"[ok] {output_path} ({len(data)} bytes)")
    return 0


def cmd_generate_or_submit(
    *,
    prompt: str,
    output_path: Path | None,
    submit_only: bool,
    aspect_ratio: str,
    quality: str,
    moderation: str,
    background: str,
    output_format: str,
    output_compression: int,
    input_image_paths: list[Path],
    create_wait: int,
    max_seconds: float,
    poll_progress: bool,
) -> int:
    import replicate

    from replicate.helpers import transform_output

    token = os.environ.get("REPLICATE_API_TOKEN", "").strip()
    if not token:
        print("Error: REPLICATE_API_TOKEN is not set.", file=sys.stderr)
        return 2
    os.environ["REPLICATE_API_TOKEN"] = token

    missing = [p for p in input_image_paths if not p.is_file()]
    if missing:
        print("Error: input image file(s) not found:", file=sys.stderr)
        for p in missing:
            print(f"  {p}", file=sys.stderr)
        return 1

    inp = build_input(
        prompt=prompt,
        aspect_ratio=aspect_ratio,
        quality=quality,
        moderation=moderation,
        background=background,
        output_format=output_format,
        output_compression=output_compression,
        input_image_paths=input_image_paths,
    )

    client = replicate.Client()
    label = "gpt-image-2"

    try:
        print(
            f"[{label}] creating prediction (wait={create_wait}s, single request — no create retries)…",
            file=sys.stderr,
        )
        prediction = client.models.predictions.create(
            model=(MODEL_OWNER, MODEL_NAME),
            input=inp,
            wait=create_wait,
        )
    finally:
        close_input_handles(inp)

    pid = getattr(prediction, "id", "?")
    url = f"https://replicate.com/p/{pid}"
    print(f"[{label}] prediction_id={pid}\n[{label}] {url}", file=sys.stderr)

    if submit_only:
        print(pid)
        print(url)
        return 0

    assert output_path is not None
    wait_prediction_bounded(
        prediction,
        client,
        max_seconds=max_seconds,
        job_label=label,
        poll_progress=poll_progress,
    )

    out = transform_output(prediction.output, client)
    first = out[0] if isinstance(out, (list, tuple)) else out
    if hasattr(first, "read"):
        data = first.read()
        if not isinstance(data, bytes):
            raise RuntimeError(f"read() did not return bytes: {type(data)}")
    elif isinstance(first, str) and first.startswith("http"):
        data = _download_url(first, job_label=label)
    else:
        raise RuntimeError(f"Unexpected output type: {type(first)}")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(data)
    print(f"[ok] {output_path} ({len(data)} bytes)")
    return 0


def main() -> int:
    load_env()

    p = argparse.ArgumentParser(
        description="Generate one image via Replicate openai/gpt-image-2 (single create per run)."
    )
    p.add_argument(
        "--fetch",
        metavar="PREDICTION_ID_OR_URL",
        default="",
        help="Download a finished prediction (polls if still running). No model create.",
    )
    p.add_argument(
        "--submit-only",
        action="store_true",
        help=(
            "Enqueue exactly one prediction, print id and URL, exit without polling. "
            "Use --fetch after the run succeeds if local polling fails."
        ),
    )
    src = p.add_mutually_exclusive_group(required=False)
    src.add_argument("--prompt", default="", help="Generation prompt text.")
    src.add_argument(
        "--prompt-file",
        type=Path,
        help="Read prompt from file (UTF-8).",
    )
    p.add_argument(
        "--output",
        type=Path,
        default=None,
        help="Write image bytes here (required unless --submit-only or --fetch).",
    )
    p.add_argument(
        "--input-image",
        type=Path,
        action="append",
        default=[],
        metavar="PATH",
        help="Reference image (repeatable). Passed as input_images to the model.",
    )
    p.add_argument(
        "--aspect-ratio",
        choices=("1:1", "3:2", "2:3"),
        default="3:2",
    )
    p.add_argument(
        "--quality",
        choices=("low", "medium", "high", "auto"),
        default="high",
    )
    p.add_argument(
        "--moderation",
        choices=("auto", "low"),
        default="auto",
    )
    p.add_argument(
        "--background",
        choices=("auto", "opaque", "transparent"),
        default="opaque",
    )
    p.add_argument(
        "--output-format",
        choices=("jpeg", "png", "webp"),
        default="jpeg",
    )
    p.add_argument("--output-compression", type=int, default=90, metavar="PCT")
    p.add_argument(
        "--max-seconds",
        type=float,
        default=None,
        metavar="SEC",
        help=f"Poll cap (default from env or {DEFAULT_MAX_GENERATION_SECONDS:.0f}).",
    )
    p.add_argument(
        "--poll-progress",
        action="store_true",
        help="Log status every ~30s while polling.",
    )

    args = p.parse_args()

    fetch_ref = args.fetch.strip()
    if fetch_ref:
        if not args.output:
            print("Error: --fetch requires --output.", file=sys.stderr)
            return 1
        wall = args.max_seconds if args.max_seconds is not None else max_generation_seconds()
        return cmd_fetch(
            prediction_ref=fetch_ref,
            output_path=args.output.resolve(),
            max_seconds=wall,
            poll_progress=args.poll_progress,
        )

    prompt = args.prompt.strip()
    if args.prompt_file:
        prompt_path = args.prompt_file.resolve()
        if not prompt_path.is_file():
            print(f"Error: prompt file not found: {prompt_path}", file=sys.stderr)
            return 1
        prompt = prompt_path.read_text(encoding="utf-8").strip()
    if not prompt:
        print("Error: provide --prompt or --prompt-file (unless using --fetch).", file=sys.stderr)
        return 1

    if not args.submit_only:
        if args.output is None:
            print("Error: --output is required unless --submit-only or --fetch.", file=sys.stderr)
            return 1

    wall = args.max_seconds if args.max_seconds is not None else max_generation_seconds()
    create_wait = _create_wait_seconds()

    paths = [x.resolve() for x in args.input_image]

    return cmd_generate_or_submit(
        prompt=prompt,
        output_path=args.output.resolve() if args.output else None,
        submit_only=args.submit_only,
        aspect_ratio=args.aspect_ratio,
        quality=args.quality,
        moderation=args.moderation,
        background=args.background,
        output_format=args.output_format,
        output_compression=args.output_compression,
        input_image_paths=paths,
        create_wait=create_wait,
        max_seconds=wall,
        poll_progress=args.poll_progress,
    )


if __name__ == "__main__":
    raise SystemExit(main())
