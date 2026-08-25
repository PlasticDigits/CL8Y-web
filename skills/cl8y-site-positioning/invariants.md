# Positioning invariants (detail)

Canonical typed list: [`src/content/invariants.ts`](../../src/content/invariants.ts).

## Product URLs

| Product | Exact href |
| --- | --- |
| CL8Y Bridge | `https://bridge.cl8y.com` |
| CL8Y DEX | `https://dex.cl8y.com` |

Reject: `@` userinfo, `?url=` / `?next=` redirectors, protocol-relative URLs,
`javascript:`, extra subdomains, trailing slash variants used as the stored
constant.

## Banned on current-product surfaces

Do not use these on the homepage, chrome, `index.html` meta, or brand docs that
describe the *current* site (except a historical-PDF label):

`GameFi`, `PROTOCASS`, `Karnyx`, `TigerHunt`, `UST1`, `USTR`, `memecoin`,
`AscendEX`, `Buy CL8Y`, `Autoscarcity`, `the future of DeFi`, `expensive token`.

Prefer not to use “ecosystem” as the lead.

## Current homepage IA

1. Header — logo, Bridge, DEX, Token (`#token`), Community
2. Hero — utility one-liner + Open Bridge + Open DEX
3. Products — one sentence each
4. Utility — fee tiers, no invented table
5. Trust — canceler network + 5-minute delay + audit
6. Token placeholder — GitLab #2
7. Community — Telegram + X from `src/data/links.ts`
8. Footer — explainer, docs, disclaimer, law enforcement

## Legacy routes

`/engine`, `/security`, `/tokenomics`, `/community`, `/institutional` redirect
into the new page. `/cl8y_whitepaper` still opens the historical PDF.

## Host headers (production)

This is a static SPA. Production should send `X-Frame-Options: DENY` or
`Content-Security-Policy: frame-ancestors 'none'`. Do not add a frameable
wallet widget. Documented in `PROJECT_GUIDE.md`.

## Out of scope (this issue)

- Token address / listings / venue directory (GitLab #2)
- Rewriting `CL8Y_WHITEPAPER.md`
- Bridge or DEX application code
- New CEX or broker integrations
