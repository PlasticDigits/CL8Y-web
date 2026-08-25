import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../..", import.meta.url)));

const BSC = "0x8F452a1fdd388A45e1080992eFF051b4dd9048d2";
const TERRA = "terra16wtml2q66g82fdkx66tap0qjkahqwp4lwq3ngtygacg5q0kzycgqvhpax3";
const MEGA = "0xfBAa45A537cF07dC768c469FfaC4e88208B0098D";
const POOL = "0xBe9F06b76e301b49Dc345948a7a5E3418264886A";

function read(relativePath: string): string {
  return readFileSync(resolve(root, relativePath), "utf8");
}

describe("token directory addresses", () => {
  const directory = read("src/data/tokenDirectory.ts");
  const env = read("src/lib/env.ts");

  it("exposes exact checksums and the full Terra Classic address", () => {
    assert.ok(directory.includes(`"${BSC}"`));
    assert.ok(directory.includes(`"${TERRA}"`));
    assert.ok(directory.includes(`"${MEGA}"`));
    assert.notEqual(BSC, BSC.toLowerCase());
    assert.equal(directory.includes(BSC.toLowerCase()), false);
  });

  it("points explorers at those exact address constants", () => {
    assert.ok(directory.includes("https://bscscan.com/token/${BSC_CL8Y_ADDRESS}"));
    assert.ok(directory.includes("https://finder.terra.money/classic/address/${TERRA_CLASSIC_CL8Y_ADDRESS}"));
    assert.ok(directory.includes("https://mega.etherscan.io/token/${MEGAETH_CL8Y_ADDRESS}"));
  });

  it("keeps env defaults aligned with the directory, not a lowercased twin", () => {
    assert.ok(env.includes("BSC_CL8Y_ADDRESS"));
    assert.ok(env.includes("BSC_CL8Y_POOL_ADDRESS"));
    assert.equal(env.includes("0x8f452a1fdd388a45e1080992eff051b4dd9048d2"), false);
    assert.ok(directory.includes(`"${POOL}"`));
  });
});

describe("token directory venues and listings", () => {
  const directory = read("src/data/tokenDirectory.ts");

  it("puts CL8Y DEX first and keeps venues on known hosts", () => {
    const tradeBlock = directory.slice(directory.indexOf("export const TRADE_VENUES"));
    assert.match(tradeBlock, /id: "cl8y-dex"/);
    assert.ok(tradeBlock.includes("CANONICAL_PRODUCT_URLS.dex"));
    assert.ok(directory.includes("tidaldex.com"));
    assert.ok(directory.includes("pancakeswap.finance"));
    assert.ok(directory.includes("app.uniswap.org"));
    assert.ok(directory.includes("garuda-defi.org"));
    assert.ok(directory.includes("www.kumbaya.xyz"));
    assert.ok(directory.includes("app.sir.trading"));
  });

  it("keeps listings off trade wording and uses the pool id for GeckoTerminal", () => {
    assert.ok(directory.includes("https://www.geckoterminal.com/bsc/pools/${BSC_CL8Y_POOL_ADDRESS}"));
    assert.equal(directory.includes(`geckoterminal.com/bsc/pools/${BSC}`), false);
    const listings = directory.slice(directory.indexOf("export const TOKEN_LISTINGS"));
    assert.doesNotMatch(listings, /label: "Trade /);
  });

  it("contains no CEX or Coinbase hrefs", () => {
    const hrefs = [...directory.matchAll(/href:\s*(?:`([^`]+)`|"([^"]+)")/g)].map(
      (match) => match[1] ?? match[2] ?? "",
    );
    assert.ok(hrefs.length > 0);
    for (const href of hrefs) {
      assert.doesNotMatch(href, /ascendex|binance\.com|kraken|coinbase/i, href);
    }
  });
});

describe("directory consumers do not hardcode venues", () => {
  it("reads addresses from the directory module", () => {
    const ui = read("src/features/token/TokenDirectory.tsx");
    const copyHelper = read("src/lib/copyText.ts");
    assert.ok(ui.includes("TOKEN_ADDRESSES"));
    assert.ok(ui.includes("TRADE_VENUES"));
    assert.ok(ui.includes("TOKEN_LISTINGS"));
    assert.ok(ui.includes("copyText(row.address)"));
    assert.equal(ui.includes("innerText"), false);
    assert.ok(copyHelper.includes("navigator.clipboard.writeText(value)"));
    assert.ok(copyHelper.includes("textarea.value = value"));
  });

  it("keeps current surfaces free of CEX trade URLs and leftover buy language", () => {
    const files = [
      "src/data/links.ts",
      "src/data/copy.ts",
      "src/data/tokenDirectory.ts",
      "src/features/token/TokenDirectory.tsx",
      "src/app/Home.tsx",
      "src/blog/ArticleLayout.tsx",
      "PROJECT_GUIDE.md",
    ];
    for (const file of files) {
      const text = read(file);
      assert.equal(text.includes("https://ascendex.com"), false, file);
      assert.equal(text.includes("More exchanges"), false, file);
      assert.equal(text.includes("Buy CL8Y"), false, file);
    }
  });
});

describe("clickjacking host headers", () => {
  it("declares DENY and frame-ancestors none without dropping blog routes", () => {
    const yaml = read("render.yaml");
    const invariants = read("src/content/invariants.ts");
    assert.ok(yaml.includes("X-Frame-Options"));
    assert.ok(yaml.includes("DENY"));
    assert.ok(yaml.includes("Content-Security-Policy"));
    assert.ok(yaml.includes("frame-ancestors 'none'"));
    assert.ok(yaml.includes("yarn install --immutable"));
    assert.ok(yaml.includes("/blog/*"));
    assert.ok(invariants.includes('xFrameOptions: "DENY"'));
    assert.ok(invariants.includes("frame-ancestors 'none'"));
  });
});
