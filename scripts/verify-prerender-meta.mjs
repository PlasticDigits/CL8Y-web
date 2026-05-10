/**
 * Ensures prerender wrote real HTML (not the empty SPA shell) with Open Graph tags.
 * vite-plugin-prerender does not fail the build when Puppeteer cannot render the app.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "..", "dist");

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

/** True when #root never mounted (typical broken-Puppeteer output). */
function hasEmptyRootShell(html) {
  return /<div id="root">\s*<\/div>/i.test(html);
}

const htmlFiles = walk(dist).filter((f) => f.endsWith("index.html"));

const failures = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(dist, file);
  const nrel = rel.split(path.sep).join("/");
  const hasOgImage = html.includes('property="og:image"') || html.includes("property='og:image'");
  const emptyRoot = hasEmptyRootShell(html);

  const isBlogPost = /^blog\/[^/]+\/index\.html$/.test(nrel);
  const isMarketing =
    nrel === "index.html" ||
    ["engine", "security", "tokenomics", "community", "institutional"].some((r) => nrel === `${r}/index.html`);

  if (isBlogPost || isMarketing) {
    if (!hasOgImage || emptyRoot) {
      failures.push({ rel, hasOgImage, emptyRoot });
    }
  }
}

if (failures.length) {
  console.error("[verify-prerender-meta] Prerender output invalid (need og:image + non-empty #root):");
  for (const f of failures) {
    console.error(`  ${f.rel}  og:image=${f.hasOgImage}  empty-root-shell=${f.emptyRoot}`);
  }
  process.exit(1);
}

console.log(`[verify-prerender-meta] OK (${htmlFiles.length} index.html files checked).`);
