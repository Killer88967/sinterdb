import { withTestServer } from "@sinterdb-internal/test-utils";
import { CustomId } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { SinterClient } from "./client.js";
import { SinterServerError } from "./errors.js";

interface Person {
  _id: CustomId;
  name: string;
  age: number;
  profile: { level: number };
}

const people = [
  { name: "Ada", age: 36, profile: { level: 2 } },
  { name: "Grace", age: 85, profile: { level: 3 } },
  { name: "Katherine", age: 101, profile: { level: 1 } },
  { name: "Linus", age: 36, profile: { level: 4 } },
  { name: "Margaret", age: 40, profile: { level: 5 } },
];

describe("find options integration", () => {
  it("sorts by multiple keys, skips and limits across batches", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        const collection = client.db().collection<Person>("people");
        await collection.insertMany(people);

        const result = await collection
          .find(
            {},
            {
              sort: [
                ["age", -1],
                ["name", 1],
              ],
              skip: 1,
              limit: 3,
              batchSize: 2,
            },
          )
          .toArray();

        expect(result.map((person) => person.name)).toEqual([
          "Grace",
          "Margaret",
          "Ada",
        ]);
      } finally {
        await client.close();
      }
    });
  });

  it("sorts by nested paths and combines with filters", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        const collection = client.db().collection<Person>("people");
        await collection.insertMany(people);

        const result = await collection
          .find({ age: { $lt: 100 } }, { sort: [["profile.level", -1]] })
          .toArray();

        expect(result.map((person) => person.name)).toEqual([
          "Margaret",
          "Linus",
          "Grace",
          "Ada",
        ]);
      } finally {
        await client.close();
      }
    });
  });

  it("returns server errors for invalid options", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        const collection = client.db().collection<Person>("people");
        await collection.insertMany(people);

        await expect(
          collection.find({}, { limit: 0 }).toArray(),
        ).rejects.toThrow(SinterServerError);

        await expect(
          collection.find({}, { skip: -1 }).toArray(),
        ).rejects.toThrow(SinterServerError);
      } finally {
        await client.close();
      }
    });
  });
});
