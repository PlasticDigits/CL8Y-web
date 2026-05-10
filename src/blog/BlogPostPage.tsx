import { MDXProvider } from "@mdx-js/react";
import { Link, useParams } from "react-router-dom";
import { MarketingFooter } from "../components/layout/MarketingFooter";
import { ArticleLayout } from "./ArticleLayout";
import { BlogBreadcrumb } from "./BlogBreadcrumb";
import { getPostBySlug } from "./blogIndex";
import { SEO } from "./SEO";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <>
        <SEO
          title="Post not found — CL8Y Blog"
          description="The requested blog post could not be found."
          canonicalPath={`/blog/${slug ?? ""}`}
          noindex
        />
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(860px_460px_at_18%_-8%,rgba(212,175,55,0.13),transparent),radial-gradient(700px_420px_at_84%_2%,rgba(34,211,238,0.09),transparent)] font-body text-text">
          <img
            src="/images/logo/CLAY-VECTOR-LARGE.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-56 top-0 w-[720px] max-w-none select-none opacity-[0.035]"
          />
          <main
            id="main"
            role="main"
            className="container relative z-10 mx-auto max-w-3xl flex-1 px-6 py-24"
            tabIndex={-1}
          >
            <BlogBreadcrumb postTitle="Not found" />
            <div className="grain bg-midnight/65 rounded-lg border border-charcoal p-8 shadow-depth">
              <span className="text-ember/90 text-xs font-semibold uppercase tracking-[0.24em]">
                404
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
                Post not found
              </h1>
              <p className="text-text/75 mt-4">
                There is no article at <span className="font-mono text-aqua">/blog/{slug}</span>.
              </p>
              <Link
                to="/blog"
                className="border-aqua/30 bg-aqua/10 hover:border-gold/40 hover:bg-gold/10 focus-visible:ring-aqua/60 mt-8 inline-flex rounded-pill border px-4 py-2 text-sm font-semibold text-aqua transition hover:text-gold focus-visible:outline-none focus-visible:ring-2"
              >
                Back to blog
              </Link>
            </div>
          </main>
          <div className="container relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-8">
            <MarketingFooter />
          </div>
        </div>
      </>
    );
  }

  const { Component, ...meta } = post;

  return (
    <>
      <SEO
        title={`${meta.title} — CL8Y Blog`}
        description={meta.description}
        canonicalPath={`/blog/${meta.slug}`}
        ogImage={meta.image}
        ogType="article"
        twitterCard="summary_large_image"
        articlePublishedTime={meta.date}
        articleAuthor={meta.author}
      />
      <div className="flex min-h-[calc(100vh-2rem)] flex-col font-body text-text">
        <div className="flex-1">
          <ArticleLayout
            title={meta.title}
            date={meta.date}
            author={meta.author}
            image={meta.image}
            tags={meta.tags}
            wordCount={meta.wordCount}
          >
            <MDXProvider>
              <Component />
            </MDXProvider>
          </ArticleLayout>
        </div>
        <div className="container mx-auto max-w-5xl px-6 pb-16 pt-8">
          <MarketingFooter />
        </div>
      </div>
    </>
  );
}
