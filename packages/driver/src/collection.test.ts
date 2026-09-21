import { CustomId } from "sinterdb-protocol";
import { describe, expect, expectTypeOf, it, vi } from "vitest";

import { SinterClient } from "./client.js";
import type {
  EqualityFilter,
  InsertOneResult,
  OptionalId,
  WithId,
} from "./collection.js";
import { SinterProtocolError } from "./errors.js";

interface UserDocument {
  _id: CustomId;
  name: string;
  age: number;
}

describe("SinterCollection", () => {
  it("inserts a typed document", async () => {
    const client = new SinterClient("sinterdb://127.0.0.1/application");
    const users = client.db().collection<UserDocument>("users");
    const insertedId = CustomId.fromHexString(
      "00112233445566778899aabbccddeeff",
    );

    const executeCommand = vi
      .spyOn(client, "executeCommand")
      .mockResolvedValue({
        acknowledged: true,
        insertedId,
      });

    const result = await users.insertOne({
      name: "Ada",
      age: 36,
    });

    expectTypeOf(result).toEqualTypeOf<InsertOneResult>();
    expect(result.acknowledged).toBe(true);
    expect(result.insertedId.equals(insertedId)).toBe(true);

    expect(executeCommand).toHaveBeenCalledWith("application", "insertOne", {
      collection: "users",
      document: {
        name: "Ada",
        age: 36,
      },
    });
  });

  it("accepts a caller-provided CustomId", async () => {
    const client = new SinterClient("sinterdb://127.0.0.1/application");
    const users = client.db().collection<UserDocument>("users");
    const id = CustomId.fromHexString("00112233445566778899aabbccddeeff");

    vi.spyOn(client, "executeCommand").mockResolvedValue({
      acknowledged: true,
      insertedId: id,
    });

    const input: OptionalId<UserDocument> = {
      _id: id,
      name: "Ada",
      age: 36,
    };

    const result = await users.insertOne(input);

    expect(result.insertedId.equals(id)).toBe(true);
  });

  it("rejects malformed insert results", async () => {
    const client = new SinterClient("sinterdb://127.0.0.1/application");
    const users = client.db().collection<UserDocument>("users");

    vi.spyOn(client, "executeCommand").mockResolvedValue({
      acknowledged: true,
      insertedId: "not-a-custom-id",
    });

    await expect(
      users.insertOne({
        name: "Ada",
        age: 36,
      }),
    ).rejects.toBeInstanceOf(SinterProtocolError);
  });

  it("propagates command failures", async () => {
    const client = new SinterClient("sinterdb://127.0.0.1/application");
    const users = client.db().collection<UserDocument>("users");
    const failure = new Error("Insert failed.");

    vi.spyOn(client, "executeCommand").mockRejectedValue(failure);

    await expect(
      users.insertOne({
        name: "Ada",
        age: 36,
      }),
    ).rejects.toBe(failure);
  });

  it("finds a typed document", async () => {
    const client = new SinterClient("sinterdb://127.0.0.1/application");
    const users = client.db().collection<UserDocument>("users");
    const id = CustomId.fromHexString("00112233445566778899aabbccddeeff");

    const executeCommand = vi
      .spyOn(client, "executeCommand")
      .mockResolvedValue({
        document: {
          _id: id,
          name: "Ada",
          age: 36,
        },
      });

    const filter: EqualityFilter<UserDocument> = {
      name: "Ada",
    };

    const result = await users.findOne(filter);

    expectTypeOf(result).toEqualTypeOf<WithId<UserDocument> | null>();

    expect(result?.name).toBe("Ada");
    expect(result?.age).toBe(36);
    expect(result?._id.equals(id)).toBe(true);

    expect(executeCommand).toHaveBeenCalledWith("application", "findOne", {
      collection: "users",
      filter: {
        name: "Ada",
      },
    });
  });

  it("returns null when findOne has no match", async () => {
    const client = new SinterClient("sinterdb://127.0.0.1/application");
    const users = client.db().collection<UserDocument>("users");

    vi.spyOn(client, "executeCommand").mockResolvedValue({
      document: null,
    });

    await expect(
      users.findOne({
        name: "missing",
      }),
    ).resolves.toBeNull();
  });

  it("uses an empty filter by default", async () => {
    const client = new SinterClient("sinterdb://127.0.0.1/application");
    const users = client.db().collection<UserDocument>("users");

    const executeCommand = vi
      .spyOn(client, "executeCommand")
      .mockResolvedValue({
        document: null,
      });

    await users.findOne();

    expect(executeCommand).toHaveBeenCalledWith("application", "findOne", {
      collection: "users",
      filter: {},
    });
  });

  it("rejects malformed findOne results", async () => {
    const client = new SinterClient("sinterdb://127.0.0.1/application");
    const users = client.db().collection<UserDocument>("users");

    vi.spyOn(client, "executeCommand").mockResolvedValue({
      document: {
        name: "Ada",
        age: 36,
      },
    });

    await expect(
      users.findOne({
        name: "Ada",
      }),
    ).rejects.toBeInstanceOf(SinterProtocolError);
  });
});
