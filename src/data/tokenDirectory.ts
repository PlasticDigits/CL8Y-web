/**
 * Official token directory (GitLab #2).
 *
 * This module is the only source of visitor-facing contract addresses,
 * listings, and trade venues. Do not read addresses from query strings,
 * `window.location`, or third-party APIs. Do not add CEX trade links.
 *
 * Copy-to-clipboard must use the `address` field on these constants — never
 * `event.target.innerText` from a mutable DOM node.
 *
 * @see src/content/invariants.ts
 * @see skills/cl8y-token-directory/SKILL.md
 */

import { CANONICAL_PRODUCT_URLS } from "../content/invariants";

export type TokenStandard = "ERC-20" | "CW20";

export type TokenAddress = {
  id: string;
  chain: string;
  address: string;
  explorerUrl: string;
  explorerLabel: string;
  standard: TokenStandard;
};

export type DirectoryListing = {
  id: string;
  label: string;
  href: string;
  kind: "price" | "analytics";
};

export type TradeVenue = {
  id: string;
  label: string;
  href: string;
  chain: string;
  primary?: boolean;
};

/** EIP-55 checksum. Display and clipboard must use this exact string. */
export const BSC_CL8Y_ADDRESS = "0x8F452a1fdd388A45e1080992eFF051b4dd9048d2";

export const TERRA_CLASSIC_CL8Y_ADDRESS =
  "terra16wtml2q66g82fdkx66tap0qjkahqwp4lwq3ngtygacg5q0kzycgqvhpax3";

/** EIP-55 checksum. Official MegaETH deployment already shipped on main. */
export const MEGAETH_CL8Y_ADDRESS = "0xfBAa45A537cF07dC768c469FfaC4e88208B0098D";

/** TidalDex CL8Y/CZUSD pool (not the token address). */
export const BSC_CL8Y_POOL_ADDRESS = "0xBe9F06b76e301b49Dc345948a7a5E3418264886A";

export const TOKEN_ADDRESSES: readonly TokenAddress[] = [
  {
    id: "bsc",
    chain: "BNB Smart Chain",
    address: BSC_CL8Y_ADDRESS,
    explorerUrl: `https://bscscan.com/token/${BSC_CL8Y_ADDRESS}`,
    explorerLabel: "BscScan",
    standard: "ERC-20",
  },
  {
    id: "terra-classic",
    chain: "Terra Classic",
    address: TERRA_CLASSIC_CL8Y_ADDRESS,
    explorerUrl: `https://finder.terra.money/classic/address/${TERRA_CLASSIC_CL8Y_ADDRESS}`,
    explorerLabel: "Terra Finder",
    standard: "CW20",
  },
  {
    id: "megaeth",
    chain: "MegaETH",
    address: MEGAETH_CL8Y_ADDRESS,
    explorerUrl: `https://mega.etherscan.io/token/${MEGAETH_CL8Y_ADDRESS}`,
    explorerLabel: "MegaETH explorer",
    standard: "ERC-20",
  },
];

/**
 * DEX / on-chain venues only. CL8Y DEX is first: https://dex.cl8y.com returns
 * 200 with a live pair. Third-party rows are alternatives, labeled by chain.
 * MegaETH venues (Kumbaya, SIR) were already official on main.
 */
export const TRADE_VENUES: readonly TradeVenue[] = [
  {
    id: "cl8y-dex",
    label: "CL8Y DEX",
    href: CANONICAL_PRODUCT_URLS.dex,
    chain: "Official",
    primary: true,
  },
  {
    id: "tidaldex-bsc",
    label: "TidalDex",
    href: `https://tidaldex.com/swap?outputCurrency=${BSC_CL8Y_ADDRESS}`,
    chain: "BNB Smart Chain",
  },
  {
    id: "pancakeswap-dex",
    label: "PancakeSwap",
    href: `https://pancakeswap.finance/swap?outputCurrency=${BSC_CL8Y_ADDRESS}`,
    chain: "BNB Smart Chain",
  },
  {
    id: "uniswap-bnb",
    label: "Uniswap",
    href: `https://app.uniswap.org/explore/tokens/bnb/${BSC_CL8Y_ADDRESS}`,
    chain: "BNB Smart Chain",
  },
  {
    id: "gdex-terra",
    label: "GDEX",
    href: "https://garuda-defi.org/market/terra1kkrwna59jzpvsp7n4l3xdt72rmejcz5d2xaezxl29zvkssn7vvtqmtmemv",
    chain: "Terra Classic",
  },
  {
    id: "kumbaya-megaeth",
    label: "Kumbaya",
    href: `https://www.kumbaya.xyz/#/swap?outputCurrency=${MEGAETH_CL8Y_ADDRESS}&confirmed=1`,
    chain: "MegaETH",
  },
  {
    id: "sir-megaeth",
    label: "SIR",
    href: "https://app.sir.trading/liquidity?chainid=4326&vault=17",
    chain: "MegaETH",
  },
];

/** Price and analytics pages. Not trade venues. Coinbase price page omitted. */
export const TOKEN_LISTINGS: readonly DirectoryListing[] = [
  {
    id: "coingecko",
    label: "CoinGecko",
    href: "https://www.coingecko.com/en/coins/ceramicliberty-com",
    kind: "price",
  },
  {
    id: "coinpaprika",
    label: "CoinPaprika",
    href: "https://coinpaprika.com/coin/cl8y-ceramiclibertycom/",
    kind: "price",
  },
  {
    id: "coincarp",
    label: "CoinCarp",
    href: "https://www.coincarp.com/currencies/ceramicliberty/",
    kind: "price",
  },
  {
    id: "coinranking",
    label: "Coinranking",
    href: "https://coinranking.com/coin/XmAt7eSt8+ceramiclibertycom-cl8y/",
    kind: "price",
  },
  {
    id: "dropstab",
    label: "DropsTab",
    href: "https://dropstab.com/coins/ceramicliberty-com",
    kind: "price",
  },
  {
    id: "blockspot",
    label: "Blockspot",
    href: "https://blockspot.io/coin/ceramicliberty-com/",
    kind: "price",
  },
  {
    id: "beincrypto",
    label: "BeInCrypto",
    href: "https://beincrypto.com/price/ceramicliberty-com/",
    kind: "price",
  },
  {
    id: "czodiac",
    label: "CZodiac",
    href: "https://czodiac.com",
    kind: "analytics",
  },
  {
    id: "dexscreener",
    label: "DexScreener",
    href: `https://dexscreener.com/bsc/${BSC_CL8Y_POOL_ADDRESS.toLowerCase()}`,
    kind: "analytics",
  },
  {
    id: "geckoterminal",
    label: "GeckoTerminal",
    href: `https://www.geckoterminal.com/bsc/pools/${BSC_CL8Y_POOL_ADDRESS}`,
    kind: "analytics",
  },
  {
    id: "dextools",
    label: "DexTools",
    href: "https://www.dextools.io/app/en/token/cl8y",
    kind: "analytics",
  },
  {
    id: "bscscan-token",
    label: "BscScan",
    href: `https://bscscan.com/token/${BSC_CL8Y_ADDRESS}`,
    kind: "analytics",
  },
  {
    id: "luncscan",
    label: "LUNCScan",
    href: `https://luncscan.com/tokens/${TERRA_CLASSIC_CL8Y_ADDRESS}`,
    kind: "analytics",
  },
  {
    id: "megaeth-explorer",
    label: "MegaETH explorer",
    href: `https://mega.etherscan.io/token/${MEGAETH_CL8Y_ADDRESS}`,
    kind: "analytics",
  },
];

export const DIRECTORY_ALLOWED_HOSTS = [
  "dex.cl8y.com",
  "tidaldex.com",
  "pancakeswap.finance",
  "app.uniswap.org",
  "garuda-defi.org",
  "www.kumbaya.xyz",
  "app.sir.trading",
  "bscscan.com",
  "finder.terra.money",
  "luncscan.com",
  "mega.etherscan.io",
  "www.coingecko.com",
  "coinpaprika.com",
  "www.coincarp.com",
  "coinranking.com",
  "dropstab.com",
  "blockspot.io",
  "beincrypto.com",
  "czodiac.com",
  "dexscreener.com",
  "www.geckoterminal.com",
  "www.dextools.io",
] as const;

export const BANNED_DIRECTORY_HOSTS = [
  "ascendex.com",
  "www.ascendex.com",
  "binance.com",
  "www.binance.com",
  "coinbase.com",
  "www.coinbase.com",
  "kraken.com",
  "www.kraken.com",
] as const;

export function directoryHrefHost(href: string): string {
  return new URL(href).host;
}

export function tokenAddressById(id: string): TokenAddress | undefined {
  return TOKEN_ADDRESSES.find((row) => row.id === id);
}

export function tradeVenueById(id: string): TradeVenue | undefined {
  return TRADE_VENUES.find((row) => row.id === id);
}
