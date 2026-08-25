/**
 * Marketing-site positioning invariants (GitLab #1).
 *
 * These rules are enforced by tests in `src/content/invariants.test.ts` and
 * documented for third-party agents in `skills/cl8y-site-positioning/SKILL.md`.
 * Do not weaken them to restore retired GameFi / burn / CEX narrative.
 *
 * Cross-links:
 * - `src/data/products.ts` — canonical Bridge / DEX URLs
 * - `src/data/copy.ts` — current-product marketing strings
 * - `STYLE_GUIDE.md` — tagline, pillars, voice
 * - `PROJECT_GUIDE.md` — IA, host headers, token-directory split (#2)
 */

/** Exact first-party product origins. No path, query, userinfo, or trailing slash. */
export const CANONICAL_PRODUCT_URLS = {
  bridge: "https://bridge.cl8y.com",
  dex: "https://dex.cl8y.com",
} as const;

export const CONTACT_EMAIL = "contact@ceramicliberty.com";

/** Terms that must not appear on current-product surfaces (except historical labels). */
export const BANNED_CURRENT_COPY = [
  "GameFi",
  "PROTOCASS",
  "Karnyx",
  "TigerHunt",
  "UST1",
  "USTR",
  "memecoin",
  "AscendEX",
  "Buy CL8Y",
  "Autoscarcity",
  "the future of DeFi",
  "expensive token",
] as const;

/**
 * Files that define what visitors and share cards currently see.
 * Retired feature modules are intentionally excluded — do not remount them.
 */
export const CURRENT_PRODUCT_SURFACES = [
  "index.html",
  "src/data/copy.ts",
  "src/data/products.ts",
  "src/app/Home.tsx",
  "src/app/DefaultHead.tsx",
  "src/app/index.tsx",
  "src/features/hero/Hero.tsx",
  "src/features/products/Products.tsx",
  "src/features/utility/Utility.tsx",
  "src/features/trust/Trust.tsx",
  "src/features/community/Community.tsx",
  "src/features/token/TokenPlaceholder.tsx",
  "src/components/chrome/SiteHeader.tsx",
  "src/components/chrome/SiteFooter.tsx",
  "STYLE_GUIDE.md",
  "PROJECT_GUIDE.md",
] as const;

export const PAGE_ANCHORS = {
  main: "main",
  hero: "hero",
  products: "products",
  utility: "utility",
  trust: "trust",
  token: "token",
  community: "community",
  docs: "docs",
  footer: "site-footer",
} as const;

export const RETIRED_HOMEPAGE_MODULES = [
  "src/features/gamefi/GameFiAI.tsx",
  "src/features/engine/Engine.tsx",
  "src/features/tokenomics/Tokenomics.tsx",
  "src/features/security/LayeredSecurity.tsx",
  "src/features/institutional/Institutional.tsx",
  "src/components/visuals/BuyTicker.tsx",
  "src/components/visuals/HeroImageCard.tsx",
] as const;
