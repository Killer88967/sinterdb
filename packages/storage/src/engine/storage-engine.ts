import { existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import {
  InMemoryCollection,
  type CollectionJournal,
  type JournalOperation,
} from "../in-memory-collection.js";
import {
  StorageCorruptionError,
  StorageError,
  StorageErrorCode,
} from "../errors.js";
import {
  WriteAheadLog,
  type DurabilityMode,
  type WalRecord,
} from "../wal/index.js";
import { writeFileAtomic } from "./files.js";
import { acquireDirectoryLock, type DirectoryLock } from "./lock.js";
import {
  RecordType,
  decodeOperations,
  encodeOperations,
  type Operation,
} from "./operations.js";

export const STORAGE_FORMAT = "sinterdb-data";
export const STORAGE_FORMAT_VERSION = 1;

export interface StorageEngineOptions {
  readonly directory: string;
  readonly durability?: DurabilityMode;
  readonly segmentSizeBytes?: number;
}

interface Manifest {
  readonly format: string;
  readonly formatVersion: number;
  readonly createdAt: string;
}

const SUBDIRECTORIES = ["wal", "segments", "indexes", "checkpoints"] as const;

export class StorageEngine {
  private readonly databases = new Map<
    string,
    Map<string, InMemoryCollection>
  >();
  private closed = false;

  private constructor(
    private readonly root: string,
    private readonly log: WriteAheadLog,
    private readonly lock: DirectoryLock,
  ) {}

  public static open(options: StorageEngineOptions): StorageEngine {
    const root = options.directory;

    mkdirSync(root, { recursive: true });

    const lock = acquireDirectoryLock(join(root, "LOCK"));

    try {
      for (const name of SUBDIRECTORIES) {
        mkdirSync(join(root, name), { recursive: true });
      }

      prepareManifest(root);

      const log = WriteAheadLog.open({
        directory: join(root, "wal"),
        ...(options.durability === undefined
          ? {}
          : { durability: options.durability }),
        ...(options.segmentSizeBytes === undefined
          ? {}
          : { segmentSizeBytes: options.segmentSizeBytes }),
      });

      try {
        const engine = new StorageEngine(root, log, lock);

        engine.replay();

        return engine;
      } catch (error: unknown) {
        log.close();

        throw error;
      }
    } catch (error: unknown) {
      lock.release();

      throw error;
    }
  }

  public get directory(): string {
    return this.root;
  }

  public get durability(): DurabilityMode {
    return this.log.durability;
  }

  public get lastLsn(): bigint {
    return this.log.lastLsn;
  }

  public listDatabases(): string[] {
    return [...this.databases.keys()].sort();
  }

  public listCollections(database: string): string[] {
    return [...(this.databases.get(database)?.keys() ?? [])].sort();
  }

  public getCollection(
    database: string,
    collection: string,
  ): InMemoryCollection | undefined {
    return this.databases.get(database)?.get(collection);
  }

  /**
   * Returns the collection, creating and journaling it first when it does not
   * exist yet.
   */
  public openCollection(
    database: string,
    collection: string,
  ): InMemoryCollection {
    const existing = this.getCollection(database, collection);

    if (existing !== undefined) {
      return existing;
    }

    this.append([{ kind: "createCollection", database, collection }]);

    return this.register(database, collection, new Map());
  }

  public close(): void {
    if (this.closed) {
      return;
    }

    this.closed = true;

    try {
      this.log.close();
    } finally {
      this.lock.release();
    }
  }

  private register(
    database: string,
    collection: string,
    documents: Map<string, Uint8Array>,
  ): InMemoryCollection {
    const journal: CollectionJournal = {
      commit: (operations) => {
        this.append(
          operations.map((operation) =>
            toOperation(database, collection, operation),
          ),
        );
      },
    };

    const created = new InMemoryCollection({ journal, documents });
    let collections = this.databases.get(database);

    if (collections === undefined) {
      collections = new Map();
      this.databases.set(database, collections);
    }

    collections.set(collection, created);

    return created;
  }

  private append(operations: readonly Operation[]): void {
    if (this.closed) {
      throw new StorageError(
        StorageErrorCode.Closed,
        "The storage engine is closed.",
      );
    }

    this.log.append(RecordType.Transaction, encodeOperations(operations));
  }

  private replay(): void {
    const recovered = new Map<string, Map<string, Map<string, Uint8Array>>>();

    for (const record of this.log.records()) {
      let operations: Operation[];

      if (record.type !== RecordType.Transaction) {
        throw this.corrupt(
          record,
          `It has unknown record type ${record.type}. The data was probably written by a newer version of SinterDB.`,
        );
      }

      try {
        operations = decodeOperations(record.payload);
      } catch (error: unknown) {
        throw this.corrupt(record, (error as Error).message);
      }

      for (const operation of operations) {
        this.applyRecovered(recovered, operation, record);
      }
    }

    for (const [database, collections] of recovered) {
      for (const [collection, documents] of collections) {
        this.register(database, collection, documents);
      }
    }
  }

  private applyRecovered(
    recovered: Map<string, Map<string, Map<string, Uint8Array>>>,
    operation: Operation,
    record: WalRecord,
  ): void {
    if (operation.kind === "createCollection") {
      let collections = recovered.get(operation.database);

      if (collections === undefined) {
        collections = new Map();
        recovered.set(operation.database, collections);
      }

      if (!collections.has(operation.collection)) {
        collections.set(operation.collection, new Map());
      }

      return;
    }

    const documents = recovered
      .get(operation.database)
      ?.get(operation.collection);

    if (documents === undefined) {
      throw this.corrupt(
        record,
        `It refers to collection "${operation.database}.${operation.collection}", which was never created.`,
      );
    }

    const key = Buffer.from(operation.id).toString("hex");

    if (operation.kind === "put") {
      documents.set(key, operation.document);
    } else {
      documents.delete(key);
    }
  }

  private corrupt(record: WalRecord, reason: string): StorageCorruptionError {
    const directory = join(this.root, "wal");

    return new StorageCorruptionError(
      `The write-ahead log in ${directory} contains an unusable record (log sequence number ${record.lsn}): ${reason} Restore the data directory from a backup, or open it with the SinterDB version that wrote it.`,
      { file: directory, offset: 0, lsn: record.lsn },
    );
  }
}

function toOperation(
  database: string,
  collection: string,
  operation: JournalOperation,
): Operation {
  const id = Buffer.from(operation.key, "hex");

  return operation.kind === "put"
    ? { kind: "put", database, collection, id, document: operation.document }
    : { kind: "delete", database, collection, id };
}

function prepareManifest(root: string): void {
  const path = join(root, "manifest.json");

  if (!existsSync(path)) {
    if (hasLogData(root)) {
      throw new StorageCorruptionError(
        `The data directory ${root} contains write-ahead log files but no manifest.json. Restore manifest.json from a backup; do not start the server on this directory until it is restored.`,
        { file: path, offset: 0 },
      );
    }

    const manifest: Manifest = {
      format: STORAGE_FORMAT,
      formatVersion: STORAGE_FORMAT_VERSION,
      createdAt: new Date().toISOString(),
    };

    writeFileAtomic(root, path, `${JSON.stringify(manifest, null, 2)}\n`);

    return;
  }

  let manifest: Partial<Manifest>;

  try {
    manifest = JSON.parse(readFileSync(path, "utf8")) as Partial<Manifest>;
  } catch (error: unknown) {
    throw new StorageCorruptionError(
      `The manifest ${path} is not valid JSON: ${(error as Error).message}. Restore it from a backup.`,
      { file: path, offset: 0 },
    );
  }

  if (manifest.format !== STORAGE_FORMAT) {
    throw new StorageError(
      StorageErrorCode.UnsupportedFormat,
      `The directory ${root} is not a SinterDB data directory (manifest format is ${JSON.stringify(manifest.format)}).`,
    );
  }

  if (typeof manifest.formatVersion !== "number") {
    throw new StorageCorruptionError(
      `The manifest ${path} has no valid format version.`,
      { file: path, offset: 0 },
    );
  }

  if (manifest.formatVersion > STORAGE_FORMAT_VERSION) {
    throw new StorageError(
      StorageErrorCode.UnsupportedFormat,
      `The data directory uses storage format version ${manifest.formatVersion}, but this version of SinterDB only supports up to version ${STORAGE_FORMAT_VERSION}. Upgrade SinterDB to open it.`,
    );
  }
}

function hasLogData(root: string): boolean {
  const wal = join(root, "wal");

  return (
    existsSync(wal) && readdirSync(wal).some((name) => name.endsWith(".wal"))
  );
}
