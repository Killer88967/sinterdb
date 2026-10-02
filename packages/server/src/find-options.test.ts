import { WireErrorCode } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { InMemoryCatalog } from "./catalog.js";
import {
  CommandDispatcher,
  CommandExecutionError,
} from "./command-dispatcher.js";

function setup(): CommandDispatcher {
  const catalog = new InMemoryCatalog();
  const dispatcher = new CommandDispatcher(catalog);

  dispatcher.dispatch({
    command: "insertMany",
    database: "app",
    parameters: {
      collection: "users",
      documents: [
        { name: "Ada", age: 36 },
        { name: "Grace", age: 85 },
        { name: "Katherine", age: 101 },
        { name: "Linus", age: 36 },
      ],
    },
  });

  return dispatcher;
}

function find(
  dispatcher: CommandDispatcher,
  parameters: Record<string, unknown>,
): { cursorId: number | null; documents: { name: string }[] } {
  return dispatcher.dispatch({
    command: "find",
    database: "app",
    parameters: {
      collection: "users",
      filter: {},
      ...parameters,
    } as never,
  }) as never;
}

function expectWireError(action: () => unknown, code: number): void {
  try {
    action();
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(CommandExecutionError);
    expect((error as CommandExecutionError).code).toBe(code);

    return;
  }

  throw new Error(`Expected wire error ${code}.`);
}

describe("find command options", () => {
  it("sorts, skips and limits", () => {
    const result = find(setup(), {
      sort: [["age", -1]],
      skip: 1,
      limit: 2,
    });

    expect(result.documents.map((document) => document.name)).toEqual([
      "Grace",
      "Ada",
    ]);
  });

  it("rejects malformed skip, limit and sort parameters", () => {
    const dispatcher = setup();

    for (const parameters of [
      { skip: -1 },
      { skip: 1.5 },
      { skip: "1" },
      { limit: 0 },
      { limit: "5" },
      { sort: { age: 1 } },
      { sort: "age" },
    ]) {
      expectWireError(
        () => find(dispatcher, parameters),
        WireErrorCode.InvalidRequest,
      );
    }
  });

  it("rejects invalid sort contents as document validation failures", () => {
    expectWireError(
      () => find(setup(), { sort: [["age", 2]] }),
      WireErrorCode.DocumentValidationFailed,
    );
  });
});
