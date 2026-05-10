---
name: CL8Y blog voice & visuals
description: Voice, tone, and visual direction for CL8Y blog posts and blog_gen content. Use when drafting, editing, or generating posts for cl8y.com.
---

# CL8Y blog voice and art direction

## Overall stance

Write as part of the CL8Y team in a voice that is **positive**, **professional**, and **technically minded**. Assume readers care about cross chain infrastructure, DeFi, and shipping detail. Stay credible and calm. Celebrate progress and capability without hype or empty superlatives.

## Language and rhythm

- Target **2000 to 2500 words** for a full CL8Y blog post unless the user asks for a shorter announcement. If a draft is thin, add substance from primary project sources rather than padding.
- Prefer **natural flowing prose**. Most ideas should land in developed paragraphs that connect to each other.
- **Vary sentence length** by paragraph, not just by sentence. Some paragraphs can move quickly. Some can carry a longer explanation. Others can mix both. Avoid an even, mechanical cadence across the whole article.
- Use **full paragraphs** for full thoughts. Do not create fake paragraphs made from a single sentence unless the sentence is a deliberate beat that could not work inside the surrounding paragraph.
- Use **lists sparingly**. Numbered lists are only for ordered steps or ranked items. Unordered lists should be short labels or fragments, not disguised paragraphs.
- **Short sentences in isolation** can work for emphasis, but avoid a staccato rhythm where every thought becomes its own tiny paragraph.

## What to avoid (AI tells)

These patterns tend to read as generic model output and should not dominate CL8Y posts.

- **Punctuation mannerisms**: Do not lean on em dashes, semicolons, or colons. Use commas with restraint. A colon at the start of an explanation usually makes the line feel generated, so rewrite the sentence instead.
- **Structural cliches**: Avoid set piece contrasts like "X is not Y. X is Z" or "This is not about A. It is about B." These read like templates unless there is a sharp factual reason.
- **Hyphen habits**: Avoid dashed compounds in prose. Prefer onchain rather than the dashed spelling. Prefer plain two word phrases when they read naturally, such as high frequency, contract based, cross chain, and low latency. Keep dashes only for required names, command flags, URLs, and terms that would become confusing without them.
- **Smart quotes**: Use straight quotes and apostrophes only. Do not use curly quotes around words like "soon."
- **Over formatting**: No excessive fragments, stacked headings with no prose between them, or essay outlines that read like slides instead of an article.

## Lists and emphasis

Break flow with a list, a punchy short line, or a clearly marked strong point **only when it improves clarity**. The default should be paragraphs that carry the argument. Lists support the narrative. They do not replace it.

## Tone checkpoints

- Sound **confident and precise**, not promotional or defensive.
- Prefer **concrete detail** (what shipped, how it works, what users gain) over abstract mission statements.
- When adding length or detail, inspect the relevant primary source projects first. For this roadmap family, use repositories such as `github.com/PlasticDigits/yieldomega`, `github.com/PlasticDigits/cl8y-bridge-monorepo`, `github.com/PlasticDigits/cl8y-dex-terraclassic`, and `github.com/PlasticDigits/ustr-cmm`. Read the specific README, docs, contracts, or implementation files that support the claim being made. Do not infer product behavior from the repository name alone, and do not fill space with generic claims.
- Use source docs for accuracy, but write in CL8Y's own voice. Do not phrase official facts as "the docs say," "the repo shows," or "the README describes." We are the platform, so state the product behavior directly and link sources in references when useful.
- For roadmap posts, avoid fixed date promises unless the user provides an approved date. Explain that security risk and experimental technology set the pace. Emphasize accountability through public GitLab workboards, visible code, issues, comments, and work in progress.
- For **USTR**, **UST1**, and **CMM** writing, treat the `github.com/PlasticDigits/ustr-cmm` docs as the official source. Start with `docs/README.md`, then use `docs/ECONOMICS.md` for economics, unstablecoin mechanics, collateral ratio tiers, auctions, rolling distribution pools, and risk framing. CMM means **Collateralized Market Maker**. Do not call `ust1cmm.com` the CMM itself. It is the future CMM treasury view and the closed USTC to USTR swap window.
- Keep jargon **earned**. Define or contextualize terms when non specialists may read the piece.
- Treat **Terra Classic** as an active ecosystem with users, builders, liquidity, and history. Do not imply it is dead, forgotten, rescued by CL8Y, or only relevant as a recovery story. Frame CL8Y as additive infrastructure for Terra Classic, not as a replacement for it.

## Art and imagery (when describing or commissioning visuals)

- Align with CL8Y's existing site feel. Use **dark, refined UI**, **gold and aqua accents**, subtle depth, and restraint. Avoid neon spam, meme aesthetics, or generic "crypto moon" imagery.
- Imagery should feel **technical and trustworthy**. Good subjects include infrastructure, networks, liquidity, interfaces, or abstract geometry that suggests bridges and systems. Avoid clipart robots and lazy AI tropes.
- Prefer **clean composition**, readable contrast, and brand consistent color rather than busy collages.

## Blog image generation (Replicate)

Use **`blog_gen/generate_image.py`** when you need a raster for a post (hero, inline figure, Open Graph asset, etc.). It calls Replicate **`openai/gpt-image-2`** with the same practical rule as mature pipelines elsewhere. Run **one `predictions.create` per command**. Never wrap the create call in a retry loop, because proxies often drop long held HTTP responses *after* Replicate has already accepted the job, which duplicates spend. The script defaults to a **short wait on create** (see env below) and **polls the same prediction id** with resilient `reload()` retries.

**Setup**

- Copy **`blog_gen/.env.example`** to **`blog_gen/.env`** and set **`REPLICATE_API_TOKEN`** (or export it in the shell).
- Install deps in a venv (recommended on PEP 668 systems):

  ```bash
  cd blog_gen
  python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
  ```

**Typical run**

```bash
.venv/bin/python generate_image.py \
  --prompt "Your visual brief aligned with CL8Y art direction above..." \
  --output ../public/images/blog/your-slug-hero.jpg
```

Use **`--prompt-file`** for long briefs, **`--input-image`** (repeatable) for reference frames, and **`--aspect-ratio`** / **`--quality`** / **`--output-format`** as needed. Defaults lean toward blog heroes (`--aspect-ratio 3:2`, `--quality high`, JPEG).

For blog post frontmatter, reference the generated public asset path:

```yaml
image: /images/blog/your-slug-hero.jpg
```

Do **not** copy blog post images into `src/blog/assets`. Keep the published raster in `public/images/blog` only, so the same URL works for the article hero, Open Graph tags, Twitter cards, RSS consumers, and prerendered pages.

For Open Graph and social preview images, make the prompt title-led and bold:

- Include the article title as large, readable editorial typography inside the image.
- Keep important text and focal elements away from the outer edges so social crops still read clearly.
- Make the composition thematic to the article, not just brand atmosphere. For roadmap posts, show the actual systems in the story: CMM treasury, bridge routes, Terra Classic liquidity, YieldOmega, UST1, DEX depth, or money market structure.
- Use stronger contrast, clearer hierarchy, and fewer tiny details than an inline illustration. A social card needs to work at small preview sizes.
- Avoid generic crypto motifs, unlabeled abstract wallpaper, and images without text unless the user explicitly asks for a textless inline figure.

**If local polling fails but Replicate is still working**

1. **`--submit-only`** submits **exactly one** prediction, prints **prediction id** and dashboard URL, then exits without polling.
2. When the run shows **succeeded** on Replicate, **`--fetch PREDICTION_ID_OR_URL --output ...`** polls only if still running, then downloads bytes (**no second create**).

**Optional environment**

- **`REPLICATE_MAX_GENERATION_SECONDS`** sets the wall clock poll cap (default `600`).
- **`REPLICATE_CREATE_WAIT_SECONDS`** sets the preferred `wait` on create, `1` to `60` (default `1`). This avoids long lived create requests that middleboxes cut off.

**Verified**. A smoke run produced a valid JPEG (JFIF, 1536x1024) via this script on Replicate `openai/gpt-image-2`.

## Final pass

Before publishing, do a final grammar pass paragraph by paragraph. Catch unfinished sentences, dangling comparisons, bad tense, missing subjects or objects, repeated sentence shapes, mechanical repetition, punctuation tics, list heavy stretches, dashed compounds, smart quotes, and fake one sentence paragraphs. The goal is an article that reads like a careful human edit. It should feel smooth, specific, and quietly authoritative.
