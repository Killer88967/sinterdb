import { CustomId, type Document, type DocumentValue } from "sinterdb-protocol";

import { SinterProtocolError } from "./errors.js";
import type { WithId } from "./collection.js";

export type CursorExecutor = (
  command: string,
  parameters: Document,
) => Promise<DocumentValue>;

export class FindCursor<
  TDocument extends object = Document,
> implements AsyncIterable<WithId<TDocument>> {
  private buffer: WithId<TDocument>[] = [];
  private cursorId: number | null | undefined = undefined;
  private closed = false;

  public constructor(
    private readonly execute: CursorExecutor,
    private readonly collection: string,
    private readonly filter: Document,
    private readonly batchSize: number | undefined,
  ) {}

  public async hasNext(): Promise<boolean> {
    while (this.buffer.length === 0) {
      if (this.closed || this.cursorId === null) {
        return false;
      }

      await this.fetchBatch();
    }

    return true;
  }

  public async next(): Promise<WithId<TDocument> | null> {
    if (!(await this.hasNext())) {
      return null;
    }

    return this.buffer.shift() ?? null;
  }

  public async toArray(): Promise<WithId<TDocument>[]> {
    const results: WithId<TDocument>[] = [];

    try {
      for (let doc = await this.next(); doc !== null; doc = await this.next()) {
        results.push(doc);
      }
    } finally {
      await this.close();
    }

    return results;
  }

  public async close(): Promise<void> {
    if (this.closed) {
      return;
    }

    this.closed = true;
    this.buffer = [];

    const id = this.cursorId;
    this.cursorId = null;

    if (typeof id === "number") {
      await this.execute("closeCursor", { cursorId: id });
    }
  }

  public async *[Symbol.asyncIterator](): AsyncGenerator<
    WithId<TDocument>,
    void,
    undefined
  > {
    try {
      for (let doc = await this.next(); doc !== null; doc = await this.next()) {
        yield doc;
      }
    } finally {
      await this.close();
    }
  }

  private async fetchBatch(): Promise<void> {
    const size =
      this.batchSize === undefined ? {} : { batchSize: this.batchSize };

    const value =
      this.cursorId === undefined
        ? await this.execute("find", {
            collection: this.collection,
            filter: this.filter,
            ...size,
          })
        : await this.execute("getMore", {
            cursorId: this.cursorId as number,
            ...size,
          });

    const batch = parseBatch<TDocument>(value);

    this.cursorId = batch.cursorId;
    this.buffer.push(...batch.documents);
  }
}

function parseBatch<TDocument extends object>(
  value: DocumentValue,
): {
  cursorId: number | null;
  documents: WithId<TDocument>[];
} {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw invalidBatch();
  }

  const record = value as Document;
  const cursorId = record["cursorId"];
  const documents = record["documents"];

  const validCursorId =
    cursorId === null ||
    (typeof cursorId === "number" &&
      Number.isSafeInteger(cursorId) &&
      cursorId > 0);

  if (
    !validCursorId ||
    !Array.isArray(documents) ||
    !documents.every(
      (doc) =>
        typeof doc === "object" &&
        doc !== null &&
        !Array.isArray(doc) &&
        (doc as Document)["_id"] instanceof CustomId,
    )
  ) {
    throw invalidBatch();
  }

  return {
    cursorId: cursorId as number | null,
    documents: documents as unknown as WithId<TDocument>[],
  };
}

function invalidBatch(): SinterProtocolError {
  return new SinterProtocolError(
    "The server returned an invalid cursor batch.",
  );
}
