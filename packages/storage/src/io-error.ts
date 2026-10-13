import { StorageError, StorageErrorCode } from "./errors.js";

const DISK_FULL = new Set(["ENOSPC", "EDQUOT"]);
const NOT_PERMITTED = new Set(["EACCES", "EPERM", "EROFS"]);

/** The operating system error code, such as ENOSPC, if the error has one. */
export function errnoOf(error: unknown): string | undefined {
  const code = (error as NodeJS.ErrnoException | undefined)?.code;

  return typeof code === "string" ? code : undefined;
}

export function isDiskFull(error: unknown): boolean {
  const code = errnoOf(error);

  return code !== undefined && DISK_FULL.has(code);
}

/**
 * Turns a failed file operation into a StorageError. Full disks and refused
 * permissions get their own codes and advice. Pass `classify: false` after a
 * failed fsync: the state of the data is unknown, so it must stay a plain I/O
 * error whatever the operating system called it.
 */
export function ioError(
  action: string,
  path: string,
  cause: unknown,
  classify = true,
): StorageError {
  const code = classify ? errnoOf(cause) : undefined;
  const reason = (cause as Error).message;

  if (code !== undefined && DISK_FULL.has(code)) {
    return new StorageError(
      StorageErrorCode.DiskFull,
      `Could not ${action} at ${path} because the disk or quota is full (${code}). Free some space and try again.`,
      { cause },
    );
  }

  if (code !== undefined && NOT_PERMITTED.has(code)) {
    return new StorageError(
      StorageErrorCode.PermissionDenied,
      `Could not ${action} at ${path} because the operating system refused access (${code}). Check the permissions and whether the file system is read-only.`,
      { cause },
    );
  }

  return new StorageError(
    StorageErrorCode.Io,
    `Could not ${action} at ${path}: ${reason}`,
    { cause },
  );
}

/**
 * Gives a failed file operation a StorageError when the operating system
 * reported it (it has an errno code). StorageErrors and any other error, such
 * as one thrown by a test hook, are returned unchanged.
 */
export function translateIo(
  action: string,
  path: string,
  cause: unknown,
): unknown {
  if (cause instanceof StorageError || errnoOf(cause) === undefined) {
    return cause;
  }

  return ioError(action, path, cause);
}
