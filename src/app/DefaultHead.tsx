import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

/**
 * Restores global marketing metadata for non-blog routes after stripping duplicates from index.html.
 */
export function DefaultHead() {
  const { pathname } = useLocation();
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return null;
  }

  return (
    <Helmet defer={false} prioritizeSeoTags>
      <title>CL8Y — Cross-Chain Infrastructure &amp; DeFi Ecosystem</title>
      <meta
        name="description"
        content="CL8Y Ecosystem — Building the Future of Cross-Chain Infrastructure and Decentralized Finance. Cross-Chain Bridge, DeFi Suite, GameFi Platform."
      />
      <meta property="og:title" content="CL8Y Ecosystem — Cross-Chain Bridge • DeFi • GameFi" />
      <meta
        property="og:description"
        content="Secure cross-chain infrastructure connecting EVM chains with Terra Classic. UST1 unstablecoin, DEX, perpetuals, lending, and PROTOCASS GameFi."
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/opengraph.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="CL8Y Ecosystem — Cross-Chain Bridge • DeFi • GameFi" />
      <meta
        name="twitter:description"
        content="Secure cross-chain infrastructure connecting EVM chains with Terra Classic. UST1 unstablecoin, DEX, perpetuals, lending, and PROTOCASS GameFi."
      />
      <meta name="twitter:image" content="/opengraph.png" />
      <link rel="alternate" type="application/rss+xml" title="CL8Y Blog" href="/rss.xml" />
    </Helmet>
  );
}
