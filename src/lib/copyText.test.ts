import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { copyText } from "./copyText.ts";

const originalClipboard = globalThis.navigator?.clipboard;
const originalDocument = globalThis.document;

afterEach(() => {
  if (originalClipboard) {
    Object.defineProperty(globalThis.navigator, "clipboard", {
      configurable: true,
      value: originalClipboard,
    });
  }
  if (originalDocument) {
    Object.defineProperty(globalThis, "document", { configurable: true, value: originalDocument });
  }
});

describe("copyText", () => {
  it("writes the passed constant via the clipboard API", async () => {
    let written = "";
    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: {
        clipboard: {
          writeText: async (value: string) => {
            written = value;
          },
        },
      },
    });
    const result = await copyText("0x8F452a1fdd388A45e1080992eFF051b4dd9048d2");
    assert.deepEqual(result, { ok: true });
    assert.equal(written, "0x8F452a1fdd388A45e1080992eFF051b4dd9048d2");
  });

  it("reports denied when clipboard rejects and fallback is unavailable", async () => {
    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: {
        clipboard: {
          writeText: async () => {
            throw new Error("Permission denied");
          },
        },
      },
    });
    Object.defineProperty(globalThis, "document", { configurable: true, value: undefined });
    const result = await copyText("terra16wtml2q66g82fdkx66tap0qjkahqwp4lwq3ngtygacg5q0kzycgqvhpax3");
    assert.deepEqual(result, { ok: false, reason: "denied" });
  });

  it("falls back to execCommand when the clipboard API is missing", async () => {
    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: {},
    });
    const removed: string[] = [];
    const textarea = {
      value: "",
      style: { position: "", left: "" },
      setAttribute() {},
      select() {},
      setSelectionRange() {},
    };
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: {
        createElement: () => textarea,
        body: {
          appendChild() {},
          removeChild() {
            removed.push("removed");
          },
        },
        execCommand: (command: string) => command === "copy",
      },
    });
    const result = await copyText("0x8F452a1fdd388A45e1080992eFF051b4dd9048d2");
    assert.deepEqual(result, { ok: true });
    assert.equal(textarea.value, "0x8F452a1fdd388A45e1080992eFF051b4dd9048d2");
    assert.deepEqual(removed, ["removed"]);
  });
});
