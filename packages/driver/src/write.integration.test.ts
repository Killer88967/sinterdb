import { withTestServer } from "@sinterdb-internal/test-utils";
import { CustomId, WireErrorCode, type DocumentValue } from "sinterdb-protocol";
import { describe, expect, it, vi } from "vitest";

import { SinterClient } from "./client.js";
import type { SinterCollection } from "./collection.js";
import { SinterProtocolError, SinterServerError } from "./errors.js";

interface Person {
  _id: CustomId;
  name: string;
  age: number;
  team: string;
  tags: string[];
  profile?: { level: number };
}

const people = [
  { name: "Ada", age: 36, team: "a", tags: ["math"] },
  { name: "Grace", age: 85, team: "b", tags: ["navy"] },
  { name: "Linus", age: 36, team: "a", tags: [] },
];

type Collection = SinterCollection<Person>;

async function withPeople(
  run: (collection: Collection) => Promise<void>,
): Promise<void> {
  await withTestServer(async ({ uri }) => {
    const client = new SinterClient(`${uri}/application`);

    try {
      await client.connect();

      const collection = client.db().collection<Person>("people");
      await collection.insertMany(people);

      await run(collection);
    } finally {
      await client.close();
    }
  });
}

async function names(collection: Collection): Promise<string[]> {
  return (await collection.find().toArray()).map((person) => person.name);
}

async function expectServerError(
  promise: Promise<unknown>,
  wireCode: number,
  serverErrorName: string,
): Promise<void> {
  const error: unknown = await promise.catch((caught: unknown) => caught);

  expect(error).toBeInstanceOf(SinterServerError);
  expect((error as SinterServerError).wireCode).toBe(wireCode);
  expect((error as SinterServerError).serverErrorName).toBe(serverErrorName);
}

describe("delete integration", () => {
  it("deletes one and many documents", async () => {
    await withPeople(async (collection) => {
      expect(await collection.deleteOne({ team: "a" })).toEqual({
        acknowledged: true,
        deletedCount: 1,
      });
      expect(await names(collection)).toEqual(["Grace", "Linus"]);

      expect(await collection.deleteMany({ age: { $gte: 36 } })).toEqual({
        acknowledged: true,
        deletedCount: 2,
      });
      expect(await names(collection)).toEqual([]);
    });
  });

  it("reports zero deletions", async () => {
    await withPeople(async (collection) => {
      expect(
        (await collection.deleteOne({ name: "Nobody" })).deletedCount,
      ).toBe(0);
    });
  });

  it("returns frozen results", async () => {
    await withPeople(async (collection) => {
      const result = await collection.deleteMany({ team: "zzz" });

      expect(Object.isFrozen(result)).toBe(true);
    });
  });

  it("surfaces invalid filters as server errors", async () => {
    await withPeople(async (collection) => {
      await expectServerError(
        collection.deleteOne({ age: { $around: 1 } } as never),
        WireErrorCode.DocumentValidationFailed,
        "DocumentValidationFailed",
      );
    });
  });
});

describe("replaceOne integration", () => {
  it("replaces a document and keeps its _id", async () => {
    await withPeople(async (collection) => {
      const before = await collection.findOne({ name: "Grace" });
      const result = await collection.replaceOne(
        { name: "Grace" },
        { name: "Hopper", age: 86, team: "b", tags: [] },
      );

      expect(result).toEqual({
        acknowledged: true,
        matchedCount: 1,
        modifiedCount: 1,
        upsertedId: null,
      });

      const after = await collection.findOne({ name: "Hopper" });

      expect(after?._id.equals(before?._id as CustomId)).toBe(true);
      expect(after?.age).toBe(86);
    });
  });

  it("upserts and returns the new _id", async () => {
    await withPeople(async (collection) => {
      const result = await collection.replaceOne(
        { name: "Zed" },
        { name: "Zed", age: 1, team: "z", tags: [] },
        { upsert: true },
      );

      expect(result.matchedCount).toBe(0);
      expect(result.upsertedId).toBeInstanceOf(CustomId);

      const found = await collection.findOne({ name: "Zed" });

      expect(found?._id.equals(result.upsertedId as CustomId)).toBe(true);
    });
  });

  it("rejects a different _id with ImmutableId", async () => {
    await withPeople(async (collection) => {
      await expectServerError(
        collection.replaceOne(
          { name: "Ada" },
          {
            _id: CustomId.generate(),
            name: "X",
            age: 1,
            team: "a",
            tags: [],
          },
        ),
        WireErrorCode.ImmutableId,
        "ImmutableId",
      );
    });
  });
});

describe("update integration", () => {
  it("updates one document with several operators", async () => {
    await withPeople(async (collection) => {
      const result = await collection.updateOne(
        { name: "Ada" },
        {
          $set: { team: "c", "profile.level": 3 },
          $inc: { age: 1 },
          $push: { tags: "logic" },
        },
      );

      expect(result).toEqual({
        acknowledged: true,
        matchedCount: 1,
        modifiedCount: 1,
        upsertedId: null,
      });

      const ada = await collection.findOne({ name: "Ada" });

      expect(ada).toMatchObject({
        team: "c",
        age: 37,
        tags: ["math", "logic"],
        profile: { level: 3 },
      });
    });
  });

  it("updates many documents", async () => {
    await withPeople(async (collection) => {
      const result = await collection.updateMany(
        { age: 36 },
        { $set: { team: "veterans" } },
      );

      expect(result.matchedCount).toBe(2);
      expect(result.modifiedCount).toBe(2);
      expect(
        (await collection.find({ team: "veterans" }).toArray()).map(
          (person) => person.name,
        ),
      ).toEqual(["Ada", "Linus"]);
    });
  });

  it("reports matched but unmodified updates", async () => {
    await withPeople(async (collection) => {
      const result = await collection.updateOne(
        { name: "Ada" },
        { $set: { age: 36 } },
      );

      expect(result.matchedCount).toBe(1);
      expect(result.modifiedCount).toBe(0);
    });
  });

  it("supports $unset, $min, $max, $addToSet and $pull", async () => {
    await withPeople(async (collection) => {
      await collection.updateOne(
        { name: "Ada" },
        {
          $min: { age: 30 },
          $addToSet: { tags: "math" },
          $unset: { team: 1 },
        },
      );

      await collection.updateOne(
        { name: "Ada" },
        { $max: { age: 20 }, $pull: { tags: "math" } },
      );

      const ada = await collection.findOne({ name: "Ada" });

      expect(ada?.age).toBe(30);
      expect(ada?.tags).toEqual([]);
      expect(ada).not.toHaveProperty("team");

      await collection.updateOne({ name: "Ada" }, { $max: { age: 99 } });

      expect((await collection.findOne({ name: "Ada" }))?.age).toBe(99);
    });
  });

  it("rejects two operators on the same path", async () => {
    await withPeople(async (collection) => {
      await expectServerError(
        collection.updateOne(
          { name: "Ada" },
          { $addToSet: { tags: "a" }, $pull: { tags: "b" } },
        ),
        WireErrorCode.InvalidUpdate,
        "InvalidUpdate",
      );
    });
  });

  it("upserts using the filter's equality fields", async () => {
    await withPeople(async (collection) => {
      const result = await collection.updateOne(
        { name: "Zed", team: "z" },
        { $set: { age: 5, tags: [] } },
        { upsert: true },
      );

      expect(result.matchedCount).toBe(0);
      expect(result.upsertedId).toBeInstanceOf(CustomId);

      expect(await collection.findOne({ name: "Zed" })).toMatchObject({
        name: "Zed",
        team: "z",
        age: 5,
      });
    });
  });

  it("does not upsert unless asked", async () => {
    await withPeople(async (collection) => {
      const result = await collection.updateOne(
        { name: "Zed" },
        { $set: { age: 5 } },
      );

      expect(result.matchedCount).toBe(0);
      expect(result.upsertedId).toBeNull();
      expect(await names(collection)).toHaveLength(3);
    });
  });

  it("rejects invalid updates and leaves data unchanged", async () => {
    await withPeople(async (collection) => {
      await expectServerError(
        collection.updateMany({}, { $inc: { name: 1 } } as never),
        WireErrorCode.InvalidUpdate,
        "InvalidUpdate",
      );

      await expectServerError(
        collection.updateOne({}, { name: "plain" } as never),
        WireErrorCode.InvalidUpdate,
        "InvalidUpdate",
      );

      expect(await names(collection)).toEqual(["Ada", "Grace", "Linus"]);
    });
  });

  it("rejects _id changes with ImmutableId", async () => {
    await withPeople(async (collection) => {
      await expectServerError(
        collection.updateOne({}, { $set: { _id: 1 } } as never),
        WireErrorCode.ImmutableId,
        "ImmutableId",
      );
    });
  });
});

describe("write result validation", () => {
  it("rejects malformed server results", async () => {
    const client = new SinterClient("sinterdb://localhost/application");
    const collection = client.db().collection<Person>("people");
    const execute = vi.spyOn(client, "executeCommand");
    const malformedDeletes: DocumentValue[] = [
      null,
      { acknowledged: true },
      { acknowledged: true, deletedCount: -1 },
      { acknowledged: false, deletedCount: 1 },
    ];

    for (const value of malformedDeletes) {
      execute.mockResolvedValueOnce(value);

      await expect(collection.deleteOne({})).rejects.toThrow(
        SinterProtocolError,
      );
    }

    for (const value of [
      {
        acknowledged: true,
        matchedCount: 1,
        modifiedCount: 2,
        upsertedId: null,
      },
      {
        acknowledged: true,
        matchedCount: 1,
        modifiedCount: 1,
        upsertedId: "x",
      },
      {
        acknowledged: true,
        matchedCount: "1",
        modifiedCount: 1,
        upsertedId: null,
      },
    ]) {
      execute.mockResolvedValueOnce(value);

      await expect(
        collection.updateOne({}, { $set: { age: 1 } }),
      ).rejects.toThrow(SinterProtocolError);
    }
  });

  it("only sends upsert when provided", async () => {
    const client = new SinterClient("sinterdb://localhost/application");
    const collection = client.db().collection<Person>("people");
    const execute = vi.spyOn(client, "executeCommand").mockResolvedValue({
      acknowledged: true,
      matchedCount: 0,
      modifiedCount: 0,
      upsertedId: null,
    });

    await collection.updateOne({}, { $set: { age: 1 } });
    await collection.updateOne({}, { $set: { age: 1 } }, { upsert: true });

    expect(execute.mock.calls[0]?.[2]).not.toHaveProperty("upsert");
    expect(execute.mock.calls[1]?.[2]).toHaveProperty("upsert", true);
  });
});
