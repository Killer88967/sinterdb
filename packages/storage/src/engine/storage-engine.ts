import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  unlinkSync,
} from "node:fs";
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
  RECORD_HEADER_SIZE,
  WriteAheadLog,
  type DurabilityMode,
  type WalRecord,
} from "../wal/index.js";
import {
  CheckpointDamagedError,
  listCheckpoints,
  readCheckpoint,
  removeTemporaryCheckpoints,
  writeCheckpoint,
  type CheckpointCollection,
  type CheckpointStage,
  type ReadCheckpoint,
} from "./checkpoint.js";
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

export const DEFAULT_CHECKPOINT_THRESHOLD_BYTES = 64 * 1024 * 1024;

export interface StorageEngineOptions {
  readonly directory: string;
  readonly durability?: DurabilityMode;
  readonly segmentSizeBytes?: number;
  /**
   * A checkpoint is taken automatically once this many bytes of log have been
   * written since the previous one.
   */
  readonly checkpointThresholdBytes?: number;
  /**
   * Take a final checkpoint when the engine is closed so the next start has
   * little or nothing to replay. Defaults to true.
   */
  readonly checkpointOnClose?: boolean;
  /**
   * Called as a checkpoint passes each stage. Intended for tests and
   * diagnostics; throwing from it aborts the checkpoint at that point.
   */
  readonly onCheckpointStage?: (stage: CheckpointStage) => void;
}

export interface CheckpointResult {
  readonly lsn: bigint;
  readonly file: string;
  readonly collections: number;
  readonly documents: number;
  readonly removedSnapshots: number;
  readonly removedSegments: number;
}

export interface SkippedCheckpoint {
  readonly file: string;
  readonly reason: string;
}

export interface RecoveryReport {
  /** The snapshot recovery started from, or 0 when it replayed the whole log. */
  readonly checkpointLsn: bigint;
  readonly checkpointFile: string | undefined;
  /** Newer snapshots that were damaged and therefore not used. */
  readonly skippedCheckpoints: readonly SkippedCheckpoint[];
  readonly replayedRecords: number;
  readonly lastLsn: bigint;
}

interface Settings {
  readonly checkpointThresholdBytes: number;
  readonly checkpointOnClose: boolean;
  readonly onCheckpointStage: (stage: CheckpointStage) => void;
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
  private lastCheckpoint = 0n;
  private bytesSinceCheckpoint = 0;
  private nextCheckpointAt: number;
  private checkpointFailure: unknown;
  private report: RecoveryReport = {
    checkpointLsn: 0n,
    checkpointFile: undefined,
    skippedCheckpoints: [],
    replayedRecords: 0,
    lastLsn: 0n,
  };

  private constructor(
    private readonly root: string,
    private readonly log: WriteAheadLog,
    private readonly lock: DirectoryLock,
    private readonly settings: Settings,
  ) {
    this.nextCheckpointAt = settings.checkpointThresholdBytes;
  }

  public static open(options: StorageEngineOptions): StorageEngine {
    const root = options.directory;
    const threshold =
      options.checkpointThresholdBytes ?? DEFAULT_CHECKPOINT_THRESHOLD_BYTES;

    if (!Number.isSafeInteger(threshold) || threshold < 1) {
      throw new TypeError(
        "The checkpoint threshold must be a positive safe integer.",
      );
    }

    const settings: Settings = {
      checkpointThresholdBytes: threshold,
      checkpointOnClose: options.checkpointOnClose ?? true,
      onCheckpointStage: options.onCheckpointStage ?? (() => undefined),
    };

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
        const engine = new StorageEngine(root, log, lock, settings);

        engine.recover();

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

  public get recovery(): RecoveryReport {
    return this.report;
  }

  /** The log sequence number covered by the newest snapshot, or 0. */
  public get lastCheckpointLsn(): bigint {
    return this.lastCheckpoint;
  }

  /** The error from the most recent automatic checkpoint that failed. */
  public get lastCheckpointError(): unknown {
    return this.checkpointFailure;
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

    let failure: unknown;

    if (
      this.settings.checkpointOnClose &&
      this.lastCheckpoint < this.log.lastLsn
    ) {
      try {
        this.checkpoint();
      } catch (error: unknown) {
        failure = error;
      }
    }

    this.closed = true;

    try {
      this.log.close();
    } catch (error: unknown) {
      failure ??= error;
    } finally {
      this.lock.release();
    }

    if (failure !== undefined) {
      throw failure;
    }
  }

  /**
   * Writes a snapshot of every collection, then removes snapshots and log
   * segments that are no longer needed. Two snapshots and the log since the
   * older one are always kept, so a damaged newest snapshot never loses data.
   * Returns undefined when nothing was written since the last checkpoint.
   *
   * This runs synchronously and blocks the server while it works.
   */
  public checkpoint(): CheckpointResult | undefined {
    this.assertOpen();

    const lsn = this.log.lastLsn;

    if (lsn === 0n || lsn === this.lastCheckpoint) {
      return undefined;
    }

    this.log.sync();

    const collections: CheckpointCollection[] = [];
    let documents = 0;

    for (const [database, byName] of this.databases) {
      for (const [collection, store] of byName) {
        collections.push({
          database,
          collection,
          documents: store.entries(),
          documentCount: store.documentCount,
        });
        documents += store.documentCount;
      }
    }

    const directory = join(this.root, "checkpoints");
    const stage = this.settings.onCheckpointStage;
    const file = writeCheckpoint(directory, lsn, collections, stage);
    const snapshots = listCheckpoints(directory);
    let removedSnapshots = 0;

    for (const old of snapshots.slice(2)) {
      unlinkSync(old.path);
      removedSnapshots += 1;
    }

    stage("snapshots-pruned");

    const previous = snapshots[1];
    const removedSegments =
      previous === undefined ? 0 : this.log.truncateThrough(previous.lsn);

    stage("log-truncated");

    this.lastCheckpoint = lsn;
    this.bytesSinceCheckpoint = 0;
    this.nextCheckpointAt = this.settings.checkpointThresholdBytes;
    this.checkpointFailure = undefined;

    return {
      lsn,
      file,
      collections: collections.length,
      documents,
      removedSnapshots,
      removedSegments,
    };
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

  private assertOpen(): void {
    if (this.closed) {
      throw new StorageError(
        StorageErrorCode.Closed,
        "The storage engine is closed.",
      );
    }
  }

  private append(operations: readonly Operation[]): void {
    this.assertOpen();

    this.runDueCheckpoint();

    let payload: Uint8Array;

    try {
      payload = encodeOperations(operations);
      this.log.append(RecordType.Transaction, payload);
      this.bytesSinceCheckpoint += RECORD_HEADER_SIZE + payload.byteLength;
    } catch (error: unknown) {
      if (error instanceof RangeError) {
        throw new StorageError(
          StorageErrorCode.InvalidBatch,
          `The operation is too large to record: ${error.message}`,
          { cause: error },
        );
      }

      throw error;
    }
  }

  /**
   * Checkpoints run at the start of an append, never in the middle of one,
   * because only then does memory match every record in the log.
   */
  private runDueCheckpoint(): void {
    if (this.bytesSinceCheckpoint < this.nextCheckpointAt) {
      return;
    }

    try {
      this.checkpoint();
    } catch (error: unknown) {
      this.checkpointFailure = error;
      this.nextCheckpointAt =
        this.bytesSinceCheckpoint + this.settings.checkpointThresholdBytes;
    }
  }

  private recover(): void {
    const directory = join(this.root, "checkpoints");

    removeTemporaryCheckpoints(directory);

    const skipped: SkippedCheckpoint[] = [];
    let base: ReadCheckpoint | undefined;
    let baseFile: string | undefined;

    for (const candidate of listCheckpoints(directory)) {
      try {
        base = readCheckpoint(candidate.path);

        if (base.lsn !== candidate.lsn) {
          throw new CheckpointDamagedError(
            "The snapshot's sequence number does not match its file name.",
          );
        }

        baseFile = candidate.file;
        break;
      } catch (error: unknown) {
        base = undefined;
        skipped.push({
          file: candidate.file,
          reason:
            error instanceof CheckpointDamagedError
              ? error.message
              : (error as Error).message,
        });
      }
    }

    const baseLsn = base?.lsn ?? 0n;

    if (this.log.firstLsn > baseLsn + 1n) {
      const problem =
        skipped.length > 0
          ? ` The newer snapshot${skipped.length > 1 ? "s" : ""} (${skipped
              .map((entry) => `${entry.file}: ${entry.reason}`)
              .join(
                "; ",
              )}) could not be read and the log before ${this.log.firstLsn} has already been compacted away.`
          : ` The log before ${this.log.firstLsn} has been removed and no snapshot covers it.`;

      throw new StorageCorruptionError(
        `The data in ${this.root} cannot be recovered.${problem} Restore the data directory from a backup.`,
        { file: this.root, offset: 0 },
      );
    }

    if (this.log.lastLsn < baseLsn) {
      throw new StorageCorruptionError(
        `The snapshot ${baseFile ?? ""} covers log sequence number ${baseLsn} but the log ends at ${this.log.lastLsn}. The log has lost records. Restore the data directory from a backup.`,
        { file: this.root, offset: 0 },
      );
    }

    const recovered = new Map<string, Map<string, Map<string, Uint8Array>>>();

    for (const entry of base?.collections ?? []) {
      let collections = recovered.get(entry.database);

      if (collections === undefined) {
        collections = new Map();
        recovered.set(entry.database, collections);
      }

      collections.set(entry.collection, entry.documents);
    }

    let replayed = 0;

    for (const record of this.log.records(baseLsn)) {
      replayed += 1;
      this.bytesSinceCheckpoint +=
        RECORD_HEADER_SIZE + record.payload.byteLength;
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

    this.lastCheckpoint = baseLsn;
    this.report = {
      checkpointLsn: baseLsn,
      checkpointFile: baseFile,
      skippedCheckpoints: skipped,
      replayedRecords: replayed,
      lastLsn: this.log.lastLsn,
    };
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
