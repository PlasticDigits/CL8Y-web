import { Link } from "react-router-dom";
import { ExternalLink } from "../ui/ExternalLink";
import { ANCHORS, PRODUCT_URLS } from "../../data/products";
import { siteCopy } from "../../data/copy";
import { scrollToAnchor } from "../../lib/scrollToAnchor";

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-semibold text-neutral-200 hover:text-gold focus-visible:text-gold";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/80 bg-black/85 backdrop-blur-md">
      <div className="container mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <a href={`/#${ANCHORS.hero}`} className="flex items-center gap-2 text-sm font-bold tracking-tight text-gold">
          <img src="/images/logo/CLAY-VECTOR-SMALL.svg" alt="" className="h-8 w-8" />
          <span>{siteCopy.brand.name}</span>
        </a>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-1">
          <ExternalLink href={PRODUCT_URLS.bridge} className={navLinkClass}>
            {siteCopy.header.bridge}
          </ExternalLink>
          <ExternalLink href={PRODUCT_URLS.dex} className={navLinkClass}>
            {siteCopy.header.dex}
          </ExternalLink>
          <a
            href={`/#${ANCHORS.token}`}
            className={navLinkClass}
            onClick={() => scrollToAnchor(ANCHORS.token)}
          >
            {siteCopy.header.token}
          </a>
          <a
            href={`/#${ANCHORS.community}`}
            className={navLinkClass}
            onClick={() => scrollToAnchor(ANCHORS.community)}
          >
            {siteCopy.header.community}
          </a>
          <Link to="/blog" className={navLinkClass}>
            {siteCopy.header.blog}
          </Link>
        </nav>
      </div>
    </header>
  );
}
