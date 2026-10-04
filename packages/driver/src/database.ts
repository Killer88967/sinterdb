import type { Document } from "sinterdb-protocol";
import type { SinterClient } from "./client.js";
import { SinterCollection } from "./collection.js";
import { parseNameList } from "./list-result.js";
import { validateDatabaseName } from "./namespace.js";

export class SinterDatabase {
  public readonly name: string;

  public constructor(
    public readonly client: SinterClient,
    name: string,
  ) {
    validateDatabaseName(name);
    this.name = name;
  }

  public collection<TDocument extends object = Document>(
    name: string,
  ): SinterCollection<TDocument> {
    return new SinterCollection<TDocument>(this, name);
  }

  public async listCollections(): Promise<string[]> {
    const value = await this.client.executeCommand(
      this.name,
      "listCollections",
      {},
    );

    return parseNameList(value, "collections", "listCollections");
  }
}
