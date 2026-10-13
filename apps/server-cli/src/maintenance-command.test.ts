import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { SinterServer } from "@sinterdb-internal/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HELP_TEXT } from "./cli.js";
import { usePlainOutput } from "./plain-output.js";
import { stripAnsi } from "./style.js";
import {
  MAINTENANCE_HELP_TEXT,
  MaintenanceUsageError,
  isMaintenanceCommandName,
  parseMaintenanceArguments,
  runMaintenanceCommand,
} from "./maintenance-command.js";

usePlainOutput();

let root: string;
let data: string;
let out: string;
let err: string;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "sinterd-maintenance-"));
  data = join(root, "data");
  out = "";
  err = "";
  process.exitCode = undefined;
  vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
    out += String(chunk);
    return true;
  });
  vi.spyOn(process.stderr, "write").mockImplementation((chunk) => {
    err += String(chunk);
    return true;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  process.exitCode = undefined;
  rmSync(root, { recursive: true, force: true });
});

async function populate(): Promise<void> {
  const server = new SinterServer({
    port: 0,
    dataDirectory: data,
    checkpointThresholdBytes: 1,
  });

  await server.start();
  await server.stop();
}

describe("parseMaintenanceArguments", () => {
  it("parses inspect and repair", () => {
    expect(
      parseMaintenanceArguments("inspect", ["--data-dir", "d", "--json"]),
    ).toMatchObject({ name: "inspect", dataDir: "d", json: true });
    expect(
      parseMaintenanceArguments("repair", [
        "--data-dir",
        "d",
        "--apply",
        "--rebuild-manifest",
        "--clear-lock",
        "--allow-data-loss",
      ]),
    ).toMatchObject({
      name: "repair",
      apply: true,
      rebuildManifest: true,
      clearLock: true,
      allowDataLoss: true,
    });
  });

  it("recognizes the command names", () => {
    expect(isMaintenanceCommandName("inspect")).toBe(true);
    expect(isMaintenanceCommandName("repair")).toBe(true);
    expect(isMaintenanceCommandName("backup")).toBe(false);
  });

  it("requires --data-dir", () => {
    expect(() => parseMaintenanceArguments("inspect", [])).toThrow(
      /requires --data-dir/,
    );
    expect(() => parseMaintenanceArguments("repair", ["--apply"])).toThrow(
      MaintenanceUsageError,
    );
  });

  it("keeps repair options away from inspect", () => {
    for (const option of [
      "--apply",
      "--rebuild-manifest",
      "--clear-lock",
      "--allow-data-loss",
    ]) {
      expect(() =>
        parseMaintenanceArguments("inspect", ["--data-dir", "d", option]),
      ).toThrow(new RegExp(`does not accept ${option}`));
    }
  });

  it("rejects unknown options and positionals", () => {
    expect(() => parseMaintenanceArguments("inspect", ["--nope"])).toThrow(
      MaintenanceUsageError,
    );
    expect(() =>
      parseMaintenanceArguments("inspect", ["--data-dir", "d", "extra"]),
    ).toThrow(MaintenanceUsageError);
  });

  it("allows --help without other options", () => {
    expect(parseMaintenanceArguments("repair", ["-h"]).help).toBe(true);
  });
});

describe("runMaintenanceCommand", () => {
  it("prints the help", () => {
    runMaintenanceCommand(parseMaintenanceArguments("inspect", ["--help"]));

    expect(out).toBe(MAINTENANCE_HELP_TEXT);
  });

  it("inspects a healthy directory", async () => {
    await populate();

    runMaintenanceCommand(
      parseMaintenanceArguments("inspect", ["--data-dir", data]),
    );

    expect(out).toContain("The server can open this directory");
    expect(out).toContain("manifest  ok");
    expect(process.exitCode).toBeUndefined();
  });

  it("prints a JSON report with sequence numbers as strings", async () => {
    await populate();

    runMaintenanceCommand(
      parseMaintenanceArguments("inspect", ["--data-dir", data, "--json"]),
    );

    const report = JSON.parse(out) as {
      recovery: { recoverable: boolean; baseLsn: string };
    };

    expect(report.recovery.recoverable).toBe(true);
    expect(typeof report.recovery.baseLsn).toBe("string");
  });

  it("exits 1 for a directory the server cannot open", async () => {
    await populate();
    writeFileSync(join(data, "manifest.json"), "{broken");

    runMaintenanceCommand(
      parseMaintenanceArguments("inspect", ["--data-dir", data]),
    );

    expect(out).toContain("CANNOT open");
    expect(out).toContain("unreadable");
    expect(process.exitCode).toBe(1);
  });

  it("reports a directory that does not exist", () => {
    runMaintenanceCommand(
      parseMaintenanceArguments("inspect", ["--data-dir", join(root, "no")]),
    );

    expect(err).toContain("inspect failed");
    expect(process.exitCode).toBe(1);
  });

  it("shows a repair plan, then carries it out", async () => {
    await populate();
    writeFileSync(join(data, "manifest.json"), "{broken");

    runMaintenanceCommand(
      parseMaintenanceArguments("repair", [
        "--data-dir",
        data,
        "--rebuild-manifest",
      ]),
    );

    expect(out).toContain("Steps it would take");
    expect(out).toContain("Nothing was changed");
    expect(readFileSync(join(data, "manifest.json"), "utf8")).toBe("{broken");
    expect(process.exitCode).toBe(1);

    out = "";
    process.exitCode = undefined;

    runMaintenanceCommand(
      parseMaintenanceArguments("repair", [
        "--data-dir",
        data,
        "--apply",
        "--rebuild-manifest",
      ]),
    );

    expect(out).toContain("Steps\n");
    expect(out).toContain("moved to");
    expect(out).toContain("The server can now open this directory.");
    expect(process.exitCode).toBeUndefined();
    expect(existsSync(join(data, "quarantine"))).toBe(true);
  });

  it("exits 1 when a step needs a flag that was not given", async () => {
    await populate();
    writeFileSync(join(data, "manifest.json"), "{broken");

    runMaintenanceCommand(
      parseMaintenanceArguments("repair", ["--data-dir", data, "--apply"]),
    );

    expect(out).toContain("skipped");
    expect(out).toContain("needs --rebuild-manifest");
    expect(out).toContain("still cannot open");
    expect(process.exitCode).toBe(1);
  });

  it("says when there is nothing to repair", async () => {
    await populate();

    runMaintenanceCommand(
      parseMaintenanceArguments("repair", ["--data-dir", data]),
    );

    expect(out).toContain("Nothing to repair");
    expect(process.exitCode).toBeUndefined();
  });
});

describe("colors", () => {
  const escape = String.fromCharCode(27);

  afterEach(() => {
    delete process.env["FORCE_COLOR"];
    delete process.env["NO_COLOR"];
  });

  it("colors the report when asked and not otherwise", async () => {
    await populate();
    process.env["FORCE_COLOR"] = "1";

    runMaintenanceCommand(
      parseMaintenanceArguments("inspect", ["--data-dir", data]),
    );

    expect(out).toContain(`${escape}[`);
    expect(out).toContain("✔");

    out = "";
    delete process.env["FORCE_COLOR"];

    runMaintenanceCommand(
      parseMaintenanceArguments("inspect", ["--data-dir", data]),
    );

    expect(out).not.toContain(escape);
    expect(out).not.toContain("✔");
  });

  it("keeps the words the same with and without colors", async () => {
    await populate();
    writeFileSync(join(data, "manifest.json"), "{broken");

    const run = (): string => {
      out = "";
      process.exitCode = undefined;
      runMaintenanceCommand(
        parseMaintenanceArguments("repair", ["--data-dir", data]),
      );

      return out;
    };
    const plain = run();

    process.env["FORCE_COLOR"] = "1";

    const colored = run();

    const symbols: Record<string, string> = {
      "✔": "+",
      "✖": "x",
      "▲": "!",
      "•": "-",
      "·": "-",
      "─": "-",
    };
    const unstyled = stripAnsi(colored).replace(
      /[✔✖▲•·─]/g,
      (symbol) => symbols[symbol] as string,
    );

    expect(colored).toContain(escape);
    expect(unstyled).toBe(plain);
  });

  it("colors the help text", () => {
    process.env["FORCE_COLOR"] = "1";
    runMaintenanceCommand(parseMaintenanceArguments("inspect", ["--help"]));

    expect(out).toContain(`${escape}[36m--apply${escape}[39m`);
  });
});

describe("sinterd help", () => {
  it("mentions the commands", () => {
    expect(HELP_TEXT).toContain("sinterd inspect | repair");
  });
});

describe("docs/repair.md", () => {
  const markdown = readFileSync(
    fileURLToPath(new URL("../../../docs/repair.md", import.meta.url)),
    "utf8",
  );

  it("documents exactly the flags the help lists", () => {
    const flag = /--[a-z][a-z-]*/g;
    const unique = (m: RegExpMatchArray | null): string[] => [
      ...new Set(m ?? []),
    ];

    expect(unique(markdown.match(flag)).sort()).toEqual(
      unique(MAINTENANCE_HELP_TEXT.match(flag)).sort(),
    );
  });

  it("documents both commands", () => {
    expect(markdown).toContain("sinterd inspect ");
    expect(markdown).toContain("sinterd repair ");
  });
});
