import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import {
  canonicalRequestPath,
  isReservedHostMissPath,
  isReservedLegalGuessPath,
  RESERVED_HOST_MISS_DESTINATION,
  RESERVED_LEGAL_GUESS_PATHS,
} from "./reservedLegalGuessPaths.ts";

const root = resolve(fileURLToPath(new URL("../..", import.meta.url)));

describe("reservedLegalGuessPaths", () => {
  it("matches documented aliases case-insensitively with optional trailing slash", () => {
    for (const path of RESERVED_LEGAL_GUESS_PATHS) {
      assert.equal(isReservedLegalGuessPath(path), true, path);
      assert.equal(isReservedLegalGuessPath(`${path}/`), true, `${path}/`);
      assert.equal(isReservedLegalGuessPath(path.toUpperCase()), true, path.toUpperCase());
    }
  });

  it("strips query and hash before matching and does not use them as a redirect", () => {
    assert.equal(isReservedLegalGuessPath("/privacy?next=https://evil.example"), true);
    assert.equal(isReservedLegalGuessPath("/cookies#section"), true);
    assert.equal(canonicalRequestPath("/privacy?next=https://evil.example"), "/privacy");
  });

  it("decodes once, then removes dot segments, and does not decode a second time", () => {
    assert.equal(isReservedLegalGuessPath("/%70rivacy"), true);
    assert.equal(isReservedLegalGuessPath("/privacy/%2e%2e/privacy"), true);
    assert.equal(isReservedLegalGuessPath("/privacy/%2e%2e/"), false);
    assert.equal(isReservedLegalGuessPath("/blog/../privacy"), true);
    assert.equal(isReservedLegalGuessPath("/%252e%252e/privacy"), false);
    assert.equal(canonicalRequestPath("/%252e%252e/privacy"), "/%2e%2e/privacy");
    assert.equal(isReservedLegalGuessPath("/privacy%2Fprivacy"), false);
  });

  it("does not reserve prefixes or blog slugs", () => {
    const deny = [
      "/privacy-extra",
      "/blog/privacy",
      "/privacy-not-a-policy",
      "/protocol",
      "/security",
      "/",
      "/blog",
      "/blog/hello",
    ];
    for (const path of deny) {
      assert.equal(isReservedLegalGuessPath(path), false, path);
    }
  });
});

describe("reserved host miss target", () => {
  it("matches the miss path and its once-decoded form, and is not a published file", () => {
    assert.equal(isReservedHostMissPath(RESERVED_HOST_MISS_DESTINATION), true);
    assert.equal(isReservedHostMissPath(`${RESERVED_HOST_MISS_DESTINATION}?x=1`), true);
    assert.equal(isReservedLegalGuessPath(RESERVED_HOST_MISS_DESTINATION), false);
    for (const dir of ["public", "dist"]) {
      const file = resolve(root, dir, RESERVED_HOST_MISS_DESTINATION.slice(1));
      assert.equal(existsSync(file), false, file);
    }
  });
});

describe("reserved host rules stay aligned with path table", () => {
  const redirects = readFileSync(resolve(root, "public/_redirects"), "utf8");
  const renderYaml = readFileSync(resolve(root, "render.yaml"), "utf8");
  const redirectsLines = redirects.split("\n");
  const spaFallbackIndex = redirectsLines.findIndex((line) => line.startsWith("/*"));

  it("lists every reserved path in public/_redirects before SPA fallback", () => {
    assert.ok(spaFallbackIndex > 0, "expected /* SPA fallback in _redirects");
    const beforeFallback = redirectsLines.slice(0, spaFallbackIndex).join("\n");
    for (const path of RESERVED_LEGAL_GUESS_PATHS) {
      assert.match(beforeFallback, new RegExp(`^${escapeRegExp(path)} /404.html 404$`, "m"), path);
      assert.match(
        beforeFallback,
        new RegExp(`^${escapeRegExp(`${path}/`)} /404.html 404$`, "m"),
        `${path}/`,
      );
    }
  });

  it("lists every reserved path in render.yaml before /* → index.html", () => {
    const catchAllIndex = renderYaml.indexOf("source: /*");
    assert.ok(catchAllIndex > 0);
    const beforeCatchAll = renderYaml.slice(0, catchAllIndex);
    for (const path of RESERVED_LEGAL_GUESS_PATHS) {
      assert.match(beforeCatchAll, new RegExp(`source: ${escapeRegExp(path)}\\s`), path);
      assert.match(beforeCatchAll, new RegExp(`source: ${escapeRegExp(`${path}/`)}\\s`), `${path}/`);
      assert.match(
        beforeCatchAll,
        new RegExp(`destination: ${escapeRegExp(RESERVED_HOST_MISS_DESTINATION)}`),
      );
    }
  });
});

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
