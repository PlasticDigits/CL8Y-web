import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  RESERVED_HOST_MISS_DESTINATION,
  RESERVED_LEGAL_GUESS_PATHS,
} from "../src/lib/reservedLegalGuessPaths.ts";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

function fail(message: string): never {
  console.error(`[verify-reserved-host-rules] ${message}`);
  process.exit(1);
}

const distRedirects = resolve(root, "dist/_redirects");
let redirects: string;
try {
  redirects = readFileSync(distRedirects, "utf8");
} catch {
  fail("dist/_redirects missing — run vite build first");
}

const spaFallbackIndex = redirects.split("\n").findIndex((line) => line.startsWith("/*"));
if (spaFallbackIndex < 0) {
  fail("dist/_redirects missing /* SPA fallback");
}

const beforeFallback = redirects.split("\n").slice(0, spaFallbackIndex).join("\n");
for (const path of RESERVED_LEGAL_GUESS_PATHS) {
  for (const candidate of [path, `${path}/`]) {
    const expected = `${candidate} /404.html 404`;
    if (!beforeFallback.includes(expected)) {
      fail(`dist/_redirects missing reserved rule: ${expected}`);
    }
  }
}

if (!redirects.includes(RESERVED_HOST_MISS_DESTINATION)) {
  // Render miss target is render.yaml-only; dist need not include it.
}

console.log(
  `[verify-reserved-host-rules] OK — ${RESERVED_LEGAL_GUESS_PATHS.length} paths precede SPA fallback in dist/_redirects`,
);
