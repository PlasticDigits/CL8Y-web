/**
 * Legal-guess URL paths (GitLab #12). Shared spec with DEX + Bridge; keep in sync.
 *
 * Match contract: strip query and hash, `decodeURI` once (leave `%2F` encoded;
 * do not decode a second time), drop `.` / `..` segments, ASCII case-fold,
 * ignore a trailing slash. Exact table membership only — not a prefix match.
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

const RESERVED_SET = new Set<string>(RESERVED_LEGAL_GUESS_PATHS);

/** Host rewrite target that must not exist as a static asset (CDN returns 404). */
export const RESERVED_HOST_MISS_DESTINATION = "/__cl8y_reserved_legal_guess_miss__";

function stripQueryAndHash(value: string): string {
  const query = value.indexOf("?");
  const hash = value.indexOf("#");
  let end = value.length;
  if (query >= 0) end = Math.min(end, query);
  if (hash >= 0) end = Math.min(end, hash);
  return value.slice(0, end);
}

function decodeOnce(value: string): string {
  try {
    return decodeURI(value);
  } catch {
    return value;
  }
}

/**
 * Pathname used for reserved-path membership.
 * Empty segments and `.` are dropped; `..` pops one segment. Trailing slashes do not survive.
 */
export function canonicalRequestPath(input: string): string {
  const decoded = decodeOnce(stripQueryAndHash(input.trim()));
  const withSlash = decoded.startsWith("/") ? decoded : `/${decoded}`;
  const stack: string[] = [];
  for (const segment of withSlash.split("/")) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") {
      stack.pop();
      continue;
    }
    stack.push(segment);
  }
  return `/${stack.join("/")}`.toLowerCase();
}

/**
 * True when the request path is exactly a reserved legal-guess path.
 * Does not match prefixes such as `/privacy-extra` or `/blog/privacy`.
 */
export function isReservedLegalGuessPath(input: string): boolean {
  return RESERVED_SET.has(canonicalRequestPath(input));
}

/** True when the request path is the unpublished Render miss target. */
export function isReservedHostMissPath(input: string): boolean {
  return canonicalRequestPath(input) === RESERVED_HOST_MISS_DESTINATION;
}
