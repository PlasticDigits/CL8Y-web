/**
 * Current-product marketing copy. Keep section bodies to two short sentences
 * unless the string is the footer explainer. Do not invent DEX fee-tier names,
 * thresholds, or percentages — send visitors to the DEX for the live schedule.
 *
 * @see src/content/invariants.ts
 * @see src/data/tokenDirectory.ts
 * @see skills/cl8y-site-positioning/SKILL.md
 * @see skills/cl8y-token-directory/SKILL.md
 */

export const siteCopy = {
  brand: {
    name: "CL8Y",
    tagline: "CL8Y Bridge • CL8Y DEX • utility token",
  },
  header: {
    productsLabel: "Products",
    bridge: "Bridge",
    dex: "DEX",
    token: "Token",
    community: "Community",
    blog: "Blog",
  },

  hero: {
    headline: "Decentralized utility token",
    subhead: "Hold CL8Y for reduced fees on CL8Y DEX trading tiers.",
    ctaBridge: "Open Bridge",
    ctaDex: "Open DEX",
    ctaToken: "Token addresses & markets",
  },
  products: {
    title: "Products",
    subtitle: "Two live products. CL8Y unlocks DEX fee tiers.",
    bridgeTitle: "CL8Y Bridge",
    bridgeBody: "Move tokens across supported chains.",
    dexTitle: "CL8Y DEX",
    dexBody: "Trade on CL8Y DEX. Current fee tiers are listed there.",
    openBridge: "Open Bridge",
    openDex: "Open DEX",
  },
  utility: {
    title: "Fee tiers",
    body: "Holding CL8Y reduces trading fees on CL8Y DEX by tier. This page does not list amounts or thresholds — see the DEX for the current schedule.",
    cta: "See current fee tiers",
  },
  trust: {
    title: "How the bridge works",
    subtitle: "Speed from one operator. Safety from cancelers.",
    body: "Approvals wait in a mandatory 5-minute delay. Independent cancelers on opBNB check each approval against the source chain and can stop a bad one. One honest canceler is enough; a Raspberry Pi can run a node.",
    auditCta: "View audit",
  },
  token: {
    title: "Token addresses & markets",
    body: "Official contract addresses, listings, and DEX venues.",
    warning: "Only use addresses from this page. Verify the explorer link; do not paste addresses from messages.",
    addressesTitle: "Addresses",
    listingsTitle: "Listings",
    listingsHint: "Price and analytics pages. These are not places to trade.",
    tradeTitle: "Trade on DEX",
    tradeHint: "On-chain venues only. CL8Y DEX is first; other rows are alternatives by chain.",
    copy: "Copy address",
    copied: "Copied",
    copyFailed: "Could not copy. Select the address and copy it yourself.",
    explorer: "Explorer",
    openDex: "Open DEX",
    openVenue: "Open venue",
  },
  community: {
    title: "Community",
    subtitle: "Telegram and X",
    twitter: "Follow on X",
    twitterHint: "News and updates",
    telegram: "Join Telegram",
    telegramHint: "Community chat",
  },
  footer: {
    explainerTitle: "What this is",
    explainer:
      "CL8Y Bridge moves tokens between supported chains. CL8Y DEX is the trading venue. CL8Y is a decentralized utility token: holding it can reduce CL8Y DEX trading fees by tier. This site does not promise a return, a listing, or a guaranteed fee amount. Use the token directory on this page for official addresses. Older whitepaper PDFs are historical documents and may not match the products on this page.",
    docsTitle: "Documents",
    historicalWhitepaper: "Historical whitepaper (PDF)",
    historicalWhitepaperV2: "Historical whitepaper v2 (PDF)",
    historicalWhitepaperV1: "Historical whitepaper v1 (PDF)",
    localAudit: "Audit (PDF)",
    disclaimerTitle: "Disclaimer: Important Legal Notice",
    disclaimer:
      "CL8Y is a decentralized utility token used for reduced trading fees on CL8Y DEX. CL8Y Bridge and CL8Y DEX are software products. Digital assets are not registered with or approved by any financial regulator and offer no legal, regulatory, or government protections. Participation involves significant risk, including the possible loss of all value. Always conduct your own research and never commit more than you can afford to lose. Information on this website is for informational purposes only and does not constitute financial advice. It may contain inaccuracies or example data. The CL8Y team and community does not guarantee the accuracy or completeness of the information on this website. Nothing on this website should be taken to imply the CL8Y team or community will perform any work for you or any token holders, traders, or investors.",
    lawTitle: "Law Enforcement Requests",
    law:
      "The operators of this website recognize the jurisdiction and laws of the United States of America. We will cooperate with legitimate law enforcement requests from US officers if required by law. Examples of activities we can assist with include but are not limited to: banning EVM wallets connected to illicit activities, locking transfers, and assisting in asset recovery efforts. Any law enforcement requests should be directed to the CL8Y team at contact@ceramicliberty.com.",
  },
  seo: {
    title: "CL8Y — Bridge, DEX, and utility token",
    description:
      "CL8Y is a decentralized utility token for reduced fees on CL8Y DEX trading tiers. Open CL8Y Bridge and CL8Y DEX.",
  },
} as const;

export type SiteCopy = typeof siteCopy;
