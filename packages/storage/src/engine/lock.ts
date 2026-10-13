import { randomUUID } from "node:crypto";
import {
  closeSync,
  fsyncSync,
  linkSync,
  openSync,
  readdirSync,
  readFileSync,
  statSync,
  unlinkSync,
  writeSync,
} from "node:fs";
import { hostname } from "node:os";
import { basename, dirname, join } from "node:path";

import { StorageError, StorageErrorCode } from "../errors.js";
import { errnoOf, ioError } from "../io-error.js";

interface LockInfo {
  readonly pid: number;
  readonly hostname: string;
  readonly startedAt: string;
  readonly nonce: string;
}

export interface LockDescription {
  /**
   * `running`: a process on this host holds it. `stale`: the process is gone.
   * `foreign`: written on another host, so it cannot be checked. `unreadable`:
   * the file exists but has no usable owner.
   */
  readonly state: "running" | "stale" | "foreign" | "unreadable";
  readonly holder?: Omit<LockInfo, "nonce">;
}

export interface DirectoryLock {
  release(): void;
}

export interface DirectoryLockOptions {
  /**
   * Treat a lock written by a process on another host as left behind. A
   * server cannot tell whether such a process is still running, so this is
   * off by default. Container platforms give every container its own host
   * name, so a lock left by a stopped container always looks foreign.
   */
  readonly reclaimForeignLock?: boolean;
}

// Locks this process currently holds. A lock file with this process's id that
// is not in here was written by an earlier process that had the same id, which
// is normal in containers where the server is always process 1.
const heldPaths = new Set<string>();

const UNREADABLE_LOCK_GRACE_MS = 5_000;

export function acquireDirectoryLock(
  path: string,
  options: DirectoryLockOptions = {},
): DirectoryLock {
  const info: LockInfo = {
    pid: process.pid,
    hostname: hostname(),
    startedAt: new Date().toISOString(),
    nonce: randomUUID(),
  };

  sweepPrivateFiles(path);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      publishLock(path, info);
      heldPaths.add(path);

      return { release: () => releaseLock(path, info.nonce) };
    } catch (error: unknown) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
        throw ioError("create the lock file", path, error);
      }
    }

    const holder = readLock(path);

    if (holder === undefined) {
      if (lockIsFresh(path)) {
        throw locked(path, "another process is starting up");
      }
    } else if (!isStale(holder, path, options)) {
      throw locked(
        path,
        `it is held by process ${holder.pid} on ${holder.hostname}, started ${holder.startedAt}`,
      );
    }

    try {
      unlinkSync(path);
    } catch (error: unknown) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }
  }

  throw locked(path, "it kept changing while it was being acquired");
}

// The owner is written to a private file first and then linked into place, so
// the lock path never exists without a readable owner, even if this process is
// killed part way through. link() fails with EEXIST if the lock is taken.
function publishLock(path: string, info: LockInfo): void {
  const temporary = `${path}.${info.pid}.${info.nonce}.tmp`;
  const fd = openSync(temporary, "wx");

  try {
    try {
      writeSync(fd, JSON.stringify(info));
      fsyncSync(fd);
    } finally {
      closeSync(fd);
    }

    linkSync(temporary, path);
  } finally {
    try {
      unlinkSync(temporary);
    } catch {
      // A leftover private file is harmless; it is never treated as a lock.
    }
  }
}

// Removes private files left by a killed or failed start. Those of this process
// cannot be in use, because acquiring is synchronous; those of another process
// are only removed once that process is gone.
function sweepPrivateFiles(path: string): void {
  const prefix = `${basename(path)}.`;

  let names: string[];

  try {
    names = readdirSync(dirname(path));
  } catch {
    return;
  }

  for (const name of names) {
    const match = /^(\d+)\.[0-9a-f-]+\.tmp$/.exec(name.slice(prefix.length));

    if (!name.startsWith(prefix) || match === null) {
      continue;
    }

    const pid = Number(match[1]);
    let gone = pid === process.pid;

    if (!gone) {
      try {
        process.kill(pid, 0);
      } catch (error: unknown) {
        gone = (error as NodeJS.ErrnoException).code === "ESRCH";
      }
    }

    if (gone) {
      try {
        unlinkSync(join(dirname(path), name));
      } catch {
        // Already gone, or not ours to remove; neither blocks the lock.
      }
    }
  }
}

/** Says who holds the lock file at `path`, or undefined if there is none. */
export function describeLock(path: string): LockDescription | undefined {
  try {
    statSync(path);
  } catch (error: unknown) {
    if (errnoOf(error) === "ENOENT") {
      return undefined;
    }

    throw ioError("read the lock file", path, error);
  }

  const holder = readLock(path);

  if (holder === undefined) {
    return { state: "unreadable" };
  }

  const shown = {
    pid: holder.pid,
    hostname: holder.hostname,
    startedAt: holder.startedAt,
  };

  if (holder.hostname !== hostname()) {
    return { state: "foreign", holder: shown };
  }

  return {
    state: isStale(holder, path, {}) ? "stale" : "running",
    holder: shown,
  };
}

function readLock(path: string): LockInfo | undefined {
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8")) as Partial<LockInfo>;

    if (
      typeof parsed.pid === "number" &&
      typeof parsed.hostname === "string" &&
      typeof parsed.startedAt === "string" &&
      typeof parsed.nonce === "string"
    ) {
      return parsed as LockInfo;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function lockIsFresh(path: string): boolean {
  try {
    return Date.now() - statSync(path).mtimeMs < UNREADABLE_LOCK_GRACE_MS;
  } catch {
    return false;
  }
}

function isStale(
  holder: LockInfo,
  path: string,
  options: DirectoryLockOptions,
): boolean {
  if (holder.hostname !== hostname()) {
    return options.reclaimForeignLock === true;
  }

  if (holder.pid === process.pid) {
    return !heldPaths.has(path);
  }

  try {
    process.kill(holder.pid, 0);

    return false;
  } catch (error: unknown) {
    return (error as NodeJS.ErrnoException).code === "ESRCH";
  }
}

function releaseLock(path: string, nonce: string): void {
  heldPaths.delete(path);

  if (readLock(path)?.nonce !== nonce) {
    return;
  }

  try {
    unlinkSync(path);
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}

function locked(path: string, reason: string): StorageError {
  return new StorageError(
    StorageErrorCode.Locked,
    `The data directory is in use: ${reason}. Stop the other server, or remove ${path} only if you are sure no SinterDB process is using this directory.`,
  );
}
