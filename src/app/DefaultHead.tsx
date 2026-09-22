import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { siteCopy } from "../data/copy";
import { toAbsoluteUrl } from "../lib/siteOrigin";
import { isReservedLegalGuessPath } from "../lib/reservedLegalGuessPaths";

/**
 * Restores global marketing metadata for non-blog routes after stripping duplicates from index.html.
 */
export function DefaultHead() {
  const { pathname } = useLocation();
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return null;
  }
  if (isReservedLegalGuessPath(pathname)) {
    return null;
  }

  const ogUrl = toAbsoluteUrl(pathname === "/" ? "/" : pathname);
  const ogImageAbsolute = toAbsoluteUrl("/opengraph.png");

  return (
    <Helmet defer={false} prioritizeSeoTags>
      <title>{siteCopy.seo.title}</title>
      <meta name="description" content={siteCopy.seo.description} />
      <link rel="canonical" href={ogUrl} />
      <meta property="og:title" content={siteCopy.seo.title} />
      <meta property="og:description" content={siteCopy.seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImageAbsolute} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteCopy.seo.title} />
      <meta name="twitter:description" content={siteCopy.seo.description} />
      <meta name="twitter:image" content={ogImageAbsolute} />
      <link rel="alternate" type="application/rss+xml" title="CL8Y Blog" href="/rss.xml" />
    </Helmet>
  );
}
