import { Link } from "react-router-dom";
import { CL8Y_MARKETING_HOME } from "../lib/siteUrls";

type BlogBreadcrumbProps = {
  /** When set, renders as the third segment after Home / Blog (e.g. post title). */
  postTitle?: string;
};

export function BlogBreadcrumb({ postTitle }: BlogBreadcrumbProps) {
  return (
    <nav
      className="bg-black/30 text-aqua/85 mb-8 inline-flex max-w-full items-center rounded-pill border border-charcoal px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.18em] shadow-[inset_0_0_24px_rgba(34,211,238,0.04)]"
      aria-label="Breadcrumb"
    >
      <a
        href={CL8Y_MARKETING_HOME}
        className="focus-visible:ring-aqua/60 rounded-sm hover:text-gold focus-visible:outline-none focus-visible:ring-2"
      >
        Home
      </a>
      <span className="text-gold/35 mx-2">/</span>
      <Link
        to="/blog"
        className="focus-visible:ring-aqua/60 rounded-sm hover:text-gold focus-visible:outline-none focus-visible:ring-2"
      >
        Blog
      </Link>
      {postTitle ? (
        <>
          <span className="text-gold/35 mx-2">/</span>
          <span className="text-text/70 truncate normal-case tracking-normal">{postTitle}</span>
        </>
      ) : null}
    </nav>
  );
}
