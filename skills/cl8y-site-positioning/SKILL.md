---
name: cl8y-site-positioning
description: >-
  Enforces CL8Y marketing-site positioning (Bridge + DEX + utility token, tight
  copy). Use when editing homepage copy, CTAs, SEO, chrome, STYLE_GUIDE,
  PROJECT_GUIDE, or anything a visitor or share card can see.
---

# CL8Y marketing-site positioning

For third-party agents working on `cl8y.com`. This skill is the operational
summary of GitLab issue #1. The typed source of truth is
[`src/content/invariants.ts`](../../src/content/invariants.ts). Product URLs
live in [`src/data/products.ts`](../../src/data/products.ts). Visitor-facing
strings live in [`src/data/copy.ts`](../../src/data/copy.ts).

## When to use

- Changing hero, products, utility, trust, community, footer, header, or `index.html`
- Adding a CTA, nav item, or meta/OG/Twitter tag
- Editing `STYLE_GUIDE.md` or `PROJECT_GUIDE.md`
- Tempted to remount a retired section or add a “buy” button

## Invariants

1. **Products first.** Primary CTAs are exactly `https://bridge.cl8y.com` and
   `https://dex.cl8y.com`. Import `PRODUCT_URLS`. Do not build these from query,
   hash, or `window.location`.
2. **Token job.** CL8Y is a decentralized utility token for **reduced fees on
   CL8Y DEX trading tiers**. Do not invent tier names, thresholds, or percents.
   Link to the DEX for the live schedule.
3. **Tight copy.** Headline ≤ ~8 words. Subhead ≤ 1 sentence. Section body ≤ 2
   short sentences. The footer explainer is the only long-form marketing copy.
4. **Do not lead with** retired narrative (lore titles, burn-scarcity sales,
   fake tickers, CEX “buy” energy). See
   [`invariants.md`](invariants.md) for the banned-term list.
5. **Token directory is #2.** Official addresses, listings, and DEX venues
   live in [`src/data/tokenDirectory.ts`](../../src/data/tokenDirectory.ts).
   See [`../cl8y-token-directory/SKILL.md`](../cl8y-token-directory/SKILL.md).
6. **Do not rewrite** `CL8Y_WHITEPAPER.md`. Historical PDFs may stay in the
   footer, labeled historical.
7. **Links.** `target="_blank"` requires `rel="noopener noreferrer"`
   (`EXTERNAL_REL` / `ExternalLink`). No `javascript:` hrefs, no open redirects.
8. **Motion.** Respect `prefers-reduced-motion`. No autoplaying fake market
   activity. Do not remount `BuyTicker`.
9. **Legal.** Keep disclaimer + law-enforcement text and
   `contact@ceramicliberty.com`. No return promises.
10. **Stack.** Vite + React + Tailwind + Framer Motion static SPA. No SSR, no
    wallet-connect requirement on the marketing page.
11. **Forgejo CODEOWNERS.** Do not add catch-all `CODEOWNERS` at repo root,
    `docs/`, `.gitea/`, or `.forgejo/` (CO14-1/2). Merge gate is host CI, not
    planted reviews — see [`docs/architecture.md`](../../docs/architecture.md#forgejo-merge-gate).

## Do not remount

These modules are retired from `/`. Routes that used to render them now
redirect. See `RETIRED_HOMEPAGE_MODULES` in `src/content/invariants.ts`.

## Checks

```bash
yarn test
yarn typecheck
yarn lint
yarn build
```

Search the **rendered** homepage and `index.html` for banned terms before you
call the work done. Brand docs must not contradict the live page.

## Cross-links

- Issue: GitLab `#1` (token directory `#2`, host headers `#3`)
- [`invariants.md`](invariants.md) — banned terms, IA, host headers
- [`../cl8y-token-directory/SKILL.md`](../cl8y-token-directory/SKILL.md)
- [`../cl8y-host-headers/SKILL.md`](../cl8y-host-headers/SKILL.md)
- [`PROJECT_GUIDE.md`](../../PROJECT_GUIDE.md)
- [`STYLE_GUIDE.md`](../../STYLE_GUIDE.md)
- [`AGENTS.md`](../../AGENTS.md)
- [`docs/adr/0001-remove-catchall-codeowners.md`](../../docs/adr/0001-remove-catchall-codeowners.md) — #14 / CO14
