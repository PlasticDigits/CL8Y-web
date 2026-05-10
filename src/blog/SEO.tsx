import { Helmet } from "react-helmet-async";
import { toAbsoluteUrl } from "../lib/siteOrigin";

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
  const canonical = toAbsoluteUrl(canonicalPath);
  const ogImageAbsolute = ogImage ? toAbsoluteUrl(ogImage) : undefined;

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
