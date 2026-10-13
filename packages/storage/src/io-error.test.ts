import { describe, expect, it } from "vitest";

import { StorageError, StorageErrorCode } from "./errors.js";
import { errnoOf, ioError, isDiskFull, translateIo } from "./io-error.js";

function os(code: string): NodeJS.ErrnoException {
  return Object.assign(new Error(`${code}: operating system message`), {
    code,
  });
}

describe("ioError", () => {
  it("reports a full disk or quota as DISK_FULL", () => {
    for (const code of ["ENOSPC", "EDQUOT"]) {
      const error = ioError("append to the log", "/data/x.wal", os(code));

      expect(error.code).toBe(StorageErrorCode.DiskFull);
      expect(error.message).toContain("full");
      expect(error.message).toContain("/data/x.wal");
      expect(error.message).toContain(code);
      expect(error.cause).toBeInstanceOf(Error);
    }
  });

  it("reports refused access as PERMISSION_DENIED", () => {
    for (const code of ["EACCES", "EPERM", "EROFS"]) {
      const error = ioError("create a log segment", "/data/y", os(code));

      expect(error.code).toBe(StorageErrorCode.PermissionDenied);
      expect(error.message).toContain("permissions");
      expect(error.message).toContain(code);
    }
  });

  it("keeps every other failure as IO_ERROR", () => {
    const error = ioError("read a log segment", "/data/z", os("EIO"));

    expect(error.code).toBe(StorageErrorCode.Io);
    expect(error.message).toContain("operating system message");
  });

  it("does not classify when told not to", () => {
    expect(ioError("flush the log", "/d", os("ENOSPC"), false).code).toBe(
      StorageErrorCode.Io,
    );
    expect(ioError("flush the log", "/d", os("EACCES"), false).code).toBe(
      StorageErrorCode.Io,
    );
  });
});

describe("translateIo", () => {
  it("wraps errors that carry an operating system code", () => {
    const result = translateIo("write", "/d", os("ENOSPC"));

    expect(result).toBeInstanceOf(StorageError);
    expect((result as StorageError).code).toBe(StorageErrorCode.DiskFull);
  });

  it("returns StorageErrors and other errors unchanged", () => {
    const storage = new StorageError(StorageErrorCode.Closed, "closed");
    const other = new Error("hook failed");

    expect(translateIo("write", "/d", storage)).toBe(storage);
    expect(translateIo("write", "/d", other)).toBe(other);
    expect(translateIo("write", "/d", "text")).toBe("text");
  });
});

describe("helpers", () => {
  it("reads the operating system code", () => {
    expect(errnoOf(os("ENOSPC"))).toBe("ENOSPC");
    expect(errnoOf(new Error("x"))).toBeUndefined();
    expect(errnoOf(undefined)).toBeUndefined();
    expect(isDiskFull(os("EDQUOT"))).toBe(true);
    expect(isDiskFull(os("EACCES"))).toBe(false);
  });
});
