import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { PROTOCOL_VERSION } from "./constants.js";

// See packages/storage/src/compatibility-doc.test.ts. The protocol version is
// checked here because the storage package does not depend on the protocol.

const markdown = readFileSync(
  fileURLToPath(new URL("../../../docs/compatibility.md", import.meta.url)),
  "utf8",
);

describe("docs/compatibility.md protocol version", () => {
  it("documents the current PROTOCOL_VERSION", () => {
    const row = /\|\s*`PROTOCOL_VERSION`\s*\|\s*(\d+)\s*\|/.exec(markdown);

    expect(row).not.toBeNull();
    expect(Number(row?.[1])).toBe(PROTOCOL_VERSION);
  });
});
