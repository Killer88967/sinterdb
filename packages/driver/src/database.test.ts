import { describe, expect, expectTypeOf, it } from "vitest";

import { SinterClient } from "./client.js";
import { SinterCollection } from "./collection.js";
import { SinterDatabase } from "./database.js";
import { SinterNamespaceError } from "./namespace.js";

describe("SinterDatabase", () => {
  it("selects the database from the connection string", () => {
    const client = new SinterClient("sinterdb://localhost/application");

    const database = client.db();

    expect(database).toBeInstanceOf(SinterDatabase);
    expect(database.client).toBe(client);
    expect(database.name).toBe("application");
  });

  it("allows an explicit database selection", () => {
    const client = new SinterClient("sinterdb://localhost/default");

    const database = client.db("analytics");

    expect(database.name).toBe("analytics");
  });

  it("allows selecting a database before connecting", () => {
    const client = new SinterClient("sinterdb://localhost/database");

    const database = client.db();

    expect(database.name).toBe("database");
    expect(client.connected).toBe(false);
  });

  it("requires a database name when the URI has none", () => {
    const client = new SinterClient("sinterdb://localhost");

    expect(() => client.db()).toThrow(SinterNamespaceError);
  });

  it.each(["", "   ", "one/two", "one\\two", "one\0two"])(
    "rejects the invalid database name %j",
    (name) => {
      const client = new SinterClient("sinterdb://localhost");

      expect(() => client.db(name)).toThrow(SinterNamespaceError);
    },
  );

  it("creates a collection handle", () => {
    const client = new SinterClient("sinterdb://localhost/application");
    const database = client.db();

    const collection = database.collection("users");

    expect(collection).toBeInstanceOf(SinterCollection);
    expect(collection.database).toBe(database);
    expect(collection.name).toBe("users");
    expect(collection.namespace).toBe("application.users");
  });

  it.each(["", "   ", "users\0archive"])(
    "rejects the invalid collection name %j",
    (name) => {
      const client = new SinterClient("sinterdb://localhost/application");

      expect(() => client.db().collection(name)).toThrow(SinterNamespaceError);
    },
  );

  it("preserves the collection document type", () => {
    interface UserDocument {
      name: string;
      age: number;
    }

    const client = new SinterClient("sinterdb://localhost/application");

    const collection = client.db().collection<UserDocument>("users");

    expectTypeOf(collection).toEqualTypeOf<SinterCollection<UserDocument>>();
  });
});
