import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { CHECKPOINT_FORMAT_VERSION } from "./engine/checkpoint.js";
import { STORAGE_FORMAT_VERSION } from "./engine/storage-engine.js";
import { WAL_FORMAT_VERSION } from "./wal/format.js";

// docs/compatibility.md lists the format versions the project promises to
// handle. Changing a format version without updating that page (and writing a
// migration note) fails this test.

const markdown = readFileSync(
  fileURLToPath(new URL("../../../docs/compatibility.md", import.meta.url)),
  "utf8",
);

function documentedVersion(constant: string): number {
  const row = new RegExp(`\\|\\s*\`${constant}\`\\s*\\|\\s*(\\d+)\\s*\\|`).exec(
    markdown,
  );
  if (row === null) {
    throw new Error(`compatibility.md has no row for ${constant}.`);
  }
  return Number(row[1]);
}

describe("docs/compatibility.md format versions", () => {
  it.each([
    ["STORAGE_FORMAT_VERSION", STORAGE_FORMAT_VERSION],
    ["CHECKPOINT_FORMAT_VERSION", CHECKPOINT_FORMAT_VERSION],
    ["WAL_FORMAT_VERSION", WAL_FORMAT_VERSION],
  ])("documents the current %s", (constant, actual) => {
    expect(documentedVersion(constant)).toBe(actual);
  });

  it("has a migration note for the current storage format", () => {
    expect(markdown).toMatch(
      new RegExp(
        `Storage format ${STORAGE_FORMAT_VERSION - 1} became ${STORAGE_FORMAT_VERSION}`,
      ),
    );
  });
});
