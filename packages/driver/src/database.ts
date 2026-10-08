import type { Document } from "sinterdb-protocol";
import type { SinterClient } from "./client.js";
import { SinterCollection } from "./collection.js";
import { parseNameList } from "./list-result.js";
import { validateDatabaseName } from "./namespace.js";

/**
 * A handle to a database on a server.
 *
 * Get one from {@link SinterClient.db}.
 */
export class SinterDatabase {
  /** The database name. */
  public readonly name: string;

  public constructor(
    /** The client this database belongs to. */
    public readonly client: SinterClient,
    name: string,
  ) {
    validateDatabaseName(name);
    this.name = name;
  }

  /**
   * Returns a handle to a collection. No request is sent; the collection is
   * created by the first write.
   *
   * @param name - The collection name.
   * @typeParam TDocument - The shape of the documents, used for
   *   type-checking.
   */
  public collection<TDocument extends object = Document>(
    name: string,
  ): SinterCollection<TDocument> {
    return new SinterCollection<TDocument>(this, name);
  }

  /** Lists the names of the collections in this database. */
  public async listCollections(): Promise<string[]> {
    const value = await this.client.executeCommand(
      this.name,
      "listCollections",
      {},
    );

    return parseNameList(value, "collections", "listCollections");
  }
}
