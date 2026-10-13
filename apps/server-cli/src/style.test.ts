import { describe, expect, it } from "vitest";

import {
  COLOR_STYLE,
  PLAIN_STYLE,
  createStyle,
  formatBytes,
  keyValues,
  padEnd,
  stripAnsi,
  styleHelp,
  table,
  visibleLength,
  wrap,
} from "./style.js";

const terminal = { isTTY: true, columns: 120 };

describe("createStyle", () => {
  it("uses colors on a terminal", () => {
    const style = createStyle(terminal, { TERM: "xterm-256color" });

    expect(style.color).toBe(true);
    expect(style.unicode).toBe(true);
    expect(style.red("x")).toBe("\u001b[31mx\u001b[39m");
    expect(style.bold("x")).toBe("\u001b[1mx\u001b[22m");
  });

  it("stays plain when output is not a terminal", () => {
    const style = createStyle({ isTTY: false }, { TERM: "xterm" });

    expect(style.color).toBe(false);
    expect(style.unicode).toBe(false);
    expect(style.red("x")).toBe("x");
    expect(style.symbols.ok).toBe("+");
  });

  it("stays plain on a dumb terminal", () => {
    expect(createStyle(terminal, { TERM: "dumb" }).color).toBe(false);
    expect(createStyle(terminal, { TERM: "dumb" }).unicode).toBe(false);
  });

  it("honors NO_COLOR but keeps symbols", () => {
    const style = createStyle(terminal, { TERM: "xterm", NO_COLOR: "1" });

    expect(style.color).toBe(false);
    expect(style.unicode).toBe(true);
  });

  it("ignores an empty NO_COLOR", () => {
    expect(createStyle(terminal, { TERM: "xterm", NO_COLOR: "" }).color).toBe(
      true,
    );
  });

  it("lets FORCE_COLOR turn colors on for a pipe", () => {
    const style = createStyle({ isTTY: false }, { FORCE_COLOR: "1" });

    expect(style.color).toBe(true);
    expect(style.unicode).toBe(true);
  });

  it("lets FORCE_COLOR=0 turn colors off", () => {
    expect(
      createStyle(terminal, { TERM: "xterm", FORCE_COLOR: "0" }).color,
    ).toBe(false);
    expect(
      createStyle(terminal, { TERM: "xterm", FORCE_COLOR: "false" }).color,
    ).toBe(false);
  });

  it("prefers NO_COLOR over a terminal but FORCE_COLOR over NO_COLOR", () => {
    expect(
      createStyle(terminal, { TERM: "xterm", NO_COLOR: "1", FORCE_COLOR: "1" })
        .color,
    ).toBe(true);
  });

  it("limits the width", () => {
    expect(createStyle({ isTTY: true, columns: 300 }, {}).width).toBe(100);
    expect(createStyle({ isTTY: true, columns: 60 }, {}).width).toBe(60);
    expect(createStyle({ isTTY: true, columns: 10 }, {}).width).toBe(80);
    expect(createStyle({ isTTY: false }, {}).width).toBe(80);
  });
});

describe("text helpers", () => {
  it("measures text without color codes", () => {
    const text = COLOR_STYLE.red("abc");

    expect(visibleLength(text)).toBe(3);
    expect(stripAnsi(text)).toBe("abc");
    expect(padEnd(text, 5)).toBe(`${text}  `);
  });

  it("formats sizes", () => {
    expect(formatBytes(0)).toBe("0 bytes");
    expect(formatBytes(1023)).toBe("1023 bytes");
    expect(formatBytes(1024)).toBe("1.0 KiB");
    expect(formatBytes(1536)).toBe("1.5 KiB");
    expect(formatBytes(150 * 1024)).toBe("150 KiB");
    expect(formatBytes(5 * 1024 * 1024)).toBe("5.0 MiB");
    expect(formatBytes(3 * 1024 ** 3)).toBe("3.0 GiB");
  });

  it("aligns key-value rows", () => {
    expect(
      keyValues(PLAIN_STYLE, [
        ["a", "1"],
        ["long", "2"],
      ]),
    ).toEqual(["  a     1", "  long  2"]);
  });

  it("aligns tables by what is visible", () => {
    const lines = table(
      COLOR_STYLE,
      [{ header: "NAME" }, { header: "N", align: "right" }, { header: "S" }],
      [
        [COLOR_STYLE.green("alpha"), "7", "ok"],
        ["b", "123", "bad"],
      ],
    );

    expect(lines.map(stripAnsi)).toEqual([
      "  NAME     N  S",
      "  alpha    7  ok",
      "  b      123  bad",
    ]);
  });

  it("wraps words without splitting them", () => {
    const style = { ...PLAIN_STYLE, width: 30 };
    const lines = wrap(
      style,
      "one two three four five six seven eight nine ten eleven twelve",
      4,
    );

    expect(lines.length).toBeGreaterThan(2);

    for (const line of lines) {
      expect(line.startsWith("    ")).toBe(true);
      expect(line.length).toBeLessThanOrEqual(30);
    }

    expect(lines.join(" ").replace(/\s+/g, " ").trim()).toBe(
      "one two three four five six seven eight nine ten eleven twelve",
    );
  });
});

describe("styleHelp", () => {
  const help = `Title

Usage:
  tool [options]

Options:
  --data-dir <path>   Where (default 64 MiB)
  -p, --port <port>   A write-ahead log
  -h, --help          Help

Environment:
  SINTERDB_HOST  Address
`;

  it("returns the text unchanged without colors", () => {
    expect(styleHelp(help, PLAIN_STYLE)).toBe(help);
  });

  it("only adds color codes when colors are on", () => {
    const styled = styleHelp(help, COLOR_STYLE);

    expect(stripAnsi(styled)).toBe(help);
    expect(styled).toContain(COLOR_STYLE.bold("Title"));
    expect(styled).toContain(COLOR_STYLE.bold("Options:"));
    expect(styled).toContain(COLOR_STYLE.cyan("--data-dir"));
    expect(styled).toContain(COLOR_STYLE.cyan("-p"));
    expect(styled).toContain(COLOR_STYLE.cyan("--help"));
    expect(styled).toContain(COLOR_STYLE.cyan("SINTERDB_HOST"));
    expect(styled).toContain(COLOR_STYLE.dim("<path>"));
  });

  it("leaves words that only contain a hyphen alone", () => {
    expect(styleHelp(help, COLOR_STYLE)).toContain("A write-ahead log");
  });
});
