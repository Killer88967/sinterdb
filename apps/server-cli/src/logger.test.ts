import { afterEach, describe, expect, it, vi } from "vitest";

import {
  activeLogFormat,
  formatJsonLog,
  formatPrettyLog,
  logError,
  logInfo,
  logWarning,
  type LogEntry,
} from "./logger.js";
import { usePlainOutput } from "./plain-output.js";
import { COLOR_STYLE, PLAIN_STYLE, stripAnsi } from "./style.js";

const entry: LogEntry = {
  timestamp: "2026-10-12T21:47:03.000Z",
  level: "info",
  event: "server.started",
  message: "SinterDB server is listening.",
  details: {
    host: "127.0.0.1",
    port: 4721,
    storage: "disk",
    skippedCheckpoints: [{ file: "a.snap", reason: "bad" }],
    unset: undefined,
  },
};

usePlainOutput();

function setTerminal(stream: NodeJS.WriteStream, value: boolean): void {
  Object.defineProperty(stream, "isTTY", { value, configurable: true });
}

afterEach(() => {
  Reflect.deleteProperty(process.stdout, "isTTY");
  Reflect.deleteProperty(process.stderr, "isTTY");
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("formatJsonLog", () => {
  it("keeps the documented fields", () => {
    expect(JSON.parse(formatJsonLog(entry))).toEqual({
      timestamp: "2026-10-12T21:47:03.000Z",
      level: "info",
      event: "server.started",
      message: "SinterDB server is listening.",
      details: {
        host: "127.0.0.1",
        port: 4721,
        storage: "disk",
        skippedCheckpoints: [{ file: "a.snap", reason: "bad" }],
      },
    });
  });

  it("omits details when there are none", () => {
    const { details: _details, ...bare } = entry;

    expect(Object.keys(JSON.parse(formatJsonLog(bare)))).toEqual([
      "timestamp",
      "level",
      "event",
      "message",
    ]);
  });
});

describe("formatPrettyLog", () => {
  it("puts the details under the first line, aligned", () => {
    const lines = formatPrettyLog(entry, PLAIN_STYLE).split("\n");

    expect(lines[0]).toMatch(
      /^\d\d:\d\d:\d\d {2}INFO {3}server\.started {2}SinterDB server is listening\.$/,
    );
    expect(lines.slice(1)).toEqual([
      `${" ".repeat(17)}host                127.0.0.1`,
      `${" ".repeat(17)}port                4721`,
      `${" ".repeat(17)}storage             disk`,
      `${" ".repeat(17)}skippedCheckpoints  [{"file":"a.snap","reason":"bad"}]`,
    ]);
  });

  it("leaves out empty lists", () => {
    const text = formatPrettyLog(
      { ...entry, details: { port: 1, skippedCheckpoints: [] } },
      PLAIN_STYLE,
    );

    expect(text).toContain("port");
    expect(text).not.toContain("skippedCheckpoints");
  });

  it("is one line without details", () => {
    const { details: _details, ...bare } = entry;

    expect(formatPrettyLog(bare, PLAIN_STYLE)).not.toContain("\n");
  });

  it("shows an error and its stack frames", () => {
    const text = formatPrettyLog(
      {
        timestamp: entry.timestamp,
        level: "error",
        event: "server.runtime_error",
        message: "It broke.",
        details: {
          error: {
            name: "RangeError",
            message: "too big",
            stack:
              "RangeError: too big\n    at one (a.js:1:1)\n    at two (b.js:2:2)",
          },
        },
      },
      PLAIN_STYLE,
    );

    expect(text).toContain("ERROR");
    expect(text).toContain("RangeError: too big");
    expect(text).toContain("at one (a.js:1:1)");
    expect(text).toContain("at two (b.js:2:2)");
    expect(text.split("\n")).toHaveLength(4);
  });

  it("colors by level and still reads the same without colors", () => {
    const warn: LogEntry = { ...entry, level: "warn" };
    const colored = formatPrettyLog(warn, COLOR_STYLE);

    expect(colored).toContain(COLOR_STYLE.bold(COLOR_STYLE.yellow("WARN ")));
    expect(
      formatPrettyLog({ ...entry, level: "error" }, COLOR_STYLE),
    ).toContain(COLOR_STYLE.bold(COLOR_STYLE.red("ERROR")));
    expect(formatPrettyLog(entry, COLOR_STYLE)).toContain(
      COLOR_STYLE.cyan("INFO "),
    );
    expect(stripAnsi(colored)).toBe(formatPrettyLog(warn, PLAIN_STYLE));
  });
});

describe("log output", () => {
  function capture(): { out: () => string; err: () => string } {
    let out = "";
    let err = "";

    vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      out += String(chunk);
      return true;
    });
    vi.spyOn(process.stderr, "write").mockImplementation((chunk) => {
      err += String(chunk);
      return true;
    });

    return { out: () => out, err: () => err };
  }

  it("writes JSON when output is not a terminal", () => {
    const written = capture();

    expect(activeLogFormat()).toBe("json");
    logInfo("a.b", "hello", { x: 1 });

    expect(JSON.parse(written.out())).toMatchObject({
      level: "info",
      event: "a.b",
      details: { x: 1 },
    });
  });

  it("writes the readable form on a terminal", () => {
    const written = capture();

    setTerminal(process.stdout, true);
    setTerminal(process.stderr, true);
    vi.stubEnv("NO_COLOR", "1");
    logInfo("a.b", "hello", { x: 1 });
    logWarning("w.x", "careful", new Error("odd"));
    logError("e.y", "bad", "plain text");

    expect(written.out()).toContain("INFO   a.b  hello");
    expect(written.out()).toContain("x  1");
    expect(written.err()).toContain("WARN   w.x  careful");
    expect(written.err()).toContain("Error: odd");
    expect(written.err()).toContain("UnknownError: plain text");
    expect(written.err()).not.toContain("{");
  });

  it("chooses the readable form when both streams are terminals", () => {
    setTerminal(process.stdout, true);
    setTerminal(process.stderr, true);

    expect(activeLogFormat()).toBe("pretty");
  });

  it("stays JSON when only one stream is a terminal", () => {
    setTerminal(process.stdout, true);
    setTerminal(process.stderr, false);

    expect(activeLogFormat()).toBe("json");
  });
});
