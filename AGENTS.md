# Agent notes (CL8Y-web)

This is the marketing site for **CL8Y Bridge**, **CL8Y DEX**, and the CL8Y
utility token. Read these before changing visitor-facing copy or IA:

1. [`skills/cl8y-site-positioning/SKILL.md`](skills/cl8y-site-positioning/SKILL.md) — positioning
2. [`skills/cl8y-token-directory/SKILL.md`](skills/cl8y-token-directory/SKILL.md) — addresses / listings / DEX venues
3. [`skills/cl8y-host-headers/SKILL.md`](skills/cl8y-host-headers/SKILL.md) — Render clickjacking headers
4. [`src/content/invariants.ts`](src/content/invariants.ts) — typed invariants + banned terms
5. [`src/data/products.ts`](src/data/products.ts) — canonical product URLs
6. [`src/data/tokenDirectory.ts`](src/data/tokenDirectory.ts) — official token directory
7. [`src/data/copy.ts`](src/data/copy.ts) — current marketing strings
8. [`PROJECT_GUIDE.md`](PROJECT_GUIDE.md) and [`STYLE_GUIDE.md`](STYLE_GUIDE.md)

GitLab **#1** is the reposition. GitLab **#2** is the token directory
(`#token`). GitLab **#3** is host clickjacking headers in `render.yaml`.

Do not remount modules listed in `RETIRED_HOMEPAGE_MODULES`. Do not rewrite
`CL8Y_WHITEPAPER.md` as part of #1. Do not add CEX trade links.

```bash
yarn test
yarn typecheck
yarn lint
yarn build
```
