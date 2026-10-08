import {
  SinterClient,
  SinterServerError,
  type CustomId,
  type SinterCollection,
  type WithId,
} from "sinterdb";

/** A to-do item as stored in the `todos` collection. */
export interface Todo {
  title: string;
  done: boolean;
  /** 1 is the most urgent. */
  priority: number;
  tags: string[];
  createdAt: Date;
  completedAt?: Date;
}

export interface Summary {
  readonly total: number;
  readonly open: number;
  readonly done: number;
}

export interface ListOptions {
  /** Include finished items. They are hidden by default. */
  readonly all?: boolean;
  /** Only items that carry this tag. */
  readonly tag?: string;
  /** At most this many items. */
  readonly limit?: number;
}

/** Thrown when an item with the same title already exists. */
export class DuplicateTodoError extends Error {
  public constructor(title: string, options?: ErrorOptions) {
    super(`There is already a to-do titled "${title}".`, options);
    this.name = "DuplicateTodoError";
  }
}

/**
 * Everything the app does with the database lives here: connect, index,
 * insert, query, update, delete.
 */
export class TodoStore {
  private readonly client: SinterClient;
  private readonly todos: SinterCollection<Todo>;

  // Node runs this file by stripping its types, which cannot express
  // constructor parameter properties, so the fields are assigned by hand.
  private constructor(client: SinterClient, todos: SinterCollection<Todo>) {
    this.client = client;
    this.todos = todos;
  }

  /**
   * Connects and makes sure the indexes exist. Creating an index that already
   * exists is not an error, so this is safe to run on every start.
   */
  public static async open(connectionString: string): Promise<TodoStore> {
    const client = new SinterClient(connectionString);

    // Without a listener, a connection error after startup would be silent.
    client.on("error", (error) => {
      console.error(`SinterDB connection error: ${error.message}`);
    });

    await client.connect();

    try {
      const todos = client.db().collection<Todo>("todos");

      // Titles are unique, and the list is read in priority order.
      await todos.createIndex({ field: "title", unique: true });
      await todos.createIndex({ field: "priority" });

      return new TodoStore(client, todos);
    } catch (error: unknown) {
      await client.close();
      throw error;
    }
  }

  public async add(
    title: string,
    priority = 3,
    tags: string[] = [],
  ): Promise<CustomId> {
    try {
      const { insertedId } = await this.todos.insertOne({
        title,
        done: false,
        priority,
        tags,
        createdAt: new Date(),
      });

      return insertedId;
    } catch (error: unknown) {
      // The unique index on `title` rejects a second item with the same title.
      if (
        error instanceof SinterServerError &&
        error.serverErrorName === "DuplicateKey"
      ) {
        throw new DuplicateTodoError(title, { cause: error });
      }

      throw error;
    }
  }

  /** Items in priority order, then oldest first. */
  public async list(options: ListOptions = {}): Promise<WithId<Todo>[]> {
    const filter = {
      ...(options.all === true ? {} : { done: false }),
      ...(options.tag === undefined ? {} : { tags: { $in: [options.tag] } }),
    };

    return this.todos
      .find(filter, {
        sort: [
          ["priority", 1],
          ["createdAt", 1],
        ],
        ...(options.limit === undefined ? {} : { limit: options.limit }),
      })
      .toArray();
  }

  /** Marks an item done. Returns false when there is no open item by that title. */
  public async complete(title: string): Promise<boolean> {
    const result = await this.todos.updateOne(
      { title, done: false },
      { $set: { done: true, completedAt: new Date() } },
    );

    return result.modifiedCount === 1;
  }

  /** Changes an item's priority. Returns false when the title is unknown. */
  public async reprioritize(title: string, priority: number): Promise<boolean> {
    const result = await this.todos.updateOne(
      { title },
      { $set: { priority } },
    );

    return result.matchedCount === 1;
  }

  public async tag(title: string, tag: string): Promise<boolean> {
    // $addToSet keeps the list free of duplicates.
    const result = await this.todos.updateOne(
      { title },
      { $addToSet: { tags: tag } },
    );

    return result.matchedCount === 1;
  }

  public async remove(title: string): Promise<boolean> {
    const result = await this.todos.deleteOne({ title });

    return result.deletedCount === 1;
  }

  /** Removes every finished item and returns how many there were. */
  public async clearDone(): Promise<number> {
    const result = await this.todos.deleteMany({ done: true });

    return result.deletedCount;
  }

  public async summary(): Promise<Summary> {
    let total = 0;
    let done = 0;

    // Iterating a cursor fetches documents in batches, so this works however
    // large the collection grows.
    for await (const todo of this.todos.find()) {
      total += 1;

      if (todo.done) {
        done += 1;
      }
    }

    return { total, open: total - done, done };
  }

  public async close(): Promise<void> {
    await this.client.close();
  }
}
