import { mkdtempSync, readFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { SinterServer } from "@sinterdb-internal/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  BACKUP_HELP_TEXT,
  BackupUsageError,
  formatBackupResult,
  isBackupCommandName,
  parseBackupArguments,
  runBackupCommand,
} from "./backup-command.js";
import { HELP_TEXT } from "./cli.js";
import { usePlainOutput } from "./plain-output.js";
import { COLOR_STYLE, PLAIN_STYLE } from "./style.js";

usePlainOutput();

describe("parseBackupArguments", () => {
  it("parses backup", () => {
    expect(
      parseBackupArguments("backup", ["--data-dir", "d", "--to", "b"]),
    ).toMatchObject({ name: "backup", dataDir: "d", to: "b" });
  });

  it("parses restore and verify-backup", () => {
    expect(
      parseBackupArguments("restore", ["--from", "b", "--data-dir", "d"]),
    ).toMatchObject({ name: "restore", from: "b", dataDir: "d" });
    expect(
      parseBackupArguments("verify-backup", ["--from", "b"]),
    ).toMatchObject({ name: "verify-backup", from: "b" });
  });

  it("requires each command's options", () => {
    expect(() => parseBackupArguments("backup", ["--to", "b"])).toThrow(
      BackupUsageError,
    );
    expect(() => parseBackupArguments("restore", ["--from", "b"])).toThrow(
      /--data-dir/,
    );
    expect(() => parseBackupArguments("verify-backup", [])).toThrow(/--from/);
  });

  it("rejects options that belong to another command", () => {
    expect(() =>
      parseBackupArguments("verify-backup", ["--from", "b", "--to", "c"]),
    ).toThrow(/does not accept --to/);
    expect(() =>
      parseBackupArguments("restore", [
        "--from",
        "b",
        "--data-dir",
        "d",
        "--reclaim-lock",
      ]),
    ).toThrow(/--reclaim-lock/);
  });

  it("rejects unknown options and positionals", () => {
    expect(() => parseBackupArguments("backup", ["--nope"])).toThrow(
      BackupUsageError,
    );
    expect(() => parseBackupArguments("backup", ["extra"])).toThrow(
      BackupUsageError,
    );
  });

  it("allows --help without the other options", () => {
    expect(parseBackupArguments("backup", ["--help"]).help).toBe(true);
  });

  it("recognises only the three command names", () => {
    expect(isBackupCommandName("backup")).toBe(true);
    expect(isBackupCommandName("restore")).toBe(true);
    expect(isBackupCommandName("verify-backup")).toBe(true);
    expect(isBackupCommandName("--port")).toBe(false);
    expect(isBackupCommandName(undefined)).toBe(false);
  });

  it("is mentioned in the main help", () => {
    expect(HELP_TEXT).toContain("verify-backup");
  });
});

describe("runBackupCommand", () => {
  let root: string;
  let out: string;
  let err: string;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), "sinterdb-cli-backup-"));
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

  async function populate(): Promise<string> {
    const data = join(root, "data");
    const server = new SinterServer({ dataDirectory: data, port: 0 });

    await server.start();
    await server.stop();

    return data;
  }

  it("backs up, verifies and restores", async () => {
    const data = await populate();
    const backup = join(root, "backup");
    const restored = join(root, "restored");

    runBackupCommand(
      parseBackupArguments("backup", ["--data-dir", data, "--to", backup]),
    );
    expect(out).toContain("Backup written to");
    expect(process.exitCode).toBeUndefined();

    runBackupCommand(parseBackupArguments("verify-backup", ["--from", backup]));
    expect(out).toContain("Backup is intact");

    runBackupCommand(
      parseBackupArguments("restore", [
        "--from",
        backup,
        "--data-dir",
        restored,
      ]),
    );
    expect(out).toContain("Restored to");
    expect(existsSync(join(restored, "manifest.json"))).toBe(true);
    expect(process.exitCode).toBeUndefined();
  });

  it("reports a damaged backup and sets exit code 1", async () => {
    const data = await populate();
    const backup = join(root, "backup");

    runBackupCommand(
      parseBackupArguments("backup", ["--data-dir", data, "--to", backup]),
    );
    out = "";
    runBackupCommand(
      parseBackupArguments("verify-backup", ["--from", join(root, "none")]),
    );

    expect(process.exitCode).toBe(1);
    expect(err).toContain("verify-backup failed");
    expect(out).toBe("");
  });

  it("prints the backup help", () => {
    runBackupCommand(parseBackupArguments("backup", ["--help"]));

    expect(out).toBe(BACKUP_HELP_TEXT);
  });
});

describe("backup output", () => {
  it("shows a headline and aligned details", () => {
    const lines = formatBackupResult(PLAIN_STYLE, "Backup written to b", [
      ["files", "12"],
      ["size", "1.0 KiB (1024 bytes)"],
    ]).split("\n");

    expect(lines).toEqual([
      "+ Backup written to b",
      "  files  12",
      "  size   1.0 KiB (1024 bytes)",
      "",
    ]);
  });

  it("uses a green check and bold headline with colors", () => {
    const text = formatBackupResult(COLOR_STYLE, "Done", [["a", "1"]]);

    expect(text).toContain(COLOR_STYLE.green("✔"));
    expect(text).toContain(COLOR_STYLE.bold("Done"));
  });
});

describe("docs/backup.md", () => {
  const markdown = readFileSync(
    fileURLToPath(new URL("../../../docs/backup.md", import.meta.url)),
    "utf8",
  );

  it("documents exactly the flags the backup help lists", () => {
    const flag = /--[a-z][a-z-]*/g;
    const unique = (m: RegExpMatchArray | null): string[] => [
      ...new Set(m ?? []),
    ];

    expect(unique(markdown.match(flag)).sort()).toEqual(
      unique(BACKUP_HELP_TEXT.match(flag)).sort(),
    );
  });

  it("documents all three commands", () => {
    for (const name of ["backup", "restore", "verify-backup"]) {
      expect(markdown).toContain(`sinterd ${name} `);
    }
  });
});
