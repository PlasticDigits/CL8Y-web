/**
 * Legal-guess URL paths (GitLab #12). Shared spec with DEX + Bridge; keep in sync.
 * Match pathname only (no query/hash), ASCII case-insensitive, optional trailing slash.
 */

/** Canonical paths without trailing slash (lowercase). */
export const RESERVED_LEGAL_GUESS_PATHS = [
  "/privacy",
  "/privacy-policy",
  "/privacy_policy",
  "/privacypolicy",
  "/privacy-notice",
  "/cookies",
  "/cookie",
  "/cookie-policy",
  "/cookies-policy",
  "/opt-out",
  "/optout",
  "/opt_out",
  "/do-not-sell",
  "/donotsell",
  "/ccpa",
] as const;

export type ReservedLegalGuessPath = (typeof RESERVED_LEGAL_GUESS_PATHS)[number];

const RESERVED_SET = new Set<string>(
  RESERVED_LEGAL_GUESS_PATHS.flatMap((path) => [path, `${path}/`]),
);

function normalizePathname(pathname: string): string {
  if (!pathname.startsWith("/")) {
    return `/${pathname}`;
  }
  return pathname;
}

/**
 * True when the pathname exactly matches a reserved legal-guess path (case-insensitive).
 * Does not match prefixes such as `/privacy-extra` or `/blog/privacy`.
 */
export function isReservedLegalGuessPath(pathname: string): boolean {
  const lower = normalizePathname(pathname).toLowerCase();
  return RESERVED_SET.has(lower);
}

/** Host rewrite target that must not exist as a static asset (CDN returns 404). */
export const RESERVED_HOST_MISS_DESTINATION = "/__cl8y_reserved_legal_guess_miss__";
