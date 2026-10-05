import { describe, expect, it } from "vitest";

import { CliUsageError, parseCliArguments, HELP_TEXT } from "./cli.js";

describe("parseCliArguments", () => {
  it("starts with environment-backed defaults", () => {
    expect(parseCliArguments([])).toEqual({
      kind: "start",
    });
  });

  it("parses host and port options", () => {
    expect(parseCliArguments(["--host", "0.0.0.0", "--port", "5000"])).toEqual({
      kind: "start",
      host: "0.0.0.0",
      port: "5000",
    });
  });

  it("parses the short port option", () => {
    expect(parseCliArguments(["-p", "6000"])).toEqual({
      kind: "start",
      port: "6000",
    });
  });

  it("parses the help option", () => {
    expect(parseCliArguments(["--help"])).toEqual({
      kind: "help",
    });
  });

  it("parses the version option", () => {
    expect(parseCliArguments(["-v"])).toEqual({
      kind: "version",
    });
  });

  it("rejects unknown options", () => {
    expect(() => parseCliArguments(["--destroy-everything"])).toThrow(
      CliUsageError,
    );
  });

  it("rejects positional arguments", () => {
    expect(() => parseCliArguments(["unexpected"])).toThrow(CliUsageError);
  });

  it("rejects help and version together", () => {
    expect(() => parseCliArguments(["--help", "--version"])).toThrow(
      CliUsageError,
    );
  });

  it("parses the data directory and durability options", () => {
    expect(
      parseCliArguments([
        "--data-dir",
        "/var/lib/sinterdb",
        "--durability",
        "buffered",
      ]),
    ).toEqual({
      kind: "start",
      dataDir: "/var/lib/sinterdb",
      durability: "buffered",
    });
  });

  it("parses the data directory on its own", () => {
    expect(parseCliArguments(["--data-dir", "./data"])).toEqual({
      kind: "start",
      dataDir: "./data",
    });
  });

  it("rejects storage options without values", () => {
    expect(() => parseCliArguments(["--data-dir"])).toThrow(CliUsageError);
    expect(() => parseCliArguments(["--durability"])).toThrow(CliUsageError);
  });

  it("documents every option and environment variable", () => {
    for (const text of [
      "--host",
      "-p, --port",
      "--data-dir",
      "--durability",
      "SINTERDB_DATA_DIR",
      "SINTERDB_DURABILITY",
      "fsync",
      "buffered",
    ]) {
      expect(HELP_TEXT).toContain(text);
    }
  });
});
