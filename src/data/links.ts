// Centralized key links and icon metadata for site-wide usage

export type LinkCategory =
  | "trading"
  | "contracts"
  | "chart"
  | "social"
  | "listings"
  | "audit"
  | "comingSoon";

export type SupportedNetwork = "BSC" | "TerraClassic";

export type LogoIcon = {
  kind: "logo";
  src: string; // e.g., "/images/partners/Uniswap.png"
  alt: string;
};

// Keep names aligned with lucide-react icon names where possible
export type LucideIconName =
  | "ArrowLeftRight"
  | "ExternalLink"
  | "MessageCircle"
  | "Twitter"
  | "ShieldCheck"
  | "ChartLine";

export type LucideIcon = {
  kind: "lucide";
  name: LucideIconName;
};

export type LinkIcon = LogoIcon | LucideIcon;

export interface LinkItem {
  id: string;
  label: string;
  href: string;
  category: LinkCategory;
  icon: LinkIcon;
  network?: SupportedNetwork;
  tags?: string[];
  isExternal?: boolean;
}

// Helper constants for partner logo paths (served from /public)
const PARTNER = {
  TIDALDEX: "/images/partners/TidalDex.svg",
  UNISWAP: "/images/partners/Uniswap.png",
  PANCAKESWAP: "/images/partners/pancakeswap.png",
  GDEX: "/images/partners/GDEX-logo.png",
  TERRA_CLASSIC: "/images/partners/TerraClassic.png",
  BSC: "/images/partners/Binance-Smart-Chain-Icon-1-2048x2048.png",
  COINGECKO: "/images/partners/coingecko-5d1523.svg",
  BLOCKSPOT: "/images/partners/blockspot.png",
  DROPSTAB: "/images/partners/dropstab.png",
  ASCENDEX: "/images/partners/ascendex.png",
  CZODIAC: "/images/partners/czodiac.png",
  BSC_PNG: "/images/partners/BSC.png",
  COINPAPRIKA: "/images/partners/coinpaprika.png",
} as const;

export const links: LinkItem[] = [
  // Trading
  {
    id: "tidaldex-bsc",
    label: "Trade on TidalDex (BSC)",
    href: "https://tidaldex.com/swap?outputCurrency=0x8F452a1fdd388A45e1080992eFF051b4dd9048d2",
    category: "trading",
    icon: { kind: "logo", src: PARTNER.TIDALDEX, alt: "TidalDex" },
    network: "BSC",
    isExternal: true,
  },
  {
    id: "ascendex-cex",
    label: "Trade on AscendEX (CEX)",
    href: "https://ascendex.com/en-us/cashtrade-spottrading/usdt/cl8y",
    category: "trading",
    icon: { kind: "logo", src: PARTNER.ASCENDEX, alt: "AscendEX" },
    isExternal: true,
  },
  {
    id: "uniswap-dex",
    label: "Trade on Uniswap (DEX)",
    href: "https://app.uniswap.org/explore/tokens/bnb/0x8F452a1fdd388A45e1080992eFF051b4dd9048d2",
    category: "trading",
    icon: { kind: "logo", src: PARTNER.UNISWAP, alt: "Uniswap" },
    network: "BSC",
    isExternal: true,
  },
  {
    id: "pancakeswap-dex",
    label: "Trade on PancakeSwap (DEX)",
    href: "https://pancakeswap.finance/swap?outputCurrency=0x8F452a1fdd388A45e1080992eFF051b4dd9048d2",
    category: "trading",
    icon: { kind: "logo", src: PARTNER.PANCAKESWAP, alt: "PancakeSwap" },
    network: "BSC",
    isExternal: true,
  },
  {
    id: "gdex-coming-soon",
    label: "Trade on GDEX (TerraClassic)",
    href: "https://garuda-defi.org/market/terra1kkrwna59jzpvsp7n4l3xdt72rmejcz5d2xaezxl29zvkssn7vvtqmtmemv",
    category: "trading",
    icon: { kind: "logo", src: PARTNER.GDEX, alt: "GDEX" },
    network: "TerraClassic",
    isExternal: true,
  },

  // Contracts
  {
    id: "terra-classic-contract",
    label: "TerraClassic Contract Address",
    href: "https://finder.terra.money/classic/address/terra16wtml2q66g82fdkx66tap0qjkahqwp4lwq3ngtygacg5q0kzycgqvhpax3",
    category: "contracts",
    icon: { kind: "logo", src: PARTNER.TERRA_CLASSIC, alt: "Terra Classic" },
    network: "TerraClassic",
    isExternal: true,
    tags: ["terra16wtml2q66g82fdkx66tap0qjkahqwp4lwq3ngtygacg5q0kzycgqvhpax3"],
  },
  {
    id: "bsc-contract",
    label: "BSC Contract Address",
    href: "https://bscscan.com/token/0x8F452a1fdd388A45e1080992eFF051b4dd9048d2",
    category: "contracts",
    icon: { kind: "logo", src: PARTNER.BSC, alt: "BSC" },
    network: "BSC",
    isExternal: true,
    tags: ["0x8F452a1fdd388A45e1080992eFF051b4dd9048d2"],
  },

  // Chart
  {
    id: "geckoterminal-chart",
    label: "Chart (GeckoTerminal)",
    href: "https://www.geckoterminal.com/bsc/pools/0x8F452a1fdd388A45e1080992eFF051b4dd9048d2",
    category: "chart",
    icon: { kind: "logo", src: PARTNER.COINGECKO, alt: "GeckoTerminal" },
    isExternal: true,
  },

  // Social
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/ceramictoken",
    category: "social",
    icon: { kind: "lucide", name: "MessageCircle" },
    isExternal: true,
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    href: "https://x.com/ceramictoken",
    category: "social",
    icon: { kind: "lucide", name: "Twitter" },
    isExternal: true,
  },

  // Listings
  {
    id: "czodiac",
    label: "CZodiac",
    href: "https://czodiac.com",
    category: "listings",
    icon: { kind: "logo", src: PARTNER.CZODIAC, alt: "CZodiac" },
    isExternal: true,
  },
  {
    id: "blockspot",
    label: "Blockspot",
    href: "https://blockspot.io/coin/ceramicliberty-com/",
    category: "listings",
    icon: { kind: "logo", src: PARTNER.BLOCKSPOT, alt: "Blockspot" },
    isExternal: true,
  },
  {
    id: "bscscan-token",
    label: "BSC (BscScan)",
    href: "https://bscscan.com/token/0x8f452a1fdd388a45e1080992eff051b4dd9048d2",
    category: "listings",
    icon: { kind: "logo", src: PARTNER.BSC_PNG, alt: "BSC" },
    isExternal: true,
  },
  {
    id: "luncscan-terraclassic",
    label: "LUNCScan (TerraClassic)",
    href: "https://luncscan.com/tokens/terra16wtml2q66g82fdkx66tap0qjkahqwp4lwq3ngtygacg5q0kzycgqvhpax3",
    category: "listings",
    icon: { kind: "logo", src: PARTNER.TERRA_CLASSIC, alt: "TerraClassic" },
    isExternal: true,
  },
  {
    id: "dropstab",
    label: "DropsTab",
    href: "https://dropstab.com/coins/ceramicliberty-com",
    category: "listings",
    icon: { kind: "logo", src: PARTNER.DROPSTAB, alt: "DropsTab" },
    isExternal: true,
  },
  {
    id: "coinpaprika",
    label: "CoinPaprika",
    href: "https://coinpaprika.com/coin/cl8y-ceramiclibertycom/",
    category: "listings",
    icon: { kind: "logo", src: PARTNER.COINPAPRIKA, alt: "CoinPaprika" },
    isExternal: true,
  },
  {
    id: "coingecko",
    label: "CoinGecko",
    href: "https://blockspot.io/coin/ceramicliberty-com/", // Note: provided URL duplicates Blockspot
    category: "listings",
    icon: { kind: "logo", src: PARTNER.COINGECKO, alt: "CoinGecko" },
    isExternal: true,
  },

  // Audit
  {
    id: "spywolf-audit",
    label: "Audit (SpyWolf)",
    href: "https://spywolf.co/audits/CL8Y_0x999311589cc1Ed0065AD9eD9702cB593FFc62ddF.pdf",
    category: "audit",
    icon: { kind: "lucide", name: "ShieldCheck" },
    isExternal: true,
  },
];

export const linksByCategory: Record<LinkCategory, LinkItem[]> = links.reduce(
  (acc, link) => {
    if (!acc[link.category]) acc[link.category] = [] as LinkItem[];
    acc[link.category].push(link);
    return acc;
  },
  {
    trading: [],
    contracts: [],
    chart: [],
    social: [],
    listings: [],
    audit: [],
    comingSoon: [],
  } as Record<LinkCategory, LinkItem[]>,
);

export type { LinkItem as Cl8yLinkItem };
