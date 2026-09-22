import { useLayoutEffect } from "react";
import { Helmet } from "react-helmet-async";

const PRODUCT_HEAD_SELECTOR = [
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'meta[name="description"]',
  'link[rel="canonical"]',
].join(",");

/**
 * Minimal response when a legal-guess path still reaches the client.
 * `index.html` bakes homepage Open Graph into the shell; drop those tags
 * before paint so a missed host rule does not keep advertising the product.
 */
export function ReservedLegalGuessNotFound() {
  useLayoutEffect(() => {
    document.title = "Not found";
    document.head.querySelectorAll(PRODUCT_HEAD_SELECTOR).forEach((node) => {
      node.remove();
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Not found</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main id="main" className="px-6 py-16 text-sm text-neutral-400" tabIndex={-1}>
        <p>Not found</p>
      </main>
    </>
  );
}
