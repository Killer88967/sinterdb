import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  MAX_INDEXES_PER_COLLECTION,
  MAX_INDEX_NAME_LENGTH,
} from "@sinterdb-internal/storage";
import { MAX_DOCUMENT_DEPTH, MAX_PAYLOAD_SIZE } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { MAX_NAME_BYTES } from "./catalog.js";

// The limits table of docs/configuration.md must match the code.

const markdown = readFileSync(
  fileURLToPath(new URL("../../../docs/configuration.md", import.meta.url)),
  "utf8",
);

function rowContaining(text: string): string {
  const row = markdown.split("\n").find((line) => line.includes(text));

  if (row === undefined) {
    throw new Error(`configuration.md has no row containing ${text}.`);
  }

  return row;
}

describe("docs/configuration.md limits", () => {
  it.each([
    ["Database and collection name length", `${MAX_NAME_BYTES} bytes`],
    [
      "Size of one request or response payload",
      `${MAX_PAYLOAD_SIZE / (1024 * 1024)} MiB`,
    ],
    ["Nesting depth of a document", `${MAX_DOCUMENT_DEPTH} levels`],
    ["Indexes per collection", `${MAX_INDEXES_PER_COLLECTION}, plus`],
    ["Index name length", `${MAX_INDEX_NAME_LENGTH} characters`],
  ])("documents the real limit for: %s", (label, value) => {
    expect(rowContaining(label)).toContain(value);
  });
});
