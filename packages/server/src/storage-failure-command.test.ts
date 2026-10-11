import { StorageError, StorageErrorCode } from "@sinterdb-internal/storage";
import { WireErrorCode } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import type { InMemoryCatalog } from "./catalog.js";
import {
  CommandDispatcher,
  CommandExecutionError,
} from "./command-dispatcher.js";

function failingWith(code: StorageErrorCode): CommandDispatcher {
  const catalog = {
    getOrCreateCollection: () => ({
      insertOne: () => {
        throw new StorageError(code, "internal detail with /private/path");
      },
    }),
  } as unknown as InMemoryCatalog;

  return new CommandDispatcher(catalog);
}

function insert(dispatcher: CommandDispatcher): CommandExecutionError {
  try {
    dispatcher.dispatch({
      command: "insertOne",
      database: "app",
      parameters: { collection: "things", document: { n: 1 } } as never,
    });
  } catch (error: unknown) {
    return error as CommandExecutionError;
  }

  throw new Error("The insert did not fail.");
}

describe("storage failures reported to clients", () => {
  it("says a full disk did not apply the operation", () => {
    const error = insert(failingWith(StorageErrorCode.DiskFull));

    expect(error.code).toBe(WireErrorCode.InternalError);
    expect(error.message).toContain("disk is full");
    expect(error.message).toContain("not applied");
    expect(error.message).not.toContain("/private/path");
    expect(error.details).toMatchObject({ storageErrorCode: "DISK_FULL" });
  });

  it("says refused permissions did not apply the operation", () => {
    const error = insert(failingWith(StorageErrorCode.PermissionDenied));

    expect(error.code).toBe(WireErrorCode.InternalError);
    expect(error.message).toContain("not allowed");
    expect(error.details).toMatchObject({
      storageErrorCode: "PERMISSION_DENIED",
    });
  });

  it("keeps other I/O failures unknown", () => {
    const error = insert(failingWith(StorageErrorCode.Io));

    expect(error.code).toBe(WireErrorCode.InternalError);
    expect(error.message).toContain("outcome is unknown");
  });
});
