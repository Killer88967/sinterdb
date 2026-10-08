import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  MAX_INDEXES_PER_COLLECTION,
  MAX_INDEX_NAME_LENGTH,
} from "@sinterdb-internal/storage";
import { MAX_PAYLOAD_SIZE } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { MAX_NAME_BYTES } from "./catalog.js";
import {
  DEFAULT_CURSOR_BATCH_SIZE,
  DEFAULT_CURSOR_IDLE_TIMEOUT_MS,
} from "./cursor-manager.js";
import { DEFAULT_STOP_TIMEOUT_MS } from "./server.js";

// The "Hard limits" table in docs/limitations.md must match the constants the
// server enforces. How the driver behaves at these limits is checked in
// packages/driver/src/limitations-doc.test.ts.

const markdown = readFileSync(
  fileURLToPath(new URL("../../../docs/limitations.md", import.meta.url)),
  "utf8",
);

function rowFor(label: string): string {
  const row = markdown.split("\n").find((line) => line.includes(`| ${label}`));

  if (row === undefined) {
    throw new Error(
      `limitations.md has no table row starting with "${label}".`,
    );
  }

  return row;
}

describe("docs/limitations.md hard limits", () => {
  it.each([
    ["Database and collection name", `${MAX_NAME_BYTES} bytes`],
    ["One request or response", `${MAX_PAYLOAD_SIZE / (1024 * 1024)} MiB`],
    ["Indexes per collection", `${MAX_INDEXES_PER_COLLECTION}, not counting`],
    ["Index name", `${MAX_INDEX_NAME_LENGTH} characters`],
    ["`batchSize` of a query", `(the default is ${DEFAULT_CURSOR_BATCH_SIZE})`],
    [
      "Idle time before a cursor expires",
      `${DEFAULT_CURSOR_IDLE_TIMEOUT_MS / 60_000} minutes`,
    ],
    [
      "Time to close connections on stop",
      `${DEFAULT_STOP_TIMEOUT_MS / 1000} seconds`,
    ],
  ])("states the %s", (label, expected) => {
    expect(rowFor(label)).toContain(expected);
  });

  it("states the batchSize range the server accepts", () => {
    expect(rowFor("`batchSize` of a query")).toContain("1 to 10,000");
  });
});
