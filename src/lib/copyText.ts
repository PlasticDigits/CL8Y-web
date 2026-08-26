/**
 * Copy a compile-time string (token address) to the clipboard.
 * Pass the typed directory constant — never `element.innerText`.
 */

export type CopyTextResult =
  | { ok: true }
  | { ok: false; reason: "denied" | "unavailable" };

function fallbackCopy(value: string): CopyTextResult {
  if (typeof document === "undefined") {
    return { ok: false, reason: "unavailable" };
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, value.length);
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  document.body.removeChild(textarea);
  return copied ? { ok: true } : { ok: false, reason: "unavailable" };
}

export async function copyText(value: string): Promise<CopyTextResult> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return { ok: true };
    } catch {
      const fallback = fallbackCopy(value);
      if (fallback.ok) return fallback;
      return { ok: false, reason: "denied" };
    }
  }
  return fallbackCopy(value);
}
