import { parseArgs } from "node:util";

import { SinterError } from "sinterdb";

import { DuplicateTodoError, TodoStore, type Todo } from "./todos.ts";

const USAGE = `Usage: node src/main.ts <command> [options]

Commands:
  add <title> [--priority <1-9>] [--tag <tag>]...   Add an item
  list [--all] [--tag <tag>] [--limit <n>]          Show open items
  done <title>                                      Mark an item done
  priority <title> <1-9>                            Change an item's priority
  tag <title> <tag>                                 Add a tag to an item
  remove <title>                                    Delete an item
  clear                                             Delete every finished item
  stats                                             Count open and done items

Environment:
  SINTERDB_URL   Where the server is. Default: sinterdb://127.0.0.1:4721/todo
`;

const DEFAULT_URL = "sinterdb://127.0.0.1:4721/todo";

class UsageError extends Error {}

function parsePriority(value: string): number {
  const priority = Number(value);

  if (!Number.isInteger(priority) || priority < 1 || priority > 9) {
    throw new UsageError("The priority must be a whole number from 1 to 9.");
  }

  return priority;
}

function describe(todo: Todo): string {
  const tags = todo.tags.length === 0 ? "" : `  #${todo.tags.join(" #")}`;

  return `[${todo.done ? "x" : " "}] P${todo.priority}  ${todo.title}${tags}`;
}

async function run(argv: string[], store: TodoStore): Promise<number> {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      priority: { type: "string" },
      tag: { type: "string", multiple: true },
      all: { type: "boolean" },
      limit: { type: "string" },
    },
  });
  const [command, first, second] = positionals;

  switch (command) {
    case "add": {
      if (first === undefined) {
        throw new UsageError("add needs a title.");
      }

      const priority =
        values.priority === undefined
          ? undefined
          : parsePriority(values.priority);

      await store.add(first, priority, values.tag ?? []);
      console.log(`Added "${first}".`);
      return 0;
    }

    case "list": {
      const limit =
        values.limit === undefined ? undefined : Number(values.limit);

      if (limit !== undefined && (!Number.isInteger(limit) || limit < 1)) {
        throw new UsageError("--limit must be a positive whole number.");
      }

      const todos = await store.list({
        all: values.all === true,
        ...(values.tag?.[0] === undefined ? {} : { tag: values.tag[0] }),
        ...(limit === undefined ? {} : { limit }),
      });

      if (todos.length === 0) {
        console.log("Nothing to do.");
      }

      for (const todo of todos) {
        console.log(describe(todo));
      }

      return 0;
    }

    case "done": {
      if (first === undefined) {
        throw new UsageError("done needs a title.");
      }

      if (await store.complete(first)) {
        console.log(`Finished "${first}".`);
        return 0;
      }

      console.error(`No open item titled "${first}".`);
      return 1;
    }

    case "priority": {
      if (first === undefined || second === undefined) {
        throw new UsageError("priority needs a title and a number.");
      }

      if (await store.reprioritize(first, parsePriority(second))) {
        console.log(`"${first}" is now priority ${second}.`);
        return 0;
      }

      console.error(`No item titled "${first}".`);
      return 1;
    }

    case "tag": {
      if (first === undefined || second === undefined) {
        throw new UsageError("tag needs a title and a tag.");
      }

      if (await store.tag(first, second)) {
        console.log(`Tagged "${first}" with #${second}.`);
        return 0;
      }

      console.error(`No item titled "${first}".`);
      return 1;
    }

    case "remove": {
      if (first === undefined) {
        throw new UsageError("remove needs a title.");
      }

      if (await store.remove(first)) {
        console.log(`Removed "${first}".`);
        return 0;
      }

      console.error(`No item titled "${first}".`);
      return 1;
    }

    case "clear": {
      const removed = await store.clearDone();

      console.log(
        `Removed ${removed} finished ${removed === 1 ? "item" : "items"}.`,
      );
      return 0;
    }

    case "stats": {
      const { total, open, done } = await store.summary();

      console.log(`${total} total, ${open} open, ${done} done.`);
      return 0;
    }

    default:
      throw new UsageError(
        command === undefined
          ? "Choose a command."
          : `Unknown command "${command}".`,
      );
  }
}

async function main(): Promise<number> {
  const argv = process.argv.slice(2);

  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    console.log(USAGE);
    return argv.length === 0 ? 2 : 0;
  }

  let store: TodoStore;

  try {
    store = await TodoStore.open(process.env["SINTERDB_URL"] ?? DEFAULT_URL);
  } catch (error: unknown) {
    console.error(
      `Cannot reach SinterDB: ${error instanceof Error ? error.message : String(error)}`,
    );
    return 1;
  }

  try {
    return await run(argv, store);
  } catch (error: unknown) {
    if (error instanceof UsageError) {
      console.error(`${error.message}\n\n${USAGE}`);
      return 2;
    }

    if (error instanceof DuplicateTodoError) {
      console.error(error.message);
      return 1;
    }

    if (error instanceof SinterError) {
      console.error(`SinterDB error (${error.code}): ${error.message}`);
      return 1;
    }

    throw error;
  } finally {
    await store.close();
  }
}

process.exitCode = await main();
