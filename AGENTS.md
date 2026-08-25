# Agent notes (CL8Y-web)

This is the marketing site for **CL8Y Bridge**, **CL8Y DEX**, and the CL8Y
utility token. Read these before changing visitor-facing copy or IA:

1. [`skills/cl8y-site-positioning/SKILL.md`](skills/cl8y-site-positioning/SKILL.md) — third-party agent skill
2. [`src/content/invariants.ts`](src/content/invariants.ts) — typed invariants + banned terms
3. [`src/data/products.ts`](src/data/products.ts) — canonical product URLs
4. [`src/data/copy.ts`](src/data/copy.ts) — current marketing strings
5. [`PROJECT_GUIDE.md`](PROJECT_GUIDE.md) and [`STYLE_GUIDE.md`](STYLE_GUIDE.md)

GitLab **#1** is the reposition. GitLab **#2** is the token directory — leave
`#token` as a placeholder unless you are on that issue.

Do not remount modules listed in `RETIRED_HOMEPAGE_MODULES`. Do not rewrite
`CL8Y_WHITEPAPER.md` as part of #1.

```bash
yarn test
yarn typecheck
yarn lint
yarn build
```
