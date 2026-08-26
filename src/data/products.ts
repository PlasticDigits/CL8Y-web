/**
 * Canonical first-party product and document URLs.
 *
 * Invariants (GitLab #1):
 * - Bridge and DEX hrefs are these exact strings — https, correct host, no `@`,
 *   no query redirectors, not read from `window.location` / search / hash.
 * - Primary CTAs must use `PRODUCT_URLS`, never a third-party “buy” venue.
 * - Token address / listings / venues directory is `tokenDirectory.ts` (GitLab #2).
 *
 * @see src/content/invariants.ts
 * @see src/data/tokenDirectory.ts
 * @see skills/cl8y-site-positioning/SKILL.md
 * @see skills/cl8y-token-directory/SKILL.md
 */

import { CANONICAL_PRODUCT_URLS, CONTACT_EMAIL, PAGE_ANCHORS } from "../content/invariants";

export const PRODUCT_URLS = CANONICAL_PRODUCT_URLS;

export const CONTACT = {
  email: CONTACT_EMAIL,
  mailto: `mailto:${CONTACT_EMAIL}`,
} as const;

export const HISTORICAL_DOCS = {
  whitepaperV3: "/pdfs/CL8Y_WHITEPAPER_V3.pdf",
  whitepaperV2: "/pdfs/CL8Y_WHITEPAPER_V2.pdf",
  whitepaperV1: "/pdfs/CL8Y-Whitepaper.pdf",
  auditLocal: "/pdfs/audit.pdf",
} as const;

export const ANCHORS = PAGE_ANCHORS;

export const EXTERNAL_REL = "noopener noreferrer";
