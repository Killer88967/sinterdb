import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import {
  DEFAULT_CONNECT_TIMEOUT_MS,
  DEFAULT_REQUEST_TIMEOUT_MS,
  DEFAULT_SOCKET_TIMEOUT_MS,
  SinterClient,
} from "./client.js";

// The driver half of docs/configuration.md. It checks that each documented
// option exists on the client and that the documented default is the real one.

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

describe("docs/configuration.md driver options", () => {
  const client = new SinterClient("sinterdb://localhost");

  it.each([
    ["connectTimeoutMS", DEFAULT_CONNECT_TIMEOUT_MS],
    ["requestTimeoutMS", DEFAULT_REQUEST_TIMEOUT_MS],
    ["socketTimeoutMS", DEFAULT_SOCKET_TIMEOUT_MS],
  ] as const)("documents %s with its real default", (option, expected) => {
    expect(client[option]).toBe(expected);
    expect(rowContaining(`\`${option}\``)).toContain(`\`${expected}\``);
  });
});
