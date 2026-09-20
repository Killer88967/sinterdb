import type { Document } from "sinterdb-protocol";

import type { SinterDatabase } from "./database.js";
import { validateCollectionName } from "./namespace.js";

export class SinterCollection<TDocument extends object = Document> {
  declare protected readonly documentType: TDocument;

  public readonly name: string;

  public constructor(
    public readonly database: SinterDatabase,
    name: string,
  ) {
    validateCollectionName(name);
    this.name = name;
  }

  public get namespace(): string {
    return `${this.database.name}.${this.name}`;
  }
}
