import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  DEFAULT_CHECKPOINT_THRESHOLD_BYTES,
  DEFAULT_DURABILITY,
  DEFAULT_SERVER_HOST,
  DEFAULT_SERVER_PORT,
  SERVER_ENVIRONMENT_VARIABLES,
} from "@sinterdb-internal/server";
import { describe, expect, it } from "vitest";

import { HELP_TEXT } from "./cli.js";

// docs/configuration.md is the reference for every server setting. These
// tests fail when a flag or environment variable exists in the code but not in
// the document, when the document mentions one that does not exist, or when a
// documented default differs from the real one.

const markdown = readFileSync(
  fileURLToPath(new URL("../../../docs/configuration.md", import.meta.url)),
  "utf8",
);

function unique(matches: RegExpMatchArray | null): string[] {
  return [...new Set(matches ?? [])].sort();
}

function rowContaining(text: string): string {
  const row = markdown.split("\n").find((line) => line.includes(text));

  if (row === undefined) {
    throw new Error(`configuration.md has no row containing ${text}.`);
  }

  return row;
}

describe("docs/configuration.md", () => {
  it("documents exactly the flags that --help lists", () => {
    const flag = /--[a-z][a-z-]*/g;

    expect(unique(markdown.match(flag))).toEqual(unique(HELP_TEXT.match(flag)));
  });

  it("documents exactly the environment variables the server reads", () => {
    const variable = /SINTERDB_[A-Z_]+/g;
    const expected = [...SERVER_ENVIRONMENT_VARIABLES].sort();

    expect(unique(markdown.match(variable))).toEqual(expected);
    expect(unique(HELP_TEXT.match(variable))).toEqual(expected);
  });

  it("documents the real defaults", () => {
    const mebibytes = DEFAULT_CHECKPOINT_THRESHOLD_BYTES / (1024 * 1024);

    expect(rowContaining("`--host <host>`")).toContain(
      `\`${DEFAULT_SERVER_HOST}\``,
    );
    expect(rowContaining("`-p, --port <port>`")).toContain(
      `\`${DEFAULT_SERVER_PORT}\``,
    );
    expect(rowContaining("`--durability <mode>`")).toContain(
      `\`${DEFAULT_DURABILITY}\``,
    );
    expect(rowContaining("`--checkpoint-bytes <n>`")).toContain(
      `${mebibytes} MiB`,
    );
    expect(HELP_TEXT).toContain(`default ${mebibytes} MiB`);
  });
});
