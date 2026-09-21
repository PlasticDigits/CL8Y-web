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
9. [`docs/architecture.md`](docs/architecture.md) — SPA map + Forgejo merge gate (four CODEOWNERS paths: root, `docs/`, `.gitea/`, `.forgejo/`). Catch-all CODEOWNERS: [`docs/adr/0001-remove-catchall-codeowners.md`](docs/adr/0001-remove-catchall-codeowners.md) ([#14](https://git.cl8y.com/code/CL8Y-web/issues/14)).
10. Weekly blog drafts + vector search live in **[`cl8y-research`](https://gitlab.com/PlasticDigits/cl8y-research)** ([#1](https://gitlab.com/PlasticDigits/cl8y-research/-/issues/1), moved from this repo's #4). Skills: [`cl8y-research-worker`](https://gitlab.com/PlasticDigits/cl8y-research/-/blob/main/skills/cl8y-research-worker/SKILL.md), [`cl8y-research-search`](https://gitlab.com/PlasticDigits/cl8y-research/-/blob/main/skills/cl8y-research-search/SKILL.md). Voice remains [`blog_gen/SKILL.md`](blog_gen/SKILL.md).

GitLab **#1** is the reposition. GitLab **#2** is the token directory
(`#token`). GitLab **#3** is host clickjacking headers in `render.yaml`.
The weekly worker is **not** in this SPA; see `cl8y-research`.

Do not remount modules listed in `RETIRED_HOMEPAGE_MODULES`. Do not rewrite
`CL8Y_WHITEPAPER.md` as part of #1. Do not add CEX trade links.

```bash
yarn test
yarn typecheck
yarn lint
yarn build
```
