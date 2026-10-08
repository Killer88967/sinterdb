import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import * as driver from "./index.js";
import { SinterError, SinterErrorCode } from "./errors.js";

// The driver README lists every error code with the class that carries it.
// This fails when a code is added, renamed or removed without the table.

const readme = readFileSync(
  fileURLToPath(new URL("../README.md", import.meta.url)),
  "utf8",
);

const rows = [...readme.matchAll(/^\| `([A-Z_]+)`\s+\| `(\w+)`\s+\|/gm)].map(
  (match) => ({ code: match[1] as string, className: match[2] as string }),
);

describe("driver README error table", () => {
  it("lists every error code exactly once", () => {
    expect(rows.map((row) => row.code).sort()).toEqual(
      Object.values(SinterErrorCode).sort(),
    );
  });

  it("names a public class for each row", () => {
    for (const { className } of rows) {
      const exported = (driver as Record<string, unknown>)[className];

      expect(typeof exported, className).toBe("function");
      expect(exported as object).toHaveProperty("prototype");
      expect((exported as { prototype: unknown }).prototype).toBeInstanceOf(
        SinterError,
      );
    }
  });

  it("names the class that really carries the code", () => {
    for (const { code, className } of rows) {
      const Class = (driver as Record<string, unknown>)[className] as new (
        ...arguments_: string[]
      ) => SinterError;

      // SinterClientStateError is the one class that carries two codes, so its
      // constructor takes the code first.
      const error =
        className === "SinterClientStateError"
          ? new Class(code, "message")
          : new Class("message");

      expect(error.code, className).toBe(code);
    }
  });
});
