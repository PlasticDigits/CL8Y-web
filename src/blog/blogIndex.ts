import type { ComponentType } from "react";
import { postMetaByGlobKey } from "virtual:blog-post-meta";

export type BlogPostMeta = {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  /** Words in post body (from build-time MDX parse, excluding frontmatter). */
  wordCount: number;
};

export type BlogPost = BlogPostMeta & {
  Component: ComponentType;
};

const mdxModules = import.meta.glob<{ default: ComponentType }>("./posts/*.mdx", {
  eager: true,
});

function parseFrontmatterRecord(filePath: string, data: Record<string, unknown>): BlogPostMeta {
  const meta = data as Partial<BlogPostMeta>;
  const required: (keyof BlogPostMeta)[] = [
    "title",
    "description",
    "slug",
    "date",
    "author",
    "image",
    "tags",
    "wordCount",
  ];
  for (const key of required) {
    if (meta[key] === undefined || meta[key] === null) {
      throw new Error(`Blog post ${filePath}: missing frontmatter field "${String(key)}"`);
    }
  }
  if (!Array.isArray(meta.tags)) {
    throw new Error(`Blog post ${filePath}: "tags" must be an array`);
  }
  if (typeof meta.wordCount !== "number" || !Number.isFinite(meta.wordCount) || meta.wordCount < 0) {
    throw new Error(`Blog post ${filePath}: "wordCount" must be a non-negative finite number`);
  }
  return meta as BlogPostMeta;
}

function buildPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const pathKey of Object.keys(mdxModules)) {
    const mod = mdxModules[pathKey];
    const rawMeta = postMetaByGlobKey[pathKey];
    if (!rawMeta) {
      throw new Error(`Blog post ${pathKey}: missing frontmatter entry (virtual:blog-post-meta)`);
    }
    const meta = parseFrontmatterRecord(pathKey, rawMeta);
    posts.push({ ...meta, Component: mod.default });
  }
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const blogPosts = buildPosts();

export function getPostBySlug(slug: string | undefined): BlogPost | undefined {
  if (!slug) return undefined;
  return blogPosts.find((p) => p.slug === slug);
}

/** Routes for prerender / sitemap-style consumers (mirrors `getBlogPrerenderRoutes` in vite.config). */
export const blogRoutes: string[] = ["/blog", ...blogPosts.map((p) => `/blog/${p.slug}`)];
