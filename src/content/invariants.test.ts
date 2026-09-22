import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../..", import.meta.url)));

const BANNED_CURRENT_COPY = [
  "GameFi",
  "PROTOCASS",
  "Karnyx",
  "TigerHunt",
  "UST1",
  "USTR",
  "memecoin",
  "AscendEX",
  "Buy CL8Y",
  "Autoscarcity",
  "the future of DeFi",
  "expensive token",
] as const;

const CURRENT_PRODUCT_SURFACES = [
  "index.html",
  "src/data/copy.ts",
  "src/data/products.ts",
  "src/app/Home.tsx",
  "src/app/DefaultHead.tsx",
  "src/app/index.tsx",
  "src/features/hero/Hero.tsx",
  "src/features/products/Products.tsx",
  "src/features/utility/Utility.tsx",
  "src/features/trust/Trust.tsx",
  "src/features/community/Community.tsx",
  "src/features/token/TokenDirectory.tsx",
  "src/data/tokenDirectory.ts",
  "src/data/links.ts",
  "src/lib/copyText.ts",
  "src/lib/scrollToAnchor.ts",
  "src/app/HashScroll.tsx",
  "src/components/chrome/SiteHeader.tsx",
  "src/components/chrome/SiteFooter.tsx",
  "STYLE_GUIDE.md",
  "PROJECT_GUIDE.md",
] as const;

const RETIRED_HOMEPAGE_MODULES = [
  "src/features/gamefi/GameFiAI.tsx",
  "src/features/engine/Engine.tsx",
  "src/features/tokenomics/Tokenomics.tsx",
  "src/features/security/LayeredSecurity.tsx",
  "src/features/institutional/Institutional.tsx",
  "src/components/visuals/BuyTicker.tsx",
  "src/components/visuals/HeroImageCard.tsx",
] as const;

function readSurface(relativePath: string): string {
  return readFileSync(resolve(root, relativePath), "utf8");
}

describe("product URL invariants", () => {
  const products = readSurface("src/data/products.ts");
  const invariants = readSurface("src/content/invariants.ts");

  it("keeps Bridge and DEX as exact https origins", () => {
    assert.ok(invariants.includes('bridge: "https://bridge.cl8y.com"'));
    assert.ok(invariants.includes('dex: "https://dex.cl8y.com"'));
    assert.ok(products.includes("CANONICAL_PRODUCT_URLS"));
    assert.ok(products.includes('EXTERNAL_REL = "noopener noreferrer"'));
    assert.ok(invariants.includes('contact@ceramicliberty.com'));
  });

  it("rejects userinfo, queries, and javascript hrefs in the stored constants", () => {
    assert.equal(invariants.includes("javascript:"), false);
    assert.doesNotMatch(invariants, /bridge\.cl8y\.com[/?#@]/);
    assert.doesNotMatch(invariants, /dex\.cl8y\.com[/?#@]/);
  });

  it("pins the hosted Terms portal URL for the marketing footer link", () => {
    assert.ok(invariants.includes('LEGAL_TERMS_URL = "https://terms.cl8y.com"'));
    const footer = readSurface("src/components/chrome/SiteFooter.tsx");
    assert.ok(footer.includes("LEGAL_TERMS_URL"));
    assert.ok(footer.includes("ExternalLink"));
    assert.equal(footer.includes("TermsGate"), false);
    assert.equal(footer.includes("Privacy"), false);
  });
});

describe("marketing legal exception (no clickwrap)", () => {
  it("does not depend on cl8y-clickwrap", () => {
    const pkg = readSurface("package.json");
    assert.equal(pkg.includes("cl8y-clickwrap"), false);
  });

  it("does not import TermsGate under src/", () => {
    const srcRoot = resolve(root, "src");
    const walk = (dir: string): string[] => {
      const names: string[] = [];
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) names.push(...walk(full));
        else if (/\.(ts|tsx)$/.test(entry.name) && !/\.test\.(ts|tsx)$/.test(entry.name)) {
          names.push(full);
        }
      }
      return names;
    };
    for (const file of walk(srcRoot)) {
      const text = readFileSync(file, "utf8");
      assert.doesNotMatch(text, /from\s+["']@plasticdigits\/cl8y-clickwrap/, file);
      assert.doesNotMatch(text, /import\s+.*\bTermsGate\b/, file);
      assert.doesNotMatch(text, /<TermsGate\b/, file);
      assert.doesNotMatch(text, /\/api\/v1\/signatures\/status/, file);
    }
  });
});

describe("copy tightness and positioning", () => {
  const copy = readSurface("src/data/copy.ts");

  it("keeps the hero headline at or under eight words", () => {
    const match = copy.match(/headline: "([^"]+)"/);
    assert.ok(match);
    assert.ok(match[1].trim().split(/\s+/).length <= 8);
  });

  it("states utility + Bridge + DEX without inventing tier numbers", () => {
    assert.match(copy, /utility token/i);
    assert.match(copy, /CL8Y DEX/);
    assert.match(copy, /Bridge/);
    assert.match(copy, /tier/);
    assert.doesNotMatch(copy, /\d+\s*%/);
    assert.doesNotMatch(copy, /\$\d/);
  });

  it("keeps a longer footer explainer and legal blocks", () => {
    const explainer = copy.match(/explainer:\s*"([^"]+)"/);
    const subhead = copy.match(/subhead: "([^"]+)"/);
    assert.ok(explainer && subhead);
    assert.ok(explainer[1].length > subhead[1].length);
    assert.match(copy, /Disclaimer: Important Legal Notice/);
    assert.match(copy, /Law Enforcement Requests/);
    assert.ok(copy.includes("contact@ceramicliberty.com"));
  });
});

describe("current-product surfaces", () => {
  it("do not contain retired narrative terms", () => {
    const hits: string[] = [];
    for (const file of CURRENT_PRODUCT_SURFACES) {
      const text = readSurface(file);
      for (const term of BANNED_CURRENT_COPY) {
        if (text.includes(term)) hits.push(`${file}: ${term}`);
      }
    }
    assert.deepEqual(hits, []);
  });

  it("wires product CTAs to the canonical constants", () => {
    const hero = readSurface("src/features/hero/Hero.tsx");
    const products = readSurface("src/features/products/Products.tsx");
    const header = readSurface("src/components/chrome/SiteHeader.tsx");
    assert.ok(hero.includes("PRODUCT_URLS.bridge"));
    assert.ok(hero.includes("PRODUCT_URLS.dex"));
    assert.ok(products.includes("PRODUCT_URLS.bridge"));
    assert.ok(products.includes("PRODUCT_URLS.dex"));
    assert.ok(header.includes("PRODUCT_URLS.bridge"));
    assert.ok(header.includes("PRODUCT_URLS.dex"));
    assert.equal(hero.includes("window.location"), false);
    assert.equal(hero.includes("searchParams"), false);
  });

  it("rewrites index.html share tags to the new positioning", () => {
    const html = readSurface("index.html");
    assert.ok(html.includes("CL8Y — Bridge, DEX, and utility token"));
    assert.ok(html.includes("reduced fees on CL8Y DEX trading tiers"));
    for (const term of BANNED_CURRENT_COPY) {
      assert.equal(html.includes(term), false, term);
    }
  });

  it("does not remount retired homepage modules", () => {
    const home = readSurface("src/app/Home.tsx");
    const app = readSurface("src/app/index.tsx");
    for (const file of RETIRED_HOMEPAGE_MODULES) {
      const spec = file.replace("src/", "../").replace(/\.tsx$/, "");
      assert.equal(home.includes(spec), false, spec);
      assert.equal(app.includes(spec), false, spec);
    }
    assert.equal(home.includes("BuyTicker"), false);
    assert.equal(home.includes("GameFiAI"), false);
    assert.ok(app.includes("LegacyRedirect"));
  });

  it("mounts the token directory, not the placeholder", () => {
    const home = readSurface("src/app/Home.tsx");
    assert.ok(home.includes("TokenDirectory"));
    assert.equal(home.includes("TokenPlaceholder"), false);
    assert.ok(home.includes("ANCHORS.token"));
  });
});
