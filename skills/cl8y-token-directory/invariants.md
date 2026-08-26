# Token directory invariants (detail)

Canonical typed list: [`src/data/tokenDirectory.ts`](../../src/data/tokenDirectory.ts).

## Official addresses

| Chain | Standard | Address | Explorer |
| --- | --- | --- | --- |
| BNB Smart Chain | ERC-20 | `0x8F452a1fdd388A45e1080992eFF051b4dd9048d2` | BscScan token page |
| Terra Classic | CW20 | `terra16wtml2q66g82fdkx66tap0qjkahqwp4lwq3ngtygacg5q0kzycgqvhpax3` | Terra Finder classic |
| MegaETH | ERC-20 | `0xfBAa45A537cF07dC768c469FfaC4e88208B0098D` | MegaETH explorer |

`VITE_CL8Y_ADDRESS` defaults must match the BSC row (checksum), via import.
MegaETH is included because it is an official deployment already on `main`.
Do not invent extra chain addresses without a confirmed official deployment.

## Trade venues (DEX only)

Order:

1. CL8Y DEX — `https://dex.cl8y.com` (primary; pair is live)
2. TidalDex (BNB Smart Chain)
3. PancakeSwap (BNB Smart Chain)
4. Uniswap BNB token page
5. GDEX (Terra Classic)
6. Kumbaya (MegaETH)
7. SIR (MegaETH)

Reject: CEX hosts, punycode lookalikes, `cl8y.com.<attacker>` redirectors,
`javascript:`, open redirects.

## Listings

Price / analytics pages only. Do not label them as trade. Coinbase price is
omitted so we do not imply a Coinbase listing.

GeckoTerminal must use the **pool** id `0xBe9F06b76e301b49Dc345948a7a5E3418264886A`,
not the token address.

## Copy UX

- Clipboard writes the typed `address` field.
- Success: visible “Copied”.
- Permission denied / insecure context: visible failure; address stays selectable.
- Toast / status text is static. Never inject the address as HTML.

## Language

Do not use “More exchanges”, “Buy CL8Y”, or CEX names on current-product
surfaces. Prefer “Trade on DEX” / “Other DEX markets”.
