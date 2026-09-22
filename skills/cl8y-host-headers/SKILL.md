---
name: cl8y-host-headers
description: >-
  Enforces Render clickjacking headers for the CL8Y marketing SPA
  (X-Frame-Options DENY and CSP frame-ancestors none). Use when editing
  render.yaml, host/CDN config, or adding any embeddable widget.
---

# CL8Y host clickjacking headers

For third-party agents working on `cl8y.com`. This skill is the operational
summary of GitLab issue #3. The host source of truth is
[`render.yaml`](../../render.yaml). Typed constants live in
[`src/content/invariants.ts`](../../src/content/invariants.ts)
(`CLICKJACKING_HEADERS`).

## When to use

- Editing `render.yaml` or Render dashboard headers
- Adding an iframe, wallet-connect, or third-party embed
- Checking production `curl -sI https://cl8y.com`

## Invariants

1. **Headers on every path.** `X-Frame-Options: DENY` and
   `Content-Security-Policy: frame-ancestors 'none'` are declared in
   `render.yaml` under `headers` for `/*`.
2. **Keep blog routes.** Do not delete the `/blog` rewrite rules or
   `VITE_SITE_ORIGIN` when touching headers.
3. **Reserved legal paths (#12).** When editing `render.yaml` routes, keep
   blog rewrites first, then reserved legal-guess rewrites (404 miss target),
   then `/* → /index.html`. See `src/lib/reservedLegalGuessPaths.ts`.
4. **No frameable wallet widget** on the marketing site.
5. **Host-only.** The static SPA cannot set these headers from HTML.

## Checks

```bash
yarn test
```

After deploy: `curl -sI https://cl8y.com` must show the headers.

## Cross-links

- Issue: GitLab `#3` (token directory `#2`, positioning `#1`)
- [`../cl8y-token-directory/SKILL.md`](../cl8y-token-directory/SKILL.md)
- [`../cl8y-site-positioning/SKILL.md`](../cl8y-site-positioning/SKILL.md)
- [`PROJECT_GUIDE.md`](../../PROJECT_GUIDE.md) §15b
- [`AGENTS.md`](../../AGENTS.md)
