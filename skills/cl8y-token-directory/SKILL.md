---
name: cl8y-token-directory
description: >-
  Enforces the official CL8Y token directory (addresses, listings, DEX-only
  venues, copy-to-clipboard). Use when editing token addresses, markets,
  listings, #token, links.ts, tokenDirectory.ts, or anything a visitor might
  copy as a contract address.
---

# CL8Y token directory

For third-party agents working on `cl8y.com`. This skill is the operational
summary of GitLab issue #2. The typed source of truth is
[`src/data/tokenDirectory.ts`](../../src/data/tokenDirectory.ts). Shared
positioning rules stay in
[`../cl8y-site-positioning/SKILL.md`](../cl8y-site-positioning/SKILL.md).

## When to use

- Changing `#token`, header/footer Token links, or directory copy
- Adding or removing a contract address, listing, or trade venue
- Touching clipboard / copy UX
- Tempted to add a CEX, Coinbase trade page, or “buy” button

## Invariants

1. **Single source.** Addresses, listings, and trade hrefs come from
   `src/data/tokenDirectory.ts`. UI must not hardcode TidalDex, contract
   strings, or explorer URLs.
2. **No CEX.** Trade rows are DEX / on-chain / aggregator only. Do not add
   Binance, Coinbase trade, Kraken, or similar. A Coinbase *price* page is
   not a venue; do not add it if it implies we list there.
3. **Three groups, labeled:** Addresses | Trade on DEX | Listings. Listings
   must not say “Trade on …”.
4. **CL8Y DEX first.** `https://dex.cl8y.com` is the primary trade venue.
   Third-party DEXes are alternatives, labeled by chain.
5. **Copy from the constant.** `copyText(row.address)` copies the typed
   address, not `innerText`. Show copied / failed feedback. No CDN clipboard
   helpers.
6. **Checksum.** BSC display and clipboard use EIP-55
   `0x8F452a1fdd388A45e1080992eFF051b4dd9048d2`. Terra Classic is shown in
   full. MegaETH uses `0xfBAa45A537cF07dC768c469FfaC4e88208B0098D`. Do not
   silently lowercase for display.
7. **Findable.** Header, footer, and hero link to `/#token`. Section `id` is
   `token`.
8. **Verify copy.** One line: only use addresses from this page; verify the
   explorer; do not paste addresses from messages.
9. **Compile-time hrefs.** https, known hosts, `target="_blank"` +
   `rel="noopener noreferrer"` (`ExternalLink`). No query/hash/user-input
   address substitution.
10. **Do not remount** `Institutional.tsx` or `HeroImageCard.tsx` to show
    markets. Those modules are retired.

## Checks

```bash
yarn test
yarn typecheck
yarn lint
yarn build
```

Search `src/data/tokenDirectory.ts`, `src/data/links.ts`, `PROJECT_GUIDE.md`,
and `dist/` for `ascendex.com` and CEX trade hosts. They must be absent.

## Cross-links

- Issue: GitLab `#2` (positioning `#1`, host headers `#3`)
- [`invariants.md`](invariants.md) — addresses, allowed hosts, copy rules
- [`src/content/invariants.ts`](../../src/content/invariants.ts)
- [`../cl8y-site-positioning/SKILL.md`](../cl8y-site-positioning/SKILL.md)
- [`../cl8y-host-headers/SKILL.md`](../cl8y-host-headers/SKILL.md)
- [`PROJECT_GUIDE.md`](../../PROJECT_GUIDE.md)
- [`AGENTS.md`](../../AGENTS.md)
