/** Marketing base URL for canonical / Open Graph (build via VITE_SITE_ORIGIN, client fallback). */
export function getMarketingSiteOrigin(): string {
  const configured =
    typeof import.meta.env.VITE_SITE_ORIGIN === "string"
      ? import.meta.env.VITE_SITE_ORIGIN.replace(/\/$/, "")
      : "";
  return configured || (typeof window !== "undefined" ? window.location.origin : "");
}

/** Absolute https URL for a site path or passthrough if already absolute. */
export function toAbsoluteUrl(assetPath: string): string {
  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) {
    return assetPath;
  }
  const pathPart = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  const origin = getMarketingSiteOrigin();
  return origin ? `${origin}${pathPart}` : pathPart;
}
