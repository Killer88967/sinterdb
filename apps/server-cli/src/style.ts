// Terminal styling. Colors come from picocolors and are only used when the
// output is a terminal that can show them, so redirected output, CI logs and
// files stay plain text.

import { createColors } from "picocolors";

const ESC = String.fromCharCode(27);
const ANSI = new RegExp(`${ESC}\\[[0-9;]*m`, "g");

export interface Symbols {
  readonly ok: string;
  readonly fail: string;
  readonly warn: string;
  readonly bullet: string;
  readonly rule: string;
  readonly dot: string;
}

export interface Style {
  /** True when text is wrapped in color codes. */
  readonly color: boolean;
  /** True when non-ASCII symbols may be printed. */
  readonly unicode: boolean;
  /** The width to wrap long lines at. */
  readonly width: number;
  readonly symbols: Symbols;
  bold(text: string): string;
  dim(text: string): string;
  red(text: string): string;
  green(text: string): string;
  yellow(text: string): string;
  cyan(text: string): string;
}

export interface StyleStream {
  readonly isTTY?: boolean;
  readonly columns?: number;
}

type Environment = Readonly<Record<string, string | undefined>>;

const UNICODE_SYMBOLS: Symbols = {
  ok: "✔",
  fail: "✖",
  warn: "▲",
  bullet: "•",
  rule: "─",
  dot: "·",
};

const ASCII_SYMBOLS: Symbols = {
  ok: "+",
  fail: "x",
  warn: "!",
  bullet: "-",
  rule: "-",
  dot: "-",
};

const DEFAULT_WIDTH = 80;
const MAX_WIDTH = 100;

/**
 * Chooses styling for one output stream. `NO_COLOR` turns colors off and
 * `FORCE_COLOR` turns them on (`0` or `false` also turn them off), as most
 * command-line tools do. Otherwise colors are used when the stream is a
 * terminal and `TERM` is not `dumb`.
 */
export function createStyle(
  stream: StyleStream,
  env: Environment = process.env,
): Style {
  const forced = env["FORCE_COLOR"];
  const forcedOff = forced === "0" || forced === "false";
  const forcedOn = forced !== undefined && forced !== "" && !forcedOff;
  const terminal = stream.isTTY === true && env["TERM"] !== "dumb";
  const noColor = env["NO_COLOR"] !== undefined && env["NO_COLOR"] !== "";
  const color = forcedOff ? false : forcedOn ? true : !noColor && terminal;
  const unicode = terminal || forcedOn;
  const columns = stream.columns;
  const width =
    typeof columns === "number" && columns >= 40
      ? Math.min(columns, MAX_WIDTH)
      : DEFAULT_WIDTH;

  return buildStyle(color, unicode, width);
}

/** Text with no colors and only ASCII symbols. Used when output is piped. */
export const PLAIN_STYLE: Style = buildStyle(false, false, DEFAULT_WIDTH);

/** Colors and symbols always on. Meant for tests. */
export const COLOR_STYLE: Style = buildStyle(true, true, DEFAULT_WIDTH);

function buildStyle(color: boolean, unicode: boolean, width: number): Style {
  const colors = createColors(color);

  return {
    color,
    unicode,
    width,
    symbols: unicode ? UNICODE_SYMBOLS : ASCII_SYMBOLS,
    bold: colors.bold,
    dim: colors.dim,
    red: colors.red,
    green: colors.green,
    yellow: colors.yellow,
    cyan: colors.cyan,
  };
}

/** The length of text as it appears on screen, ignoring color codes. */
export function visibleLength(text: string): number {
  return text.replace(ANSI, "").length;
}

export function stripAnsi(text: string): string {
  return text.replace(ANSI, "");
}

export function padEnd(text: string, width: number): string {
  return text + " ".repeat(Math.max(0, width - visibleLength(text)));
}

export function padStart(text: string, width: number): string {
  return " ".repeat(Math.max(0, width - visibleLength(text))) + text;
}

const UNITS = ["bytes", "KiB", "MiB", "GiB", "TiB"] as const;

/** `1536` becomes `1.5 KiB`. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} bytes`;
  }

  let value = bytes;
  let unit = 0;

  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }

  return `${value >= 100 ? value.toFixed(0) : value.toFixed(1)} ${UNITS[unit]}`;
}

/** A section heading with a rule under it. */
export function title(style: Style, text: string): string {
  return `${style.bold(text)}\n${style.dim(style.symbols.rule.repeat(Math.min(visibleLength(text), style.width)))}`;
}

/** Aligned `name  value` lines. */
export function keyValues(
  style: Style,
  rows: readonly (readonly [string, string])[],
  indent = 2,
): string[] {
  const width = Math.max(0, ...rows.map(([key]) => key.length));

  return rows.map(
    ([key, value]) =>
      `${" ".repeat(indent)}${style.dim(padEnd(key, width))}  ${value}`,
  );
}

export type Align = "left" | "right";

export interface Column {
  readonly header: string;
  readonly align?: Align;
}

/** A table with a dim header row. Cells may contain color codes. */
export function table(
  style: Style,
  columns: readonly Column[],
  rows: readonly (readonly string[])[],
  indent = 2,
): string[] {
  const widths = columns.map((column, index) =>
    Math.max(
      column.header.length,
      ...rows.map((row) => visibleLength(row[index] ?? "")),
    ),
  );
  const line = (cells: readonly string[], header: boolean): string => {
    const text = columns
      .map((column, index) => {
        const cell = cells[index] ?? "";
        const shown = header ? style.dim(cell) : cell;
        const isLast = index === columns.length - 1;

        if (column.align === "right") {
          return padStart(shown, widths[index] as number);
        }

        return isLast ? shown : padEnd(shown, widths[index] as number);
      })
      .join("  ");

    return `${" ".repeat(indent)}${text}`;
  };

  return [
    line(
      columns.map((column) => column.header),
      true,
    ),
    ...rows.map((row) => line(row, false)),
  ];
}

/** Breaks text into lines of at most `style.width`, indenting each. */
export function wrap(style: Style, text: string, indent: number): string[] {
  const room = Math.max(20, style.width - indent);
  const lines: string[] = [];
  let current = "";

  for (const word of text.split(/\s+/).filter((item) => item !== "")) {
    if (current !== "" && current.length + 1 + word.length > room) {
      lines.push(current);
      current = word;
    } else {
      current = current === "" ? word : `${current} ${word}`;
    }
  }

  if (current !== "") {
    lines.push(current);
  }

  return lines.map((line) => `${" ".repeat(indent)}${line}`);
}

const FLAG = /(?<=^|[\s,[|])(--[a-z][a-z-]*|-[a-z])(?=[\s,\]|]|$)/g;
const ENVIRONMENT_VARIABLE = /\bSINTERDB_[A-Z_]+\b/g;
const PLACEHOLDER = /<[a-z][a-z-]*>/g;
const HEADING = /^[A-Z][^\n]*:$/;

/**
 * Adds color to a plain help text: headings in bold, options and environment
 * variables in cyan and placeholders such as `<path>` dimmed. The text is
 * unchanged when colors are off.
 */
export function styleHelp(text: string, style: Style): string {
  if (!style.color) {
    return text;
  }

  return text
    .split("\n")
    .map((line, index) => {
      if (index === 0 && line !== "") {
        return style.bold(line);
      }

      if (HEADING.test(line)) {
        return style.bold(line);
      }

      return line
        .replace(FLAG, (match) => style.cyan(match))
        .replace(ENVIRONMENT_VARIABLE, (match) => style.cyan(match))
        .replace(PLACEHOLDER, (match) => style.dim(match));
    })
    .join("\n");
}
