import { Link } from "react-router-dom";
import { linksByCategory } from "../../data/links";
import { CL8Y_MARKETING_HOME } from "../../lib/siteUrls";

export function MarketingFooter() {
  const tidaldex = linksByCategory.trading.find((l) => l.id === "tidaldex-bsc");
  const telegram = linksByCategory.social.find((l) => l.id === "telegram");
  const twitter = linksByCategory.social.find((l) => l.id === "twitter");
  const bscContract = linksByCategory.contracts.find((l) => l.id === "bsc-contract");
  const megaethContract = linksByCategory.contracts.find((l) => l.id === "megaeth-contract");
  const luncscan = linksByCategory.listings.find((l) => l.id === "luncscan-terraclassic");

  return (
    <footer className="grain bg-midnight/60 rounded-md border border-charcoal p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          href="mailto:contact@ceramicliberty.com"
          className="hover:text-gold/80 text-sm font-semibold text-gold"
        >
          contact@ceramicliberty.com
        </a>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={CL8Y_MARKETING_HOME}
            className="bg-black/40 hover:bg-black/50 inline-flex items-center rounded-md border border-charcoal px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-gold"
          >
            Home
          </a>
          <Link
            to="/blog"
            className="bg-black/40 hover:bg-black/50 inline-flex items-center rounded-md border border-charcoal px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-gold"
          >
            Blog
          </Link>
          <a
            href="/rss.xml"
            className="bg-black/40 hover:bg-black/50 inline-flex items-center rounded-md border border-charcoal px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-gold"
          >
            RSS
          </a>
          {telegram ? (
            <a
              href={telegram.href}
              target="_blank"
              rel="noreferrer"
              className="bg-black/40 hover:bg-black/50 inline-flex items-center rounded-md border border-charcoal px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-gold"
            >
              Telegram
            </a>
          ) : null}
          {twitter ? (
            <a
              href={twitter.href}
              target="_blank"
              rel="noreferrer"
              className="bg-black/40 hover:bg-black/50 inline-flex items-center rounded-md border border-charcoal px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-gold"
            >
              X
            </a>
          ) : null}
          {bscContract ? (
            <a
              href={bscContract.href}
              target="_blank"
              rel="noreferrer"
              className="bg-black/40 hover:bg-black/50 inline-flex items-center rounded-md border border-charcoal px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-gold"
            >
              BSC Contract
            </a>
          ) : null}
          {megaethContract ? (
            <a
              href={megaethContract.href}
              target="_blank"
              rel="noreferrer"
              className="bg-black/40 hover:bg-black/50 inline-flex items-center rounded-md border border-charcoal px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-gold"
            >
              MegaETH Contract
            </a>
          ) : null}
          {luncscan ? (
            <a
              href={luncscan.href}
              target="_blank"
              rel="noreferrer"
              className="bg-black/40 hover:bg-black/50 inline-flex items-center rounded-md border border-charcoal px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-gold"
            >
              TerraClassic Contract
            </a>
          ) : null}
          {tidaldex ? (
            <a
              href={tidaldex.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/15"
            >
              Buy CL8Y
            </a>
          ) : null}
        </div>
      </div>
      <div className="from-gold/30 via-gold/15 to-gold/40 mt-3 h-px w-full bg-gradient-to-r" />
      <br />
      <h2 className="text-text/90 text-sm font-semibold tracking-wide">
        Disclaimer: Important Legal Notice
      </h2>
      <p className="mt-3 text-[11px] leading-relaxed text-neutral-300">
        CL8Y is a blockchain ecosystem providing cross-chain infrastructure, decentralized finance
        products, and GameFi experiences. Digital assets in this ecosystem (including CL8Y, USTR,
        and UST1) are not registered with or approved by any financial regulator and offer no legal,
        regulatory, or government protections. Participation involves significant risk, including
        the possible loss of all value. Always conduct your own research and never invest more than
        you can afford to lose. Information on this website is for informational purposes only and
        does not constitute financial advice. It may contain inaccuracies or example data not
        representative of the current state of the ecosystem. The CL8Y team and community does not
        guarantee the accuracy or completeness of the information on this website. Nothing on this
        website should be taken to imply the CL8Y team or community will perform any work for you or
        any token holders, traders, or investors.
      </p>
      <br />
      <h2 className="text-text/90 text-sm font-semibold tracking-wide">Law Enforcement Requests</h2>
      <p className="mt-3 text-[11px] leading-relaxed text-neutral-300">
        The operators of this website recognize the jurisdiction and laws of the United States of
        America. We will cooperate with legitimate law enforcement requests from US officers if
        required by law. Examples of activities we can assist with include but are not limited to:
        banning EVM wallets connected to illicit activities, locking transfers, and assisting in
        asset recovery efforts. Any law enforcement requests should be directed to the CL8Y team at
        contact@ceramicliberty.com.
      </p>
    </footer>
  );
}
