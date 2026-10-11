import { createHash } from "node:crypto";
import {
  closeSync,
  existsSync,
  fsyncSync,
  mkdirSync,
  openSync,
  readFileSync,
  readSync,
  readdirSync,
  renameSync,
  rmSync,
  rmdirSync,
  statSync,
  writeSync,
} from "node:fs";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";

import { writeFileAtomic } from "../engine/files.js";
import { acquireDirectoryLock } from "../engine/lock.js";
import {
  STORAGE_FORMAT,
  STORAGE_FORMAT_VERSION,
  StorageEngine,
  type RecoveryReport,
} from "../engine/storage-engine.js";
import { StorageError, StorageErrorCode } from "../errors.js";
import { syncDirectory } from "../wal/index.js";

export const BACKUP_FORMAT = "sinterdb-backup";
export const BACKUP_FORMAT_VERSION = 1;
export const BACKUP_MANIFEST_FILE = "backup.json";

const CHUNK_BYTES = 1024 * 1024;

interface BackupFileEntry {
  readonly path: string;
  readonly size: number;
  readonly sha256: string;
}

interface BackupManifest {
  readonly format: string;
  readonly formatVersion: number;
  readonly createdAt: string;
  readonly storageFormatVersion: number;
  readonly files: readonly BackupFileEntry[];
}

export interface BackupOptions {
  /** The data directory to copy. No server may be using it. */
  readonly dataDirectory: string;
  /** Where to put the backup. It must not exist or must be empty. */
  readonly backupDirectory: string;
  /** Take over a lock left by another host or container. */
  readonly reclaimLock?: boolean;
}

export interface BackupResult {
  readonly directory: string;
  readonly files: number;
  readonly bytes: number;
  readonly createdAt: string;
}

export interface BackupSummary {
  readonly directory: string;
  readonly files: number;
  readonly bytes: number;
  readonly createdAt: string;
  readonly storageFormatVersion: number;
}

export interface RestoreOptions {
  /** A backup made by `createBackup`. */
  readonly backupDirectory: string;
  /** Where to create the data directory. It must not exist or must be empty. */
  readonly dataDirectory: string;
}

export interface RestoreResult {
  readonly directory: string;
  readonly files: number;
  readonly bytes: number;
  readonly recovery: RecoveryReport;
}

/**
 * Copies a data directory to a new backup directory. The data directory must
 * not be in use: the copy takes the directory lock, so it fails with a clear
 * message while a server is running on it. The backup is built in a temporary
 * directory next to the destination and renamed into place only when every
 * file has been copied, flushed and recorded with its checksum.
 */
export function createBackup(options: BackupOptions): BackupResult {
  const source = resolve(options.dataDirectory);
  const destination = resolve(options.backupDirectory);

  assertNotNested(source, destination);
  assertDataDirectory(source);
  assertEmptyOrMissing(destination, "backup");

  const lock = acquireDirectoryLock(join(source, "LOCK"), {
    reclaimForeignLock: options.reclaimLock === true,
  });
  const temporary = `${destination}.partial`;

  try {
    rmSync(temporary, { recursive: true, force: true });
    mkdirSync(temporary, { recursive: true });

    const entries: BackupFileEntry[] = [];

    for (const path of listFiles(source)) {
      const copied = copyFile(join(source, path), join(temporary, path));

      entries.push({ path, ...copied });
    }

    const createdAt = new Date().toISOString();
    const manifest: BackupManifest = {
      format: BACKUP_FORMAT,
      formatVersion: BACKUP_FORMAT_VERSION,
      createdAt,
      storageFormatVersion: STORAGE_FORMAT_VERSION,
      files: entries,
    };

    writeFileAtomic(
      temporary,
      join(temporary, BACKUP_MANIFEST_FILE),
      `${JSON.stringify(manifest, null, 2)}\n`,
    );
    syncTree(temporary);
    publish(temporary, destination);

    return {
      directory: destination,
      files: entries.length,
      bytes: entries.reduce((sum, entry) => sum + entry.size, 0),
      createdAt,
    };
  } catch (error: unknown) {
    rmSync(temporary, { recursive: true, force: true });

    throw error;
  } finally {
    lock.release();
  }
}

/**
 * Checks a backup against the checksums recorded when it was made. It reports
 * every problem it finds, not just the first.
 */
export function verifyBackup(backupDirectory: string): BackupSummary {
  const directory = resolve(backupDirectory);
  const manifest = readBackupManifest(directory);
  const problems: string[] = [];
  const known = new Set<string>([BACKUP_MANIFEST_FILE]);
  let bytes = 0;

  for (const entry of manifest.files) {
    known.add(entry.path);

    const path = join(directory, entry.path);

    if (!existsSync(path)) {
      problems.push(`${entry.path} is missing`);
      continue;
    }

    const size = statSync(path).size;

    if (size !== entry.size) {
      problems.push(
        `${entry.path} has ${size} bytes but the backup recorded ${entry.size}`,
      );
      continue;
    }

    if (hashFile(path) !== entry.sha256) {
      problems.push(`${entry.path} does not match its checksum`);
      continue;
    }

    bytes += size;
  }

  for (const path of listFiles(directory, { includeAll: true })) {
    if (!known.has(path)) {
      problems.push(`${path} is not part of the backup`);
    }
  }

  if (problems.length > 0) {
    throw invalidBackup(
      `The backup in ${directory} is damaged: ${problems.join("; ")}.`,
    );
  }

  return {
    directory,
    files: manifest.files.length,
    bytes,
    createdAt: manifest.createdAt,
    storageFormatVersion: manifest.storageFormatVersion,
  };
}

/**
 * Creates a data directory from a backup. The backup is verified first, copied
 * into a temporary directory, checked again as it is copied, and opened once to
 * prove the data recovers. Only then is the directory moved into place, so a
 * failed restore never leaves a half-built data directory behind.
 */
export function restoreBackup(options: RestoreOptions): RestoreResult {
  const source = resolve(options.backupDirectory);
  const destination = resolve(options.dataDirectory);

  assertNotNested(source, destination);

  const summary = verifyBackup(source);
  const manifest = readBackupManifest(source);

  assertEmptyOrMissing(destination, "data directory");

  const temporary = `${destination}.restoring`;

  try {
    rmSync(temporary, { recursive: true, force: true });
    mkdirSync(temporary, { recursive: true });

    for (const entry of manifest.files) {
      const copied = copyFile(
        join(source, entry.path),
        join(temporary, entry.path),
      );

      if (copied.sha256 !== entry.sha256 || copied.size !== entry.size) {
        throw invalidBackup(
          `${entry.path} changed while it was being restored. Run the restore again.`,
        );
      }
    }

    let recovery: RecoveryReport;

    try {
      const engine = StorageEngine.open({
        directory: temporary,
        checkpointOnClose: false,
      });

      recovery = engine.recovery;
      engine.close();
    } catch (error: unknown) {
      throw invalidBackup(
        `The backup is intact but its data cannot be recovered: ${(error as Error).message}`,
        error,
      );
    }

    syncTree(temporary);
    publish(temporary, destination);

    return {
      directory: destination,
      files: summary.files,
      bytes: summary.bytes,
      recovery,
    };
  } catch (error: unknown) {
    rmSync(temporary, { recursive: true, force: true });

    throw error;
  }
}

function readBackupManifest(directory: string): BackupManifest {
  const path = join(directory, BACKUP_MANIFEST_FILE);

  if (!existsSync(path)) {
    throw invalidBackup(
      `${directory} is not a SinterDB backup: it has no ${BACKUP_MANIFEST_FILE}.`,
    );
  }

  let parsed: Partial<BackupManifest>;

  try {
    parsed = JSON.parse(readFileSync(path, "utf8")) as Partial<BackupManifest>;
  } catch (error: unknown) {
    throw invalidBackup(
      `The backup manifest ${path} is not valid JSON: ${(error as Error).message}.`,
      error,
    );
  }

  if (parsed.format !== BACKUP_FORMAT) {
    throw invalidBackup(`${directory} is not a SinterDB backup.`);
  }

  if (
    typeof parsed.formatVersion !== "number" ||
    parsed.formatVersion > BACKUP_FORMAT_VERSION
  ) {
    throw invalidBackup(
      `The backup uses format version ${String(parsed.formatVersion)}, but this version of SinterDB reads up to version ${BACKUP_FORMAT_VERSION}. Upgrade SinterDB to use it.`,
    );
  }

  if (
    typeof parsed.createdAt !== "string" ||
    typeof parsed.storageFormatVersion !== "number" ||
    !Array.isArray(parsed.files)
  ) {
    throw invalidBackup(`The backup manifest ${path} is incomplete.`);
  }

  if (parsed.storageFormatVersion > STORAGE_FORMAT_VERSION) {
    throw invalidBackup(
      `The backup holds storage format version ${parsed.storageFormatVersion}, but this version of SinterDB only supports up to version ${STORAGE_FORMAT_VERSION}. Upgrade SinterDB to restore it.`,
    );
  }

  const seen = new Set<string>();

  for (const entry of parsed.files as Partial<BackupFileEntry>[]) {
    if (
      typeof entry.path !== "string" ||
      typeof entry.size !== "number" ||
      typeof entry.sha256 !== "string" ||
      entry.path.length === 0 ||
      isAbsolute(entry.path) ||
      entry.path.split(/[\\/]/).includes("..") ||
      seen.has(entry.path)
    ) {
      throw invalidBackup(`The backup manifest ${path} lists an invalid file.`);
    }

    seen.add(entry.path);
  }

  if (!seen.has("manifest.json")) {
    throw invalidBackup(
      `The backup manifest ${path} does not include the data directory manifest.json.`,
    );
  }

  return parsed as BackupManifest;
}

function assertDataDirectory(directory: string): void {
  const path = join(directory, "manifest.json");

  if (!existsSync(directory) || !existsSync(path)) {
    throw invalidBackup(
      `${directory} is not a SinterDB data directory: it has no manifest.json.`,
    );
  }

  let manifest: { format?: unknown; formatVersion?: unknown };

  try {
    manifest = JSON.parse(readFileSync(path, "utf8")) as typeof manifest;
  } catch (error: unknown) {
    throw invalidBackup(
      `The manifest ${path} is not valid JSON: ${(error as Error).message}. Restore it from a backup first.`,
      error,
    );
  }

  if (manifest.format !== STORAGE_FORMAT) {
    throw invalidBackup(`${directory} is not a SinterDB data directory.`);
  }
}

function assertEmptyOrMissing(directory: string, what: string): void {
  if (!existsSync(directory)) {
    return;
  }

  if (!statSync(directory).isDirectory()) {
    throw invalidBackup(`${directory} exists and is not a directory.`);
  }

  if (readdirSync(directory).length > 0) {
    throw invalidBackup(
      `The ${what} ${directory} already exists and is not empty. Choose a new directory or empty it first.`,
    );
  }
}

function assertNotNested(first: string, second: string): void {
  const inside = (outer: string, inner: string): boolean => {
    const path = relative(outer, inner);

    return path === "" || (!path.startsWith("..") && !isAbsolute(path));
  };

  if (inside(first, second) || inside(second, first)) {
    throw invalidBackup(
      `${first} and ${second} are the same directory or one is inside the other.`,
    );
  }
}

interface ListOptions {
  /** Include the lock file and temporary files. */
  readonly includeAll?: boolean;
}

function listFiles(root: string, options: ListOptions = {}): string[] {
  const found: string[] = [];

  const walk = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const full = join(directory, entry.name);
      const path = relative(root, full).split(sep).join("/");

      if (entry.isDirectory()) {
        walk(full);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      if (
        options.includeAll !== true &&
        (path === "LOCK" || entry.name.endsWith(".tmp"))
      ) {
        continue;
      }

      found.push(path);
    }
  };

  walk(root);

  return found.sort();
}

function copyFile(from: string, to: string): { size: number; sha256: string } {
  mkdirSync(dirname(to), { recursive: true });

  const hash = createHash("sha256");
  const input = openSync(from, "r");
  const output = openSync(to, "w");
  const buffer = Buffer.allocUnsafe(CHUNK_BYTES);
  let size = 0;

  try {
    for (;;) {
      const read = readSync(input, buffer, 0, CHUNK_BYTES, null);

      if (read === 0) {
        break;
      }

      hash.update(buffer.subarray(0, read));

      let written = 0;

      while (written < read) {
        written += writeSync(output, buffer, written, read - written);
      }

      size += read;
    }

    fsyncSync(output);
  } finally {
    closeSync(input);
    closeSync(output);
  }

  return { size, sha256: hash.digest("hex") };
}

function hashFile(path: string): string {
  const hash = createHash("sha256");
  const input = openSync(path, "r");
  const buffer = Buffer.allocUnsafe(CHUNK_BYTES);

  try {
    for (;;) {
      const read = readSync(input, buffer, 0, CHUNK_BYTES, null);

      if (read === 0) {
        break;
      }

      hash.update(buffer.subarray(0, read));
    }
  } finally {
    closeSync(input);
  }

  return hash.digest("hex");
}

function syncTree(root: string): void {
  const walk = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(join(directory, entry.name));
      }
    }

    syncDirectory(directory);
  };

  walk(root);
}

function publish(temporary: string, destination: string): void {
  mkdirSync(dirname(destination), { recursive: true });

  if (existsSync(destination)) {
    rmdirSync(destination);
  }

  renameSync(temporary, destination);
  syncDirectory(dirname(destination));
}

function invalidBackup(message: string, cause?: unknown): StorageError {
  return new StorageError(
    StorageErrorCode.InvalidBackup,
    message,
    cause === undefined ? {} : { cause },
  );
}
