import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { linksByCategory } from "../data/links";
import { CL8Y_BRIDGE_URL, CL8Y_MARKETING_HOME, USTR_CMM_URL } from "../lib/siteUrls";
import type { BlogPostMeta } from "./blogIndex";
import { BlogBreadcrumb } from "./BlogBreadcrumb";

function shortAddress(addr: string): string {
  if (addr.startsWith("0x") && addr.length > 12) {
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  }
  if (addr.length > 22) {
    return `${addr.slice(0, 12)}…${addr.slice(-6)}`;
  }
  return addr;
}

const WORDS_PER_MINUTE = 200;

type ArticleLayoutProps = PropsWithChildren<
  Pick<BlogPostMeta, "title" | "date" | "author" | "image" | "tags" | "wordCount">
>;

export function ArticleLayout({
  title,
  date,
  author,
  image,
  tags,
  wordCount,
  children,
}: ArticleLayoutProps) {
  const telegram = linksByCategory.social.find((l) => l.id === "telegram");
  const twitter = linksByCategory.social.find((l) => l.id === "twitter");
  const tidaldex = linksByCategory.trading.find((l) => l.id === "tidaldex-bsc");
  const pancakeswap = linksByCategory.trading.find((l) => l.id === "pancakeswap-dex");
  const ascendex = linksByCategory.trading.find((l) => l.id === "ascendex-cex");
  const bscContract = linksByCategory.contracts.find((l) => l.id === "bsc-contract");
  const terraContract = linksByCategory.contracts.find((l) => l.id === "terra-classic-contract");
  const megaethContract = linksByCategory.contracts.find((l) => l.id === "megaeth-contract");

  const readMinutes = wordCount / WORDS_PER_MINUTE;
  const formattedDate = Number.isNaN(Date.parse(date))
    ? date
    : new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <article
      id="main"
      role="main"
      className="relative overflow-hidden bg-[radial-gradient(860px_460px_at_18%_-8%,rgba(212,175,55,0.13),transparent),radial-gradient(700px_420px_at_84%_2%,rgba(34,211,238,0.09),transparent),linear-gradient(180deg,rgba(26,31,43,0.58),rgba(12,12,12,0)_36rem)] font-body text-text"
      tabIndex={-1}
    >
      <img
        src="/images/logo/CLAY-VECTOR-LARGE.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-56 top-0 w-[720px] max-w-none select-none opacity-[0.035]"
      />
      <div
        className="via-gold/50 pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
        <BlogBreadcrumb postTitle={title} />

        <header className="border-gold/20 bg-midnight/65 grain overflow-hidden rounded-lg border shadow-depth [box-shadow:var(--shadow-depth),inset_0_0_52px_rgba(212,175,55,0.05)]">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="p-6 md:p-8 lg:p-10">
              <span className="text-ember/90 text-xs font-semibold uppercase tracking-[0.28em]">
                CL8Y Blog
              </span>
              <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-text md:text-5xl">
                {title}
              </h1>
              <p className="text-text/68 mt-5 text-sm">
                <time dateTime={date}>{formattedDate}</time>
                <span className="text-gold/45 mx-2">·</span>
                <span>{author}</span>
                <span className="text-gold/45 mx-2">·</span>
                <span>{wordCount.toLocaleString()} words</span>
                <span className="text-gold/45 mx-2">·</span>
                <span>Est. Read Time: {readMinutes.toFixed(2)} minutes</span>
              </p>
              {tags.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <span className="border-gold/25 bg-gold/10 text-gold/90 rounded-pill border px-3 py-1 text-xs font-semibold">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="bg-black/30 relative min-h-60 overflow-hidden border-t border-charcoal lg:border-l lg:border-t-0">
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="opacity-72 h-full min-h-60 w-full object-contain object-center saturate-[0.85]"
                />
              ) : null}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.18),transparent_42%),linear-gradient(180deg,transparent,rgba(12,12,12,0.86))]" />
              <img
                src="/images/logo/CLAY-VECTOR-LARGE.svg"
                alt=""
                aria-hidden
                className="absolute bottom-6 right-6 h-20 w-20 opacity-30 drop-shadow-[0_0_24px_rgba(212,175,55,0.25)]"
              />
            </div>
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:items-start">
          <div className="bg-black/25 grain rounded-lg border border-charcoal p-5 shadow-depth md:p-8">
            <div
              className={
                "prose-blog text-text/88 mx-auto max-w-3xl space-y-6 text-[1.03rem] leading-8 " +
                "[&_a]:decoration-aqua/45 [&_a]:text-aqua [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-gold" +
                "[&_p]:text-text/86 [&_hr]:border-charcoal [&_strong]:text-text" +
                "[&_h2]:border-charcoal/80 [&_h2]:mt-14 [&_h2]:border-t [&_h2]:pt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-text md:[&_h2]:text-3xl" +
                "[&_h2]:before:mr-3 [&_h2]:before:text-gold [&_h2]:before:content-['//']" +
                "[&_h3]:text-gold/95 [&_h3]:mt-9 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold" +
                "[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6" +
                "[&_code]:bg-midnight/90 [&_code]:text-gold/95 [&_code]:rounded-sm [&_code]:border [&_code]:border-charcoal [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_li::marker]:text-gold" +
                "[&_pre]:bg-black/80 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-charcoal [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:shadow-[inset_0_0_32px_rgba(34,211,238,0.05)]" +
                "[&_pre_code]:text-text/90 [&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0" +
                "[&_img]:border-charcoal/80 [&_img]:rounded-lg [&_img]:border [&_img]:shadow-depth" +
                "[&_blockquote]:border-gold/60 [&_blockquote]:bg-midnight/45 [&_blockquote]:text-text/82 [&_blockquote]:rounded-r-md [&_blockquote]:border-l-2 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic"
              }
            >
              {children}
            </div>
          </div>

          <aside className="lg:sticky lg:top-8" aria-label="CL8Y links and navigation">
            <div className="grain bg-midnight/55 rounded-lg border border-charcoal p-5 shadow-depth">
              <p className="text-aqua/80 text-xs font-semibold uppercase tracking-[0.22em]">
                About CL8Y
              </p>
              <p className="text-text/68 mt-3 text-sm leading-relaxed">
                CL8Y is Ceramic Liberty's platform token for xchain infrastructure. CL8Y supports bridging
                assets, Terra Classic DeFi, gamified launches, and an open source ethos.
              </p>

              <nav className="mt-5" aria-label="Key links">
                <p className="text-gold/75 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  Ecosystem
                </p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  <li>
                    <a
                      href={CL8Y_MARKETING_HOME}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-aqua decoration-aqua/40 hover:text-gold underline underline-offset-4 transition hover:decoration-gold/50"
                    >
                      cl8y.com
                    </a>
                  </li>
                  <li>
                    <a
                      href={CL8Y_BRIDGE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-aqua decoration-aqua/40 hover:text-gold underline underline-offset-4 transition hover:decoration-gold/50"
                    >
                      CL8Y Bridge
                    </a>
                  </li>
                  <li>
                    <a
                      href={USTR_CMM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-aqua decoration-aqua/40 hover:text-gold underline underline-offset-4 transition hover:decoration-gold/50"
                    >
                      ust1cmm.com
                    </a>
                  </li>
                </ul>

                <p className="text-gold/75 mt-5 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  Community
                </p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {telegram ? (
                    <li>
                      <a
                        href={telegram.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-aqua decoration-aqua/40 hover:text-gold underline underline-offset-4 transition hover:decoration-gold/50"
                      >
                        Telegram
                      </a>
                    </li>
                  ) : null}
                  {twitter ? (
                    <li>
                      <a
                        href={twitter.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-aqua decoration-aqua/40 hover:text-gold underline underline-offset-4 transition hover:decoration-gold/50"
                      >
                        X / @ceramictoken
                      </a>
                    </li>
                  ) : null}
                </ul>

                <p className="text-gold/75 mt-5 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  Buy CL8Y
                </p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {tidaldex ? (
                    <li>
                      <a
                        href={tidaldex.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-aqua decoration-aqua/40 hover:text-gold underline underline-offset-4 transition hover:decoration-gold/50"
                      >
                        TidalDex (BSC)
                      </a>
                    </li>
                  ) : null}
                  {pancakeswap ? (
                    <li>
                      <a
                        href={pancakeswap.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-aqua decoration-aqua/40 hover:text-gold underline underline-offset-4 transition hover:decoration-gold/50"
                      >
                        PancakeSwap (BSC)
                      </a>
                    </li>
                  ) : null}
                  {ascendex ? (
                    <li>
                      <a
                        href={ascendex.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-aqua decoration-aqua/40 hover:text-gold underline underline-offset-4 transition hover:decoration-gold/50"
                      >
                        AscendEX (CEX)
                      </a>
                    </li>
                  ) : null}
                </ul>

                <p className="text-gold/75 mt-5 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  CL8Y contracts
                </p>
                <ul className="mt-2 space-y-2 text-sm">
                  {bscContract ? (
                    <li>
                      <a
                        href={bscContract.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <span className="text-text/55 block text-[11px] font-medium uppercase tracking-wide">
                          BSC
                        </span>
                        <span className="text-aqua group-hover:text-gold font-mono text-[13px] underline decoration-aqua/35 underline-offset-2 transition group-hover:decoration-gold/45">
                          {bscContract.tags?.[0]
                            ? shortAddress(bscContract.tags[0])
                            : "View on BscScan"}
                        </span>
                      </a>
                    </li>
                  ) : null}
                  {terraContract ? (
                    <li>
                      <a
                        href={terraContract.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <span className="text-text/55 block text-[11px] font-medium uppercase tracking-wide">
                          Terra Classic
                        </span>
                        <span className="text-aqua group-hover:text-gold font-mono text-[13px] underline decoration-aqua/35 underline-offset-2 transition group-hover:decoration-gold/45 break-all">
                          {terraContract.tags?.[0]
                            ? shortAddress(terraContract.tags[0])
                            : "View on finder"}
                        </span>
                      </a>
                    </li>
                  ) : null}
                  {megaethContract ? (
                    <li>
                      <a
                        href={megaethContract.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <span className="text-text/55 block text-[11px] font-medium uppercase tracking-wide">
                          MegaETH
                        </span>
                        <span className="text-aqua group-hover:text-gold font-mono text-[13px] underline decoration-aqua/35 underline-offset-2 transition group-hover:decoration-gold/45">
                          {megaethContract.tags?.[0]
                            ? shortAddress(megaethContract.tags[0])
                            : "View on explorer"}
                        </span>
                      </a>
                    </li>
                  ) : null}
                </ul>
              </nav>

              <div className="from-gold/30 via-aqua/20 mt-6 h-px bg-gradient-to-r to-transparent" />
              <Link
                to="/blog"
                className="border-gold/25 bg-gold/10 hover:border-aqua/40 hover:bg-aqua/10 focus-visible:ring-aqua/60 mt-5 inline-flex items-center rounded-pill border px-4 py-2 text-sm font-semibold text-gold transition hover:text-aqua focus-visible:outline-none focus-visible:ring-2"
              >
                Back to blog
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
