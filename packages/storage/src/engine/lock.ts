import { randomUUID } from "node:crypto";
import {
  closeSync,
  fsyncSync,
  openSync,
  readFileSync,
  statSync,
  unlinkSync,
  writeSync,
} from "node:fs";
import { hostname } from "node:os";

import { StorageError, StorageErrorCode } from "../errors.js";

interface LockInfo {
  readonly pid: number;
  readonly hostname: string;
  readonly startedAt: string;
  readonly nonce: string;
}

export interface DirectoryLock {
  release(): void;
}

const UNREADABLE_LOCK_GRACE_MS = 5_000;

export function acquireDirectoryLock(path: string): DirectoryLock {
  const info: LockInfo = {
    pid: process.pid,
    hostname: hostname(),
    startedAt: new Date().toISOString(),
    nonce: randomUUID(),
  };

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const fd = openSync(path, "wx");

      try {
        writeSync(fd, JSON.stringify(info));
        fsyncSync(fd);
      } finally {
        closeSync(fd);
      }

      return { release: () => releaseLock(path, info.nonce) };
    } catch (error: unknown) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
        throw new StorageError(
          StorageErrorCode.Io,
          `Could not create the lock file ${path}: ${(error as Error).message}`,
          { cause: error },
        );
      }
    }

    const holder = readLock(path);

    if (holder === undefined) {
      if (lockIsFresh(path)) {
        throw locked(path, "another process is starting up");
      }
    } else if (!isStale(holder)) {
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

function isStale(holder: LockInfo): boolean {
  if (holder.hostname !== hostname()) {
    return false;
  }

  try {
    process.kill(holder.pid, 0);

    return false;
  } catch (error: unknown) {
    return (error as NodeJS.ErrnoException).code === "ESRCH";
  }
}

function releaseLock(path: string, nonce: string): void {
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
