import { Helmet } from "react-helmet-async";

export type SEOProps = {
  title: string;
  description: string;
  /** Path starting with `/` (e.g. `/blog/your-post-slug`). */
  canonicalPath: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  articlePublishedTime?: string;
  articleAuthor?: string;
  noindex?: boolean;
};

function absoluteUrl(origin: string, assetPath: string): string {
  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) {
    return assetPath;
  }
  const pathPart = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return origin ? `${origin}${pathPart}` : pathPart;
}

export function SEO({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  articlePublishedTime,
  articleAuthor,
  noindex,
}: SEOProps) {
  const configuredOrigin =
    typeof import.meta.env.VITE_SITE_ORIGIN === "string"
      ? import.meta.env.VITE_SITE_ORIGIN.replace(/\/$/, "")
      : "";
  const origin = configuredOrigin || (typeof window !== "undefined" ? window.location.origin : "");
  const canonical = absoluteUrl(origin, canonicalPath);
  const ogImageAbsolute = ogImage ? absoluteUrl(origin, ogImage) : undefined;

  return (
    <Helmet defer={false} prioritizeSeoTags>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : null}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" type="application/rss+xml" title="CL8Y Blog" href="/rss.xml" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      {ogImageAbsolute ? <meta property="og:image" content={ogImageAbsolute} /> : null}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImageAbsolute ? <meta name="twitter:image" content={ogImageAbsolute} /> : null}

      {articlePublishedTime ? (
        <meta property="article:published_time" content={articlePublishedTime} />
      ) : null}
      {articleAuthor ? <meta property="article:author" content={articleAuthor} /> : null}
    </Helmet>
  );
}
