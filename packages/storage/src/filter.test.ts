import { type Document } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { StorageError, StorageErrorCode } from "./errors.js";
import { compileFilter } from "./filter.js";

describe("compileFilter", () => {
  it("matches scalar equality fields", () => {
    const matches = compileFilter({
      name: "Ada",
      active: true,
      age: 36,
    });

    expect(
      matches({
        name: "Ada",
        active: true,
        age: 36,
      }),
    ).toBe(true);

    expect(
      matches({
        name: "Ada",
        active: false,
        age: 36,
      }),
    ).toBe(false);
  });

  it("matches nested values using canonical equality", () => {
    const matches = compileFilter({
      profile: {
        active: true,
        level: 5,
      },
    });

    expect(
      matches({
        profile: {
          level: 5,
          active: true,
        },
      }),
    ).toBe(true);
  });

  it("resolves nested field paths", () => {
    const matches = compileFilter({
      "profile.contact.email": "ada@example.com",
    });

    expect(
      matches({
        profile: {
          contact: {
            email: "ada@example.com",
          },
        },
      }),
    ).toBe(true);

    expect(
      matches({
        profile: {
          contact: {
            email: "grace@example.com",
          },
        },
      }),
    ).toBe(false);
  });

  it("does not match a missing nested field", () => {
    const matches = compileFilter({
      "profile.active": true,
    });

    expect(
      matches({
        profile: {},
      }),
    ).toBe(false);

    expect(matches({})).toBe(false);
  });

  it("does not traverse through non-document values", () => {
    const matches = compileFilter({
      "profile.active": true,
    });

    expect(
      matches({
        profile: "not-a-document",
      }),
    ).toBe(false);
  });

  it("matches every document for an empty filter", () => {
    const matches = compileFilter({});

    expect(matches({})).toBe(true);
    expect(
      matches({
        name: "Ada",
      }),
    ).toBe(true);
  });

  it("rejects values that cannot be encoded", () => {
    const filter = {
      value: undefined,
    } as unknown as Document;

    expectStorageError(
      () => compileFilter(filter),
      StorageErrorCode.InvalidFilter,
    );
  });

  it.each(["", ".name", "profile.", "profile..name"])(
    "rejects the invalid field path %j",
    (path) => {
      expectStorageError(
        () =>
          compileFilter({
            [path]: true,
          }),
        StorageErrorCode.InvalidFilter,
      );
    },
  );

  it("rejects reserved field-path segments", () => {
    expectStorageError(
      () =>
        compileFilter({
          "profile.$internal": true,
        }),
      StorageErrorCode.InvalidFilter,
    );
  });

  it("rejects non-document filters at runtime", () => {
    expectStorageError(
      () => compileFilter(null as unknown as Document),
      StorageErrorCode.InvalidFilter,
    );
  });
});

function expectStorageError(
  action: () => unknown,
  expectedCode: StorageErrorCode,
): void {
  try {
    action();
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(StorageError);

    if (error instanceof StorageError) {
      expect(error.code).toBe(expectedCode);
    }

    return;
  }

  throw new Error(`Expected ${expectedCode} to be thrown.`);
}
