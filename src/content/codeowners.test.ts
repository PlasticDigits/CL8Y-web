import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../..", import.meta.url)));

const FORGEJO_CODEOWNERS_PATHS = [
  "CODEOWNERS",
  "docs/CODEOWNERS",
  ".gitea/CODEOWNERS",
  ".forgejo/CODEOWNERS",
] as const;

const CATCH_ALL_OWNER = /^\s*\.\*\s+@/;

function listTrackedCodeownersFiles(): string[] {
  const out = execSync("git ls-files ':(glob)**/CODEOWNERS'", {
    cwd: root,
    encoding: "utf8",
  });
  return out
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

describe("CODEOWNERS absence (CO14-1)", () => {
  for (const relativePath of FORGEJO_CODEOWNERS_PATHS) {
    it(`has no file at ${relativePath}`, () => {
      assert.equal(existsSync(resolve(root, relativePath)), false);
    });
  }

  it("tracks no basename CODEOWNERS files", () => {
    assert.deepEqual(listTrackedCodeownersFiles(), []);
  });
});

describe("catch-all owner lines (CO14-2)", () => {
  it("does not ship a catch-all .* owner in any tracked CODEOWNERS", () => {
    for (const relativePath of listTrackedCodeownersFiles()) {
      const body = readFileSync(resolve(root, relativePath), "utf8");
      for (const line of body.split("\n")) {
        if (line.trim().startsWith("#")) continue;
        assert.equal(
          CATCH_ALL_OWNER.test(line),
          false,
          `catch-all owner in ${relativePath}: ${line}`,
        );
      }
    }
  });
});
