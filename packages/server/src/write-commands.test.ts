import { CustomId, WireErrorCode } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { InMemoryCatalog } from "./catalog.js";
import {
  CommandDispatcher,
  CommandExecutionError,
} from "./command-dispatcher.js";

type Result = Record<string, unknown>;

function setup(): CommandDispatcher {
  const dispatcher = new CommandDispatcher(new InMemoryCatalog());

  dispatcher.dispatch({
    command: "insertMany",
    database: "app",
    parameters: {
      collection: "users",
      documents: [
        { name: "Ada", age: 36, team: "a" },
        { name: "Grace", age: 85, team: "b" },
        { name: "Linus", age: 36, team: "a" },
      ],
    },
  });

  return dispatcher;
}

function run(
  dispatcher: CommandDispatcher,
  command: string,
  parameters: Record<string, unknown>,
  database = "app",
): Result {
  return dispatcher.dispatch({
    command,
    database,
    parameters: { collection: "users", ...parameters } as never,
  }) as Result;
}

function names(dispatcher: CommandDispatcher): unknown[] {
  const result = run(dispatcher, "find", { filter: {} }) as {
    documents: { name: unknown }[];
  };

  return result.documents.map((document) => document.name);
}

function expectWireError(
  action: () => unknown,
  code: number,
  name?: string,
): void {
  try {
    action();
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(CommandExecutionError);
    expect((error as CommandExecutionError).code).toBe(code);

    if (name !== undefined) {
      expect((error as CommandExecutionError).name).toBe(name);
    }

    return;
  }

  throw new Error(`Expected wire error ${code}.`);
}

describe("deleteOne and deleteMany commands", () => {
  it("deletes one document", () => {
    const dispatcher = setup();

    expect(run(dispatcher, "deleteOne", { filter: { team: "a" } })).toEqual({
      acknowledged: true,
      deletedCount: 1,
    });
    expect(names(dispatcher)).toEqual(["Grace", "Linus"]);
  });

  it("deletes many documents", () => {
    const dispatcher = setup();

    expect(run(dispatcher, "deleteMany", { filter: { age: 36 } })).toEqual({
      acknowledged: true,
      deletedCount: 2,
    });
    expect(names(dispatcher)).toEqual(["Grace"]);
  });

  it("reports zero for a missing collection and does not create it", () => {
    const dispatcher = setup();

    expect(run(dispatcher, "deleteMany", { filter: {} }, "other")).toEqual({
      acknowledged: true,
      deletedCount: 0,
    });

    const listed = dispatcher.dispatch({
      command: "listDatabases",
      parameters: {},
    }) as { databases: string[] };

    expect(listed.databases).toEqual(["app"]);
  });

  it("validates the filter even for a missing collection", () => {
    expectWireError(
      () =>
        run(setup(), "deleteOne", { filter: { a: { $around: 1 } } }, "other"),
      WireErrorCode.DocumentValidationFailed,
    );
  });

  it("requires a filter document", () => {
    expectWireError(
      () => run(setup(), "deleteOne", {}),
      WireErrorCode.InvalidRequest,
    );
  });
});

describe("replaceOne command", () => {
  it("replaces a document", () => {
    const dispatcher = setup();
    const result = run(dispatcher, "replaceOne", {
      filter: { name: "Grace" },
      replacement: { name: "Hopper" },
    });

    expect(result).toEqual({
      acknowledged: true,
      matchedCount: 1,
      modifiedCount: 1,
      upsertedId: null,
    });
    expect(names(dispatcher)).toEqual(["Ada", "Hopper", "Linus"]);
  });

  it("upserts and creates the collection", () => {
    const dispatcher = setup();
    const result = run(
      dispatcher,
      "replaceOne",
      { filter: { name: "Zed" }, replacement: { name: "Zed" }, upsert: true },
      "fresh",
    );

    expect(result["matchedCount"]).toBe(0);
    expect(result["upsertedId"]).toBeInstanceOf(CustomId);
  });

  it("does not create a collection without upsert", () => {
    expect(
      run(
        setup(),
        "replaceOne",
        { filter: { name: "Zed" }, replacement: { name: "Zed" } },
        "fresh",
      ),
    ).toEqual({
      acknowledged: true,
      matchedCount: 0,
      modifiedCount: 0,
      upsertedId: null,
    });
  });

  it("maps a different _id to ImmutableId", () => {
    expectWireError(
      () =>
        run(setup(), "replaceOne", {
          filter: { name: "Ada" },
          replacement: { _id: CustomId.generate(), name: "X" },
        }),
      WireErrorCode.ImmutableId,
      "ImmutableId",
    );
  });

  it("maps operator replacements to DocumentValidationFailed", () => {
    expectWireError(
      () =>
        run(setup(), "replaceOne", {
          filter: { name: "Ada" },
          replacement: { $set: { a: 1 } },
        }),
      WireErrorCode.DocumentValidationFailed,
    );
  });

  it("requires a replacement document and a boolean upsert", () => {
    expectWireError(
      () => run(setup(), "replaceOne", { filter: {} }),
      WireErrorCode.InvalidRequest,
    );

    expectWireError(
      () =>
        run(setup(), "replaceOne", {
          filter: {},
          replacement: { a: 1 },
          upsert: "yes",
        }),
      WireErrorCode.InvalidRequest,
    );
  });
});

describe("updateOne and updateMany commands", () => {
  it("updates one document", () => {
    const dispatcher = setup();

    expect(
      run(dispatcher, "updateOne", {
        filter: { team: "a" },
        update: { $inc: { age: 1 } },
      }),
    ).toEqual({
      acknowledged: true,
      matchedCount: 1,
      modifiedCount: 1,
      upsertedId: null,
    });
  });

  it("updates many documents", () => {
    const dispatcher = setup();

    expect(
      run(dispatcher, "updateMany", {
        filter: { age: 36 },
        update: { $set: { vip: true } },
      }),
    ).toMatchObject({ matchedCount: 2, modifiedCount: 2 });
  });

  it("upserts with a generated _id", () => {
    const result = run(setup(), "updateOne", {
      filter: { name: "Zed" },
      update: { $set: { age: 1 } },
      upsert: true,
    });

    expect(result["matchedCount"]).toBe(0);
    expect(result["upsertedId"]).toBeInstanceOf(CustomId);
  });

  it("reports no match for a missing collection", () => {
    expect(
      run(
        setup(),
        "updateMany",
        { filter: {}, update: { $set: { a: 1 } } },
        "other",
      ),
    ).toMatchObject({ matchedCount: 0, modifiedCount: 0, upsertedId: null });
  });

  it("validates the update even for a missing collection", () => {
    expectWireError(
      () =>
        run(
          setup(),
          "updateOne",
          { filter: {}, update: { name: "not an operator" } },
          "other",
        ),
      WireErrorCode.InvalidUpdate,
      "InvalidUpdate",
    );
  });

  it("maps invalid updates to InvalidUpdate", () => {
    for (const update of [
      {},
      { name: "x" },
      { $rename: { a: "b" } },
      { $inc: { name: 1 } },
      { $set: { a: 1 }, $inc: { a: 1 } },
    ]) {
      expectWireError(
        () => run(setup(), "updateOne", { filter: { name: "Ada" }, update }),
        WireErrorCode.InvalidUpdate,
      );
    }
  });

  it("maps _id changes to ImmutableId", () => {
    expectWireError(
      () =>
        run(setup(), "updateMany", {
          filter: {},
          update: { $set: { _id: 1 } },
        }),
      WireErrorCode.ImmutableId,
    );
  });

  it("is all-or-nothing for updateMany", () => {
    const dispatcher = setup();

    run(dispatcher, "updateOne", {
      filter: { name: "Linus" },
      update: { $set: { age: "old" } },
    });

    expectWireError(
      () =>
        run(dispatcher, "updateMany", {
          filter: {},
          update: { $inc: { age: 1 } },
        }),
      WireErrorCode.InvalidUpdate,
    );

    const found = run(dispatcher, "find", { filter: {} }) as {
      documents: { age: unknown }[];
    };

    expect(found.documents.map((document) => document.age)).toEqual([
      36,
      85,
      "old",
    ]);
  });

  it("requires filter and update documents", () => {
    expectWireError(
      () => run(setup(), "updateOne", { update: { $set: { a: 1 } } }),
      WireErrorCode.InvalidRequest,
    );

    expectWireError(
      () => run(setup(), "updateOne", { filter: {} }),
      WireErrorCode.InvalidRequest,
    );
  });
});
