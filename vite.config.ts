import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import matter from "gray-matter";
import remarkFrontmatter from "remark-frontmatter";
import { defineConfig, type Plugin } from "vite";

/** Package ESM entry incorrectly mixes `require`; load the CJS build instead. */
const require = createRequire(import.meta.url);
const vitePrerender =
  require("vite-plugin-prerender") as typeof import("vite-plugin-prerender").default & {
    PuppeteerRenderer: new (
      options?: Record<string, unknown>,
    ) => import("@prerenderer/renderer-puppeteer").default;
  };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const STATIC_PRERENDER_ROUTES = [
  "/",
  "/engine",
  "/security",
  "/tokenomics",
  "/community",
  "/institutional",
] as const;

function getBlogPrerenderRoutes(): string[] {
  const postsDir = path.join(__dirname, "src/blog/posts");
  if (!fs.existsSync(postsDir)) {
    return ["/blog"];
  }
  const slugs: string[] = [];
  for (const file of fs.readdirSync(postsDir)) {
    if (!file.endsWith(".mdx")) continue;
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data } = matter(raw);
    if (typeof data.slug === "string") {
      slugs.push(data.slug);
    } else {
      console.warn(`[vite.config] Skipping ${file}: missing string "slug" in frontmatter`);
    }
  }
  return ["/blog", ...slugs.map((s) => `/blog/${s}`)];
}

const prerenderRoutes = [...STATIC_PRERENDER_ROUTES, ...getBlogPrerenderRoutes()];

const blogPostMetaVirtualId = "virtual:blog-post-meta";
const resolvedBlogPostMetaVirtualId = "\0virtual:blog-post-meta";

/** Rough word count from MDX body (excludes frontmatter); code blocks weighted lightly. */
function countWordsInMdxBody(body: string): number {
  let s = body.replace(/```[\s\S]*?```/g, " ");
  s = s.replace(/`[^`]*`/g, " ");
  s = s.replace(/!?\[[^\]]*\]\([^)]*\)/g, " ");
  s = s.replace(/<[^>\n]+>/g, " ");
  s = s.replace(/[#*_>|\\[\](){}]/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  if (!s) return 0;
  return s.split(/\s+/).length;
}

function blogPostMetaVirtualModule(): Plugin {
  return {
    name: "blog-post-meta-virtual",
    resolveId(id) {
      if (id === blogPostMetaVirtualId) return resolvedBlogPostMetaVirtualId;
      return undefined;
    },
    load(id) {
      if (id !== resolvedBlogPostMetaVirtualId) return null;
      const postsDir = path.join(__dirname, "src/blog/posts");
      const map: Record<string, Record<string, unknown>> = {};
      if (fs.existsSync(postsDir)) {
        for (const file of fs.readdirSync(postsDir)) {
          if (!file.endsWith(".mdx")) continue;
          const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
          const { data, content } = matter(raw);
          const wordCount = countWordsInMdxBody(content);
          map[`./posts/${file}`] = { ...(data as Record<string, unknown>), wordCount };
        }
      }
      return `export const postMetaByGlobKey = ${JSON.stringify(map)};`;
    },
  };
}

function rssDevPlugin(): Plugin {
  return {
    name: "rss-dev-feed",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?")[0] ?? "";
        if (pathname !== "/rss.xml") {
          next();
          return;
        }
        if (req.method !== "GET" && req.method !== "HEAD") {
          next();
          return;
        }

        const envOrigin =
          process.env.SITE_ORIGIN?.trim().replace(/\/$/, "") ||
          process.env.VITE_SITE_ORIGIN?.trim().replace(/\/$/, "") ||
          "";
        const host = req.headers.host ?? `127.0.0.1:${String(server.config.server.port ?? 5173)}`;
        const origin = envOrigin || `http://${host}`;

        const modUrl = pathToFileURL(path.join(__dirname, "scripts/generate-rss.mjs")).href;
        void import(modUrl)
          .then((mod: { generateRssFeedXml: (o: string) => string }) => {
            const xml = mod.generateRssFeedXml(origin);
            res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
            res.statusCode = 200;
            if (req.method === "HEAD") {
              res.end();
              return;
            }
            res.end(xml);
          })
          .catch((err: unknown) => {
            console.error("[rss-dev]", err);
            next(err instanceof Error ? err : new Error(String(err)));
          });
      });
    },
  };
}

export default defineConfig({
  plugins: [
    rssDevPlugin(),
    blogPostMetaVirtualModule(),
    react(),
    mdx({
      remarkPlugins: [remarkFrontmatter],
    }),
    vitePrerender({
      staticDir: path.join(__dirname, "dist"),
      routes: prerenderRoutes,
      renderer: new vitePrerender.PuppeteerRenderer({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
          "--mute-audio",
        ],
        navigationOptions: { waitUntil: "domcontentloaded", timeout: 120_000 },
        renderAfterTime: 12_000,
      }),
    }),
  ],
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
