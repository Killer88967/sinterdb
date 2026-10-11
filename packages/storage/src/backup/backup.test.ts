import { createHash } from "node:crypto";
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  truncateSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { StorageEngine } from "../engine/storage-engine.js";
import { StorageError, StorageErrorCode } from "../errors.js";

import {
  BACKUP_FORMAT_VERSION,
  BACKUP_MANIFEST_FILE,
  createBackup,
  restoreBackup,
  verifyBackup,
} from "./index.js";

let root: string;
let source: string;
let backup: string;
let target: string;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "sinterdb-backup-"));
  source = join(root, "source");
  backup = join(root, "backup");
  target = join(root, "target");
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

function populate(count = 20): void {
  const engine = StorageEngine.open({ directory: source });
  const things = engine.openCollection("app", "things");

  for (let n = 0; n < count; n += 1) {
    things.insertOne({ n });
  }

  engine.checkpoint();
  things.insertOne({ n: count });
  engine.close();
}

function documentCount(directory: string): number {
  const engine = StorageEngine.open({
    directory,
    checkpointOnClose: false,
  });

  try {
    return engine.getCollection("app", "things")?.documentCount ?? 0;
  } finally {
    engine.close();
  }
}

function leftovers(): string[] {
  return readdirSync(root).filter(
    (name) => name.endsWith(".partial") || name.endsWith(".restoring"),
  );
}

function codeOf(action: () => unknown): string | undefined {
  try {
    action();
  } catch (error: unknown) {
    return error instanceof StorageError ? error.code : "other";
  }

  return undefined;
}

function firstFile(directory: string, extension: string): string {
  const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory()
        ? walk(join(dir, entry.name))
        : [join(dir, entry.name)],
    );
  const found = walk(directory).find((file) => file.endsWith(extension));

  if (found === undefined) {
    throw new Error(`no ${extension} file in ${directory}`);
  }

  return found;
}

describe("createBackup", () => {
  it("copies a data directory and describes it in a manifest", () => {
    populate();

    const result = createBackup({
      dataDirectory: source,
      backupDirectory: backup,
    });

    expect(result.files).toBeGreaterThan(1);
    expect(result.bytes).toBeGreaterThan(0);
    expect(existsSync(join(backup, BACKUP_MANIFEST_FILE))).toBe(true);
    expect(existsSync(join(backup, "manifest.json"))).toBe(true);
    expect(existsSync(join(backup, "LOCK"))).toBe(false);
    expect(leftovers()).toEqual([]);

    const manifest = JSON.parse(
      readFileSync(join(backup, BACKUP_MANIFEST_FILE), "utf8"),
    ) as { formatVersion: number; files: { path: string }[] };

    expect(manifest.formatVersion).toBe(BACKUP_FORMAT_VERSION);
    expect(manifest.files.map((file) => file.path)).toContain("manifest.json");
  });

  it("does not copy lock files or temporary files", () => {
    populate();
    writeFileSync(join(source, "manifest.json.tmp"), "partial");

    createBackup({ dataDirectory: source, backupDirectory: backup });

    expect(existsSync(join(backup, "manifest.json.tmp"))).toBe(false);
    expect(existsSync(join(backup, "LOCK"))).toBe(false);
  });

  it("refuses while a server holds the directory", () => {
    populate();

    const engine = StorageEngine.open({ directory: source });

    try {
      expect(
        codeOf(() =>
          createBackup({ dataDirectory: source, backupDirectory: backup }),
        ),
      ).toBeDefined();
      expect(existsSync(backup)).toBe(false);
      expect(leftovers()).toEqual([]);
    } finally {
      engine.close();
    }
  });

  it("refuses a non-empty destination", () => {
    populate();
    mkdirSync(backup);
    writeFileSync(join(backup, "keep.txt"), "mine");

    expect(
      codeOf(() =>
        createBackup({ dataDirectory: source, backupDirectory: backup }),
      ),
    ).toBeDefined();
    expect(readFileSync(join(backup, "keep.txt"), "utf8")).toBe("mine");
  });

  it("accepts an existing empty destination", () => {
    populate();
    mkdirSync(backup);

    createBackup({ dataDirectory: source, backupDirectory: backup });

    expect(existsSync(join(backup, BACKUP_MANIFEST_FILE))).toBe(true);
  });

  it("refuses a source that is not a data directory", () => {
    mkdirSync(source);

    expect(
      codeOf(() =>
        createBackup({ dataDirectory: source, backupDirectory: backup }),
      ),
    ).toBeDefined();
    expect(existsSync(backup)).toBe(false);
  });

  it("refuses nested or identical directories", () => {
    populate();

    expect(
      codeOf(() =>
        createBackup({
          dataDirectory: source,
          backupDirectory: join(source, "inside"),
        }),
      ),
    ).toBeDefined();
    expect(
      codeOf(() =>
        createBackup({ dataDirectory: source, backupDirectory: source }),
      ),
    ).toBeDefined();
    expect(existsSync(join(source, "inside"))).toBe(false);
  });
});

describe("verifyBackup", () => {
  it("accepts an intact backup", () => {
    populate();
    createBackup({ dataDirectory: source, backupDirectory: backup });

    const summary = verifyBackup(backup);

    expect(summary.files).toBeGreaterThan(1);
  });

  it("rejects a flipped byte", () => {
    populate();
    createBackup({ dataDirectory: source, backupDirectory: backup });

    const file = firstFile(join(backup, "checkpoints"), ".snap");
    const bytes = readFileSync(file);

    bytes[bytes.length - 1] = (bytes[bytes.length - 1] ?? 0) ^ 0xff;
    writeFileSync(file, bytes);

    expect(codeOf(() => verifyBackup(backup))).toBe(
      StorageErrorCode.InvalidBackup,
    );
  });

  it("rejects a truncated file", () => {
    populate();
    createBackup({ dataDirectory: source, backupDirectory: backup });
    truncateSync(firstFile(backup, ".snap"), 3);

    expect(codeOf(() => verifyBackup(backup))).toBe(
      StorageErrorCode.InvalidBackup,
    );
  });

  it("rejects a missing file", () => {
    populate();
    createBackup({ dataDirectory: source, backupDirectory: backup });
    rmSync(firstFile(backup, ".snap"));

    expect(codeOf(() => verifyBackup(backup))).toBe(
      StorageErrorCode.InvalidBackup,
    );
  });

  it("rejects an extra file", () => {
    populate();
    createBackup({ dataDirectory: source, backupDirectory: backup });
    writeFileSync(join(backup, "extra.bin"), "x");

    expect(codeOf(() => verifyBackup(backup))).toBe(
      StorageErrorCode.InvalidBackup,
    );
  });

  it("reports every problem at once", () => {
    populate();
    createBackup({ dataDirectory: source, backupDirectory: backup });
    writeFileSync(join(backup, "extra.bin"), "x");
    appendFileSync(join(backup, "manifest.json"), " ");

    let message = "";

    try {
      verifyBackup(backup);
    } catch (error: unknown) {
      message = String(error);
    }

    expect(message).toContain("extra.bin");
    expect(message).toContain("manifest.json");
  });

  it("rejects a directory that is not a backup", () => {
    mkdirSync(backup);

    expect(codeOf(() => verifyBackup(backup))).toBe(
      StorageErrorCode.InvalidBackup,
    );
    expect(codeOf(() => verifyBackup(join(root, "missing")))).toBe(
      StorageErrorCode.InvalidBackup,
    );
  });

  it("rejects a backup written by a newer version", () => {
    populate();
    createBackup({ dataDirectory: source, backupDirectory: backup });

    const path = join(backup, BACKUP_MANIFEST_FILE);
    const manifest = JSON.parse(readFileSync(path, "utf8")) as {
      formatVersion: number;
    };

    manifest.formatVersion = BACKUP_FORMAT_VERSION + 1;
    writeFileSync(path, JSON.stringify(manifest));

    expect(codeOf(() => verifyBackup(backup))).toBe(
      StorageErrorCode.InvalidBackup,
    );
  });

  it("rejects a manifest that lists an unsafe path", () => {
    populate();
    createBackup({ dataDirectory: source, backupDirectory: backup });

    const path = join(backup, BACKUP_MANIFEST_FILE);
    const manifest = JSON.parse(readFileSync(path, "utf8")) as {
      files: { path: string }[];
    };

    manifest.files.push({ path: "../escape.txt" });
    writeFileSync(path, JSON.stringify(manifest));

    expect(codeOf(() => verifyBackup(backup))).toBe(
      StorageErrorCode.InvalidBackup,
    );
  });
});

describe("restoreBackup", () => {
  it("restores a backup that opens with the same data", () => {
    populate();
    createBackup({ dataDirectory: source, backupDirectory: backup });

    const result = restoreBackup({
      backupDirectory: backup,
      dataDirectory: target,
    });

    expect(result.files).toBeGreaterThan(1);
    expect(result.recovery.lastLsn).toBeGreaterThan(0n);
    expect(existsSync(join(target, "manifest.json"))).toBe(true);
    expect(existsSync(join(target, BACKUP_MANIFEST_FILE))).toBe(false);
    expect(documentCount(target)).toBe(21);
    expect(leftovers()).toEqual([]);
  });

  it("leaves the backup usable and unchanged", () => {
    populate();
    createBackup({ dataDirectory: source, backupDirectory: backup });
    restoreBackup({ backupDirectory: backup, dataDirectory: target });

    verifyBackup(backup);
  });

  it("refuses a corrupt backup and creates nothing", () => {
    populate();
    createBackup({ dataDirectory: source, backupDirectory: backup });
    writeFileSync(join(backup, "extra.bin"), "x");

    expect(
      codeOf(() =>
        restoreBackup({ backupDirectory: backup, dataDirectory: target }),
      ),
    ).toBe(StorageErrorCode.InvalidBackup);
    expect(existsSync(target)).toBe(false);
    expect(leftovers()).toEqual([]);
  });

  it("refuses a non-empty destination", () => {
    populate();
    createBackup({ dataDirectory: source, backupDirectory: backup });
    mkdirSync(target);
    writeFileSync(join(target, "keep.txt"), "mine");

    expect(
      codeOf(() =>
        restoreBackup({ backupDirectory: backup, dataDirectory: target }),
      ),
    ).toBeDefined();
    expect(readFileSync(join(target, "keep.txt"), "utf8")).toBe("mine");
    expect(leftovers()).toEqual([]);
  });

  it("refuses a backup that verifies but cannot recover", () => {
    populate();
    createBackup({ dataDirectory: source, backupDirectory: backup });

    // Re-write the manifest so the damaged manifest.json still matches its
    // recorded checksum: the files are consistent but the data is not.
    const damaged = join(backup, "manifest.json");

    writeFileSync(damaged, "not json");

    const path = join(backup, BACKUP_MANIFEST_FILE);
    const description = JSON.parse(readFileSync(path, "utf8")) as {
      files: { path: string; size: number; sha256: string }[];
    };
    const entry = description.files.find((f) => f.path === "manifest.json");

    if (entry === undefined) {
      throw new Error("manifest.json is not listed");
    }

    entry.size = 8;
    entry.sha256 = createHash("sha256").update("not json").digest("hex");
    writeFileSync(path, JSON.stringify(description));

    verifyBackup(backup);

    expect(
      codeOf(() =>
        restoreBackup({ backupDirectory: backup, dataDirectory: target }),
      ),
    ).toBeDefined();
    expect(existsSync(target)).toBe(false);
    expect(leftovers()).toEqual([]);
  });
});
