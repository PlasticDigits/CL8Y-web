/**
 * @prerenderer/renderer-puppeteer uses `waituntil` (invalid); Puppeteer v21+ requires `waitUntil`.
 * Run on postinstall so fresh installs work with npm overrides for modern `puppeteer`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, "node_modules/@prerenderer/renderer-puppeteer/es6/renderer.js");

if (!fs.existsSync(target)) {
  console.warn("[fix-renderer-puppeteer-navigation] renderer.js not found, skip.");
  process.exit(0);
}

let src = fs.readFileSync(target, "utf8");

if (!src.includes("waituntil: 'networkidle0'")) {
  console.log("[fix-renderer-puppeteer-navigation] Already patched or upstream changed, skip.");
  process.exit(0);
}

src = src.replace(/waituntil: 'networkidle0'/g, "waitUntil: 'networkidle0'");

const singleLine =
  /const navigationOptions = \(options\.navigationOptions\) \? \{ waitUntil: 'networkidle0', \.\.\.options\.navigationOptions \} : \{ waitUntil: 'networkidle0' \};/;

if (singleLine.test(src)) {
  src = src.replace(
    singleLine,
    `const navigationOptions = options.navigationOptions
              ? { waitUntil: 'networkidle0', ...options.navigationOptions }
              : { waitUntil: 'networkidle0' }`,
  );
}

fs.writeFileSync(target, src);
console.log("[fix-renderer-puppeteer-navigation] Patched waitUntil for Puppeteer compatibility.");
