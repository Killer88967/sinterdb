import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { parseSinterConnectionString } from "./connection-string.js";
import { SinterConnectionStringError, SinterErrorCode } from "./errors.js";

// docs/connection-strings.md is the specification of the connection-string
// format for the whole 0.x line. This test runs every example in its tables,
// so the document and the parser cannot drift apart.

const documentPath = fileURLToPath(
  new URL("../../../docs/connection-strings.md", import.meta.url),
);
const markdown = readFileSync(documentPath, "utf8");

function tableRows(heading: string): string[][] {
  const start = markdown.indexOf(`## ${heading}`);
  if (start === -1) {
    throw new Error(`Missing section "${heading}" in connection-strings.md.`);
  }
  const rest = markdown.slice(start + 1);
  const next = rest.indexOf("\n## ");
  const section = next === -1 ? rest : rest.slice(0, next);

  return section
    .split("\n")
    .filter((line) => line.startsWith("|"))
    .map((line) =>
      line
        .slice(1, line.lastIndexOf("|"))
        .split("|")
        .map((cell) => cell.trim()),
    )
    .filter((cells) => !cells.every((cell) => /^-+$/.test(cell)))
    .slice(1); // header row
}

function code(cell: string): string {
  const match = /^`(.*)`$/.exec(cell);
  if (match === null) {
    throw new Error(`Expected a code span, found: ${cell}`);
  }
  return match[1] as string;
}

const accepted = tableRows("Accepted examples");
const rejected = tableRows("Rejected examples");

describe("connection-string contract (docs/connection-strings.md)", () => {
  it("documents a meaningful number of examples", () => {
    expect(accepted.length).toBeGreaterThanOrEqual(10);
    expect(rejected.length).toBeGreaterThanOrEqual(20);
  });

  it.each(accepted)("accepts %s", (uri, host, port, database) => {
    const parsed = parseSinterConnectionString(code(uri as string));

    expect(parsed.host).toBe(code(host as string));
    expect(parsed.port).toBe(Number(port));
    if (database === "none") {
      expect(parsed.database).toBeUndefined();
    } else {
      expect(parsed.database).toBe(code(database as string));
    }
  });

  it.each(rejected)("rejects %s", (uri) => {
    const text = code(uri as string);

    expect(() => parseSinterConnectionString(text)).toThrow(
      SinterConnectionStringError,
    );

    try {
      parseSinterConnectionString(text);
    } catch (error) {
      expect((error as SinterConnectionStringError).code).toBe(
        SinterErrorCode.InvalidConnectionString,
      );
    }
  });

  it("never echoes credentials in an error message", () => {
    for (const text of [
      "sinterdb://admin:hunter2@localhost",
      "sinterdb://admin:hunter2@localhost/app?x=1",
    ]) {
      try {
        parseSinterConnectionString(text);
        expect.unreachable();
      } catch (error) {
        expect((error as Error).message).not.toContain("hunter2");
        expect((error as Error).message).not.toContain("admin");
      }
    }
  });
});
