import { describe, expect, it } from "vitest";

import {
  DEFAULT_SINTERDB_PORT,
  parseSinterConnectionString,
} from "./connection-string.js";
import {
  SinterConnectionStringError,
  SinterError,
  SinterErrorCode,
} from "./errors.js";

describe("parseSinterConnectionString", () => {
  it("parses a host using the default port", () => {
    expect(parseSinterConnectionString("sinterdb://localhost")).toEqual({
      host: "localhost",
      port: DEFAULT_SINTERDB_PORT,
    });
  });

  it("parses an explicit port and database", () => {
    expect(
      parseSinterConnectionString(
        "sinterdb://database.example.com:5000/application",
      ),
    ).toEqual({
      host: "database.example.com",
      port: 5000,
      database: "application",
    });
  });

  it("decodes the database name", () => {
    const encodedDatabase = "analytics%20data";
    const result = parseSinterConnectionString(
      `sinterdb://localhost/${encodedDatabase}`,
    );

    expect(result.host).toBe("localhost");
    expect(result.port).toBe(DEFAULT_SINTERDB_PORT);
    expect(result.database).toBe(decodeURIComponent(encodedDatabase));
  });

  it("supports IPv6 hosts", () => {
    expect(
      parseSinterConnectionString("sinterdb://[::1]:5000/application"),
    ).toEqual({
      host: "::1",
      port: 5000,
      database: "application",
    });
  });

  it("treats a root path as no selected database", () => {
    expect(parseSinterConnectionString("sinterdb://localhost/")).toEqual({
      host: "localhost",
      port: DEFAULT_SINTERDB_PORT,
    });
  });

  it.each([
    ["an empty value", ""],
    ["surrounding whitespace", " sinterdb://localhost"],
    ["the wrong scheme", "mongodb://localhost"],
    ["a missing host", "sinterdb:///application"],
    ["port zero", "sinterdb://localhost:0"],
    ["an out-of-range port", "sinterdb://localhost:65536"],
    ["credentials", "sinterdb://admin:secret@localhost"],
    ["query parameters", "sinterdb://localhost?timeout=1000"],
    ["a fragment", "sinterdb://localhost#fragment"],
    ["multiple path segments", "sinterdb://localhost/one/two"],
    ["an encoded path separator", "sinterdb://localhost/one%2Ftwo"],
    ["invalid percent encoding", "sinterdb://localhost/%ZZ"],
  ])("rejects %s", (_description, connectionString) => {
    expect(() => parseSinterConnectionString(connectionString)).toThrow(
      SinterConnectionStringError,
    );
  });

  it("returns errors compatible with the public hierarchy", () => {
    try {
      parseSinterConnectionString("https://localhost");
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(SinterConnectionStringError);
      expect(error).toBeInstanceOf(SinterError);

      if (error instanceof SinterConnectionStringError) {
        expect(error.code).toBe(SinterErrorCode.InvalidConnectionString);
      }

      return;
    }

    throw new Error("Expected connection-string parsing to fail.");
  });

  it("does not expose credentials through its error message", () => {
    const connectionString =
      "sinterdb://administrator:extremely-secret@localhost";

    try {
      parseSinterConnectionString(connectionString);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(SinterConnectionStringError);

      if (error instanceof Error) {
        expect(error.message).not.toContain("administrator");
        expect(error.message).not.toContain("extremely-secret");
      }

      return;
    }

    throw new Error("Expected connection-string parsing to fail.");
  });
});
