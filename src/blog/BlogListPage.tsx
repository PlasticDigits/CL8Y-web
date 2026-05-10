import { Link } from "react-router-dom";
import { BlogBreadcrumb } from "./BlogBreadcrumb";
import { blogPosts } from "./blogIndex";
import { SEO } from "./SEO";
import { MarketingFooter } from "../components/layout/MarketingFooter";

function formatPostDate(date: string) {
  return Number.isNaN(Date.parse(date))
    ? date
    : new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}

export default function BlogListPage() {
  const [featuredPost, ...recentPosts] = blogPosts;

  return (
    <>
      <SEO
        title="CL8Y Blog"
        description="Updates and deep dives on CL8Y cross-chain infrastructure, DeFi, and the broader ecosystem."
        canonicalPath="/blog"
        ogType="website"
      />
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(900px_460px_at_12%_-12%,rgba(212,175,55,0.14),transparent),radial-gradient(700px_420px_at_88%_6%,rgba(34,211,238,0.10),transparent),linear-gradient(180deg,rgba(26,31,43,0.62),rgba(12,12,12,0)_34rem)] font-body text-text">
        <img
          src="/images/logo/CLAY-VECTOR-LARGE.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-56 top-4 w-[720px] max-w-none select-none opacity-[0.035]"
        />
        <div
          className="via-gold/50 pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
          aria-hidden
        />
        <main
          id="main"
          role="main"
          className="container relative z-10 mx-auto max-w-6xl flex-1 px-6 py-16 md:py-20"
          tabIndex={-1}
        >
          <BlogBreadcrumb />
          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <span className="text-ember/90 text-xs font-semibold uppercase tracking-[0.28em]">
                CL8Y Research
              </span>
              <h1 className="mt-4 max-w-3xl bg-gradient-to-r from-[#FFD700] via-gold to-[#A9812F] bg-clip-text font-display text-4xl font-bold tracking-tight text-transparent md:text-6xl">
                Field notes from the cross-chain economy.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
                Articles from the CL8Y team on protocol design, launches, token mechanics, and
                ecosystem milestones.
              </p>
            </div>
            <div className="grain bg-midnight/60 rounded-lg border border-charcoal p-5 shadow-depth [box-shadow:var(--shadow-depth),inset_0_0_44px_rgba(212,175,55,0.05)]">
              <p className="text-aqua/80 text-xs font-semibold uppercase tracking-[0.22em]">
                Signal archive
              </p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-display text-3xl font-bold text-gold">{blogPosts.length}</p>
                  <p className="text-text/60 mt-1 text-xs">Published posts</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-aqua">
                    {new Set(blogPosts.flatMap((post) => post.tags)).size}
                  </p>
                  <p className="text-text/60 mt-1 text-xs">Tracked topics</p>
                </div>
              </div>
              <div className="from-gold/30 via-aqua/25 mt-5 h-px bg-gradient-to-r to-transparent" />
              <p className="text-text/70 mt-4 text-sm leading-relaxed">
                Follow the decisions, releases, and market context shaping CL8Y, with enough detail
                to understand what changed and why it matters.
              </p>
            </div>
          </section>

          {featuredPost ? (
            <section className="mt-12" aria-labelledby="featured-post-heading">
              <div className="mb-4 flex items-center gap-3">
                <span className="from-gold/50 h-px flex-1 bg-gradient-to-r via-charcoal to-transparent" />
                <h2
                  id="featured-post-heading"
                  className="text-text/60 text-xs font-semibold uppercase tracking-[0.24em]"
                >
                  Featured
                </h2>
              </div>
              <article className="border-gold/25 bg-midnight/70 grain group overflow-hidden rounded-lg border shadow-depth md:grid md:grid-cols-[minmax(0,1fr)_360px]">
                <div className="p-6 md:p-8">
                  <p className="text-text/60 text-sm">
                    <time dateTime={featuredPost.date}>{formatPostDate(featuredPost.date)}</time>
                    <span className="text-gold/45 mx-2">·</span>
                    {featuredPost.author}
                  </p>
                  <h3 className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight text-text md:text-4xl">
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="focus-visible:ring-aqua/60 rounded-sm hover:text-gold focus-visible:outline-none focus-visible:ring-2"
                    >
                      {featuredPost.title}
                    </Link>
                  </h3>
                  <p className="text-text/78 mt-4 max-w-2xl text-base leading-relaxed">
                    {featuredPost.description}
                  </p>
                  {featuredPost.tags.length > 0 ? (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {featuredPost.tags.map((tag) => (
                        <li key={tag}>
                          <span className="border-gold/25 bg-gold/10 text-gold/90 rounded-pill border px-3 py-1 text-xs font-semibold">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="border-aqua/30 bg-aqua/10 hover:border-gold/40 hover:bg-gold/10 focus-visible:ring-aqua/60 mt-8 inline-flex items-center rounded-pill border px-4 py-2 text-sm font-semibold text-aqua transition hover:text-gold focus-visible:outline-none focus-visible:ring-2"
                  >
                    Read article
                  </Link>
                </div>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="bg-black/30 relative min-h-64 overflow-hidden border-t border-charcoal md:border-l md:border-t-0"
                  aria-label={`Read ${featuredPost.title}`}
                >
                  {featuredPost.image ? (
                    <img
                      src={featuredPost.image}
                      alt=""
                      className="h-full min-h-64 w-full object-cover opacity-70 saturate-[0.85] transition duration-500 group-hover:scale-105 group-hover:opacity-85"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.18),transparent_42%),linear-gradient(180deg,transparent,rgba(12,12,12,0.82))]" />
                  <img
                    src="/images/logo/CLAY-VECTOR-LARGE.svg"
                    alt=""
                    aria-hidden
                    className="absolute bottom-6 right-6 h-20 w-20 opacity-30 drop-shadow-[0_0_24px_rgba(212,175,55,0.25)]"
                  />
                </Link>
              </article>
            </section>
          ) : null}

          {recentPosts.length > 0 ? (
            <section className="mt-14" aria-labelledby="latest-posts-heading">
              <div className="mb-6 flex items-center gap-3">
                <h2 id="latest-posts-heading" className="font-display text-2xl font-bold text-text">
                  Latest articles
                </h2>
                <span className="via-charcoal/70 h-px flex-1 bg-gradient-to-r from-charcoal to-transparent" />
              </div>
              <ul className="grid gap-5 md:grid-cols-2">
                {recentPosts.map((post) => (
                  <li key={post.slug}>
                    <article className="bg-midnight/55 grain hover:border-gold/35 hover:bg-midnight/75 group h-full rounded-lg border border-charcoal p-5 shadow-depth transition duration-200 hover:-translate-y-0.5">
                      <p className="text-aqua/75 text-xs font-semibold uppercase tracking-[0.18em]">
                        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      </p>
                      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight md:text-2xl">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="focus-visible:ring-aqua/60 rounded-sm text-text transition focus-visible:outline-none focus-visible:ring-2 group-hover:text-gold"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-text/72 mt-3 text-sm leading-relaxed">
                        {post.description}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-text/50 text-xs">{post.author}</span>
                        {post.tags[0] ? (
                          <span className="border-gold/20 bg-black/25 text-gold/85 rounded-pill border px-2.5 py-1 text-xs">
                            {post.tags[0]}
                          </span>
                        ) : null}
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </main>
        <div className="container relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-8">
          <MarketingFooter />
        </div>
      </div>
    </>
  );
}
