import { ExternalLink } from "../ui/ExternalLink";
import { ANCHORS, CONTACT, HISTORICAL_DOCS, PRODUCT_URLS } from "../../data/products";
import { siteCopy } from "../../data/copy";
import { linksByCategory } from "../../data/links";

export function SiteFooter() {
  const telegram = linksByCategory.social.find((l) => l.id === "telegram");
  const twitter = linksByCategory.social.find((l) => l.id === "twitter");
  const audit = linksByCategory.audit.find((l) => l.id === "spywolf-audit");

  return (
    <footer
      id={ANCHORS.footer}
      className="border-t border-charcoal bg-midnight/40"
    >
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <section aria-labelledby="footer-explainer-heading">
          <h2 id="footer-explainer-heading" className="font-display text-xl font-bold text-gold">
            {siteCopy.footer.explainerTitle}
          </h2>
          <p className="mt-3 max-w-[72ch] text-sm leading-relaxed text-neutral-200">
            {siteCopy.footer.explainer}
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <ExternalLink
            href={PRODUCT_URLS.bridge}
            className="text-sm font-semibold text-gold hover:text-gold/80"
          >
            {siteCopy.header.bridge}
          </ExternalLink>
          <ExternalLink
            href={PRODUCT_URLS.dex}
            className="text-sm font-semibold text-gold hover:text-gold/80"
          >
            {siteCopy.header.dex}
          </ExternalLink>
          <a href={`/#${ANCHORS.token}`} className="text-sm font-semibold text-neutral-200 hover:text-gold">
            {siteCopy.header.token}
          </a>
          {telegram ? (
            <ExternalLink href={telegram.href} className="text-sm font-semibold text-neutral-200 hover:text-gold">
              {telegram.label}
            </ExternalLink>
          ) : null}
          {twitter ? (
            <ExternalLink href={twitter.href} className="text-sm font-semibold text-neutral-200 hover:text-gold">
              {twitter.label}
            </ExternalLink>
          ) : null}
          <a href={CONTACT.mailto} className="text-sm font-semibold text-gold hover:text-gold/80">
            {CONTACT.email}
          </a>
        </div>

        <section id={ANCHORS.docs} className="mt-8 scroll-mt-24" aria-labelledby="footer-docs-heading">
          <h2 id="footer-docs-heading" className="text-sm font-semibold tracking-wide text-text/90">
            {siteCopy.footer.docsTitle}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <li>
              <a href={HISTORICAL_DOCS.whitepaperV3} className="text-neutral-300 hover:text-gold">
                {siteCopy.footer.historicalWhitepaper}
              </a>
            </li>
            <li>
              <a href={HISTORICAL_DOCS.whitepaperV2} className="text-neutral-300 hover:text-gold">
                {siteCopy.footer.historicalWhitepaperV2}
              </a>
            </li>
            <li>
              <a href={HISTORICAL_DOCS.whitepaperV1} className="text-neutral-300 hover:text-gold">
                {siteCopy.footer.historicalWhitepaperV1}
              </a>
            </li>
            {audit ? (
              <li>
                <ExternalLink href={audit.href} className="text-neutral-300 hover:text-gold">
                  {audit.label}
                </ExternalLink>
              </li>
            ) : null}
            <li>
              <a href={HISTORICAL_DOCS.auditLocal} className="text-neutral-300 hover:text-gold">
                {siteCopy.footer.localAudit}
              </a>
            </li>
          </ul>
        </section>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-gold/30 via-gold/15 to-gold/40" />

        <section className="mt-6" aria-labelledby="disclaimer-heading">
          <h2 id="disclaimer-heading" className="text-sm font-semibold tracking-wide text-text/90">
            {siteCopy.footer.disclaimerTitle}
          </h2>
          <p className="mt-3 text-[11px] leading-relaxed text-neutral-300">{siteCopy.footer.disclaimer}</p>
        </section>

        <section className="mt-6" aria-labelledby="law-heading">
          <h2 id="law-heading" className="text-sm font-semibold tracking-wide text-text/90">
            {siteCopy.footer.lawTitle}
          </h2>
          <p className="mt-3 text-[11px] leading-relaxed text-neutral-300">{siteCopy.footer.law}</p>
        </section>
      </div>
    </footer>
  );
}
