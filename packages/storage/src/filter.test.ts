import { CustomId, type Document } from "sinterdb-protocol";
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

  it("supports explicit equality", () => {
    const matches = compileFilter({
      name: {
        $eq: "Ada",
      },
    });

    expect(matches({ name: "Ada" })).toBe(true);
    expect(matches({ name: "Grace" })).toBe(false);
    expect(matches({})).toBe(false);
  });

  it("supports inequality", () => {
    const matches = compileFilter({
      name: {
        $ne: "Ada",
      },
    });

    expect(matches({ name: "Grace" })).toBe(true);
    expect(matches({ name: "Ada" })).toBe(false);
    expect(matches({})).toBe(true);
  });

  it("combines multiple comparison operators on one field", () => {
    const matches = compileFilter({
      age: {
        $gte: 18,
        $lt: 65,
      },
    });

    expect(matches({ age: 18 })).toBe(true);
    expect(matches({ age: 36 })).toBe(true);
    expect(matches({ age: 64 })).toBe(true);
    expect(matches({ age: 17 })).toBe(false);
    expect(matches({ age: 65 })).toBe(false);
  });

  it("supports strict comparison boundaries", () => {
    const greaterThan = compileFilter({
      score: {
        $gt: 10,
      },
    });

    const lessThanOrEqual = compileFilter({
      score: {
        $lte: 10,
      },
    });

    expect(greaterThan({ score: 11 })).toBe(true);
    expect(greaterThan({ score: 10 })).toBe(false);

    expect(lessThanOrEqual({ score: 10 })).toBe(true);
    expect(lessThanOrEqual({ score: 11 })).toBe(false);
  });

  it("compares strings", () => {
    const matches = compileFilter({
      name: {
        $gt: "Ada",
        $lt: "Katherine",
      },
    });

    expect(matches({ name: "Grace" })).toBe(true);
    expect(matches({ name: "Ada" })).toBe(false);
    expect(matches({ name: "Linus" })).toBe(false);
  });

  it("compares bigints", () => {
    const matches = compileFilter({
      count: {
        $gte: 10n,
      },
    });

    expect(matches({ count: 10n })).toBe(true);
    expect(matches({ count: 11n })).toBe(true);
    expect(matches({ count: 9n })).toBe(false);
  });

  it("compares dates", () => {
    const matches = compileFilter({
      createdAt: {
        $gte: new Date("2026-01-01T00:00:00.000Z"),
      },
    });

    expect(
      matches({
        createdAt: new Date("2026-01-01T00:00:00.000Z"),
      }),
    ).toBe(true);

    expect(
      matches({
        createdAt: new Date("2025-12-31T23:59:59.999Z"),
      }),
    ).toBe(false);
  });

  it("compares binary values lexicographically", () => {
    const matches = compileFilter({
      data: {
        $gt: new Uint8Array([1, 2, 3]),
      },
    });

    expect(
      matches({
        data: new Uint8Array([1, 2, 4]),
      }),
    ).toBe(true);

    expect(
      matches({
        data: new Uint8Array([1, 2, 3]),
      }),
    ).toBe(false);
  });

  it("compares CustomId values lexicographically", () => {
    const boundary = CustomId.fromHexString(
      "00112233445566778899aabbccddeeff",
    );

    const greater = CustomId.fromHexString(
      "10112233445566778899aabbccddeeff",
    );

    const lower = CustomId.fromHexString(
      "00012233445566778899aabbccddeeff",
    );

    const matches = compileFilter({
      _id: {
        $gt: boundary,
      },
    });

    expect(matches({ _id: greater })).toBe(true);
    expect(matches({ _id: boundary })).toBe(false);
    expect(matches({ _id: lower })).toBe(false);
  });

  it("does not compare values of different types", () => {
    const matches = compileFilter({
      age: {
        $gte: 18,
      },
    });

    expect(matches({ age: "18" })).toBe(false);
    expect(matches({ age: 18n })).toBe(false);
    expect(matches({})).toBe(false);
  });

  it("rejects unsupported operators", () => {
    expectStorageError(
      () =>
        compileFilter({
          age: {
            $around: 18,
          },
        }),
      StorageErrorCode.InvalidFilter,
    );
  });

  it("rejects mixed operator and literal fields", () => {
    expectStorageError(
      () =>
        compileFilter({
          age: {
            $gte: 18,
            unit: "years",
          },
        }),
      StorageErrorCode.InvalidFilter,
    );
  });

  it("rejects non-comparable comparison operands", () => {
    expectStorageError(
      () =>
        compileFilter({
          active: {
            $gt: true,
          },
        }),
      StorageErrorCode.InvalidFilter,
    );

    expectStorageError(
      () =>
        compileFilter({
          profile: {
            $lt: {
              level: 5,
            },
          },
        }),
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
