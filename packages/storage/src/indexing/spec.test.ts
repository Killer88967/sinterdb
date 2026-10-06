import { describe, expect, it } from "vitest";

import { StorageError, StorageErrorCode } from "../errors.js";
import {
  idIndexSpec,
  normalizeIndexSpec,
  sameDefinition,
  type CreateIndexInput,
} from "./spec.js";

function expectInvalid(input: unknown): void {
  try {
    normalizeIndexSpec(input as CreateIndexInput);
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(StorageError);
    expect((error as StorageError).code).toBe(StorageErrorCode.InvalidIndex);

    return;
  }

  throw new Error("Expected an invalid index error.");
}

describe("normalizeIndexSpec", () => {
  it("fills in defaults", () => {
    expect(normalizeIndexSpec({ field: "email" })).toEqual({
      name: "email_1",
      field: "email",
      direction: 1,
      unique: false,
      sparse: false,
    });
  });

  it("keeps explicit options", () => {
    expect(
      normalizeIndexSpec({
        field: "profile.level",
        direction: -1,
        unique: true,
        sparse: true,
        name: "by_level",
      }),
    ).toEqual({
      name: "by_level",
      field: "profile.level",
      direction: -1,
      unique: true,
      sparse: true,
    });
  });

  it("names indexes after the field and direction", () => {
    expect(normalizeIndexSpec({ field: "a.b", direction: -1 }).name).toBe(
      "a.b_-1",
    );
  });

  it("rejects invalid fields", () => {
    for (const field of [
      "",
      "a..b",
      ".a",
      "a.",
      "$a",
      "a.$b",
      "__proto__",
      5,
    ]) {
      expectInvalid({ field });
    }

    expectInvalid({});
  });

  it("rejects indexes on _id", () => {
    expectInvalid({ field: "_id" });
    expectInvalid({ field: "_id.x" });
  });

  it("rejects invalid options and names", () => {
    expectInvalid({ field: "a", direction: 2 });
    expectInvalid({ field: "a", direction: "asc" });
    expectInvalid({ field: "a", unique: "yes" });
    expectInvalid({ field: "a", sparse: 1 });
    expectInvalid({ field: "a", name: "" });
    expectInvalid({ field: "a", name: "x".repeat(128) });
    expectInvalid({ field: "a", name: "bad\nname" });
    expectInvalid({ field: "a", name: "_id_" });
    expectInvalid(null);
    expectInvalid("a");
    expectInvalid([]);
  });

  it("compares definitions without the name", () => {
    const left = normalizeIndexSpec({ field: "a", name: "one" });
    const right = normalizeIndexSpec({ field: "a", name: "two" });
    const different = normalizeIndexSpec({ field: "a", unique: true });

    expect(sameDefinition(left, right)).toBe(true);
    expect(sameDefinition(left, different)).toBe(false);
  });

  it("describes the _id index", () => {
    expect(idIndexSpec()).toEqual({
      name: "_id_",
      field: "_id",
      direction: 1,
      unique: true,
      sparse: false,
    });
  });
});
