#!/usr/bin/env node
/**
 * Writes dist/rss.xml from MDX frontmatter in src/blog/posts (production build).
 * `generateRssFeedXml` is also used by Vite dev middleware so /rss.xml works on localhost.
 * Base URL: SITE_ORIGIN or VITE_SITE_ORIGIN, else https://cl8y.com (see src/lib/siteUrls.ts).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "src", "blog", "posts");
const OUT_FILE = path.join(ROOT, "dist", "rss.xml");

const DEFAULT_ORIGIN = "https://cl8y.com";

function getSiteOrigin() {
  const raw = process.env.SITE_ORIGIN?.trim() || process.env.VITE_SITE_ORIGIN?.trim() || "";
  const normalized = raw.replace(/\/$/, "");
  return normalized || DEFAULT_ORIGIN;
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822Date(isoOrDate) {
  const t = Date.parse(isoOrDate);
  if (Number.isNaN(t)) {
    return new Date().toUTCString();
  }
  return new Date(t).toUTCString();
}

function collectPosts() {
  /** @type {Array<{ title: string; description: string; slug: string; date: string; author: string; tags: string[] }>} */
  const posts = [];
  if (!fs.existsSync(POSTS_DIR)) {
    return posts;
  }
  for (const file of fs.readdirSync(POSTS_DIR)) {
    if (!file.endsWith(".mdx")) continue;
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data } = matter(raw);
    const slug = data.slug;
    if (typeof slug !== "string" || !slug.length) {
      console.warn(`[generate-rss] Skipping ${file}: missing string "slug" in frontmatter`);
      continue;
    }
    const title = data.title;
    const description = data.description;
    const date = data.date;
    const author = data.author;
    const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
    if (typeof title !== "string" || typeof description !== "string") {
      console.warn(`[generate-rss] Skipping ${file}: missing title or description`);
      continue;
    }
    if (typeof date !== "string" || typeof author !== "string") {
      console.warn(`[generate-rss] Skipping ${file}: missing date or author`);
      continue;
    }
    posts.push({
      title,
      description,
      slug,
      date,
      author,
      tags,
    });
  }
  posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  return posts;
}

/** Build RSS XML for the given site origin (no trailing slash). Exported for Vite dev middleware. */
export function generateRssFeedXml(origin) {
  const normalized = String(origin).replace(/\/$/, "") || DEFAULT_ORIGIN;
  const posts = collectPosts();
  return buildRssXml(normalized, posts);
}

function buildRssXml(origin, posts) {
  const blogUrl = `${origin}/blog`;
  const selfUrl = `${origin}/rss.xml`;
  const lastBuild = new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const itemLink = `${origin}/blog/${post.slug}`;
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(itemLink)}</link>
      <guid isPermaLink="true">${escapeXml(itemLink)}</guid>
      <pubDate>${rfc822Date(post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
${categories ? `${categories}\n` : ""}    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CL8Y Blog</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>Updates and deep dives on CL8Y cross-chain infrastructure, DeFi, and the broader ecosystem.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />
    <generator>CL8Y-web</generator>
${itemsXml ? `\n${itemsXml}\n` : ""}  </channel>
</rss>
`;
}

function main() {
  const distDir = path.join(ROOT, "dist");
  if (!fs.existsSync(distDir)) {
    console.error("[generate-rss] dist/ does not exist. Run vite build first.");
    process.exit(1);
  }
  const origin = getSiteOrigin();
  const posts = collectPosts();
  const xml = buildRssXml(origin, posts);
  fs.writeFileSync(OUT_FILE, xml, "utf8");
  console.log(
    `[generate-rss] Wrote ${path.relative(ROOT, OUT_FILE)} (${posts.length} items, origin ${origin})`,
  );
}

const __filename = fileURLToPath(import.meta.url);
const invokedDirectly =
  process.argv[1] != null && path.resolve(process.argv[1]) === path.resolve(__filename);
if (invokedDirectly) {
  main();
}
