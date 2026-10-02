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
    const boundary = CustomId.fromHexString("00112233445566778899aabbccddeeff");

    const greater = CustomId.fromHexString("10112233445566778899aabbccddeeff");

    const lower = CustomId.fromHexString("00012233445566778899aabbccddeeff");

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

  it("supports $in and $nin", () => {
    const inColors = compileFilter({ color: { $in: ["red", "blue"] } });
    const notInColors = compileFilter({ color: { $nin: ["red", "blue"] } });

    expect(inColors({ color: "red" })).toBe(true);
    expect(inColors({ color: "green" })).toBe(false);
    expect(inColors({})).toBe(false);

    expect(notInColors({ color: "green" })).toBe(true);
    expect(notInColors({ color: "red" })).toBe(false);
    expect(notInColors({})).toBe(true);
  });

  it("matches $in and $nin against array elements", () => {
    const hasTag = compileFilter({ tags: { $in: ["db"] } });
    const lacksTag = compileFilter({ tags: { $nin: ["db"] } });

    expect(hasTag({ tags: ["node", "db"] })).toBe(true);
    expect(hasTag({ tags: ["node"] })).toBe(false);
    expect(lacksTag({ tags: ["node"] })).toBe(true);
    expect(lacksTag({ tags: ["node", "db"] })).toBe(false);
  });

  it("rejects non-array $in and $nin operands", () => {
    expectStorageError(
      () => compileFilter({ color: { $in: "red" } }),
      StorageErrorCode.InvalidFilter,
    );

    expectStorageError(
      () => compileFilter({ color: { $nin: { color: "red" } } }),
      StorageErrorCode.InvalidFilter,
    );
  });

  it("supports $exists", () => {
    const present = compileFilter({ email: { $exists: true } });
    const absent = compileFilter({ email: { $exists: false } });

    expect(present({ email: "ada@example.com" })).toBe(true);
    expect(present({ email: null })).toBe(true);
    expect(present({})).toBe(false);

    expect(absent({})).toBe(true);
    expect(absent({ email: "ada@example.com" })).toBe(false);
  });

  it("supports $exists on nested paths", () => {
    const matches = compileFilter({ "profile.bio": { $exists: true } });

    expect(matches({ profile: { bio: "hi" } })).toBe(true);
    expect(matches({ profile: {} })).toBe(false);
    expect(matches({ profile: "text" })).toBe(false);
  });

  it("rejects a non-boolean $exists operand", () => {
    expectStorageError(
      () => compileFilter({ email: { $exists: 1 } }),
      StorageErrorCode.InvalidFilter,
    );
  });

  it("supports $and", () => {
    const matches = compileFilter({
      $and: [{ age: { $gte: 18 } }, { active: true }],
    });

    expect(matches({ age: 20, active: true })).toBe(true);
    expect(matches({ age: 20, active: false })).toBe(false);
    expect(matches({ age: 10, active: true })).toBe(false);
  });

  it("supports $or", () => {
    const matches = compileFilter({
      $or: [{ role: "admin" }, { age: { $gte: 65 } }],
    });

    expect(matches({ role: "admin", age: 20 })).toBe(true);
    expect(matches({ role: "user", age: 70 })).toBe(true);
    expect(matches({ role: "user", age: 20 })).toBe(false);
  });

  it("supports $nor", () => {
    const matches = compileFilter({
      $nor: [{ role: "admin" }, { banned: true }],
    });

    expect(matches({ role: "user", banned: false })).toBe(true);
    expect(matches({ role: "admin" })).toBe(false);
    expect(matches({ role: "user", banned: true })).toBe(false);
  });

  it("combines logical operators with field conditions", () => {
    const matches = compileFilter({
      active: true,
      $or: [{ role: "admin" }, { role: "owner" }],
    });

    expect(matches({ active: true, role: "owner" })).toBe(true);
    expect(matches({ active: false, role: "owner" })).toBe(false);
    expect(matches({ active: true, role: "user" })).toBe(false);
  });

  it("supports nested logical operators", () => {
    const matches = compileFilter({
      $or: [
        { $and: [{ role: "user" }, { age: { $lt: 13 } }] },
        { role: "admin" },
      ],
    });

    expect(matches({ role: "user", age: 10 })).toBe(true);
    expect(matches({ role: "user", age: 30 })).toBe(false);
    expect(matches({ role: "admin", age: 30 })).toBe(true);
  });

  it("rejects malformed logical operands", () => {
    for (const operator of ["$and", "$or", "$nor"]) {
      expectStorageError(
        () => compileFilter({ [operator]: [] }),
        StorageErrorCode.InvalidFilter,
      );

      expectStorageError(
        () => compileFilter({ [operator]: { a: 1 } }),
        StorageErrorCode.InvalidFilter,
      );

      expectStorageError(
        () => compileFilter({ [operator]: [{ a: 1 }, 5] }),
        StorageErrorCode.InvalidFilter,
      );
    }
  });

  it("rejects unsupported top-level operators", () => {
    expectStorageError(
      () => compileFilter({ $where: "true" }),
      StorageErrorCode.InvalidFilter,
    );
  });

  it("rejects invalid clauses inside logical operators", () => {
    expectStorageError(
      () => compileFilter({ $or: [{ age: { $around: 1 } }] }),
      StorageErrorCode.InvalidFilter,
    );
  });

  it("supports $not", () => {
    const matches = compileFilter({ age: { $not: { $gt: 18 } } });

    expect(matches({ age: 10 })).toBe(true);
    expect(matches({ age: 18 })).toBe(true);
    expect(matches({ age: 30 })).toBe(false);
    expect(matches({})).toBe(true);
    expect(matches({ age: "old" })).toBe(true);
  });

  it("supports $not with multiple operators", () => {
    const matches = compileFilter({
      age: { $not: { $gte: 10, $lt: 20 } },
    });

    expect(matches({ age: 15 })).toBe(false);
    expect(matches({ age: 5 })).toBe(true);
    expect(matches({ age: 25 })).toBe(true);
  });

  it("rejects $not without an operator document", () => {
    expectStorageError(
      () => compileFilter({ age: { $not: 5 } }),
      StorageErrorCode.InvalidFilter,
    );

    expectStorageError(
      () => compileFilter({ age: { $not: {} } }),
      StorageErrorCode.InvalidFilter,
    );

    expectStorageError(
      () => compileFilter({ age: { $not: { value: 5 } } }),
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
