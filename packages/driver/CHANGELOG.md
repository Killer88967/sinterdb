# sinterdb

## 0.0.9

### Patch Changes

- Add indexes and query planning.

  - Add single-field indexes with `createIndex()`, `dropIndex()`, and `indexes()`.
    Indexes can be ascending or descending, `unique`, `sparse`, and on nested
    fields, and a collection always has a unique `_id` index.
  - Add a query planner that chooses between a collection scan, an `_id` lookup,
    and an index lookup for equality, range, and `$in` filters, including filters
    joined by `$and`. Results are always identical to a scan, including order.
  - Enforce unique indexes on inserts, updates, replacements, upserts, and
    multi-document writes. A rejected write changes nothing, and concurrent
    writers cannot both claim a value.
  - Add `find().explain()` to show the chosen plan and `validateIndexes()` to
    rebuild every index and report any difference.
  - Add the `createIndex`, `dropIndex`, `listIndexes`, `explain`, and
    `validateIndexes` server commands, and the `InvalidIndex` (6000),
    `IndexNotFound` (6001), and `IndexConflict` (6002) wire error codes. A unique
    violation returns the existing `DuplicateKey` error.
  - Add the typed `IndexDefinition<TDocument>` so index fields are checked against
    your document type.
  - Store index definitions in the log and in snapshots and rebuild the indexes
    when the server starts. Startup stops with a clear error if a recorded unique
    index cannot be rebuilt. The `server.started` log reports `rebuiltIndexes`.
  - Move the storage format to version 2. A version 1 directory is upgraded in
    place when it is first opened, and servers from before 0.0.9 refuse the
    upgraded directory.
  - Add the Indexes documentation and extend the crash tests with indexed and
    unique collections.

- Updated dependencies
  - sinterdb-protocol@0.0.9

## 0.0.8

### Patch Changes

- Add durable storage and crash recovery.

  - Add the `--data-dir`, `--durability`, and `--checkpoint-bytes` server options
    and the `SINTERDB_DATA_DIR`, `SINTERDB_DURABILITY`, and
    `SINTERDB_CHECKPOINT_BYTES` environment variables. Without a data directory the
    server still keeps all data in memory.
  - Write every change to a checksummed write-ahead log before applying it.
    Operations that change several documents are a single log record, so they stay
    all-or-nothing across a crash.
  - Add the `fsync` (default) and `buffered` acknowledgement modes.
  - Recover on startup by loading the newest valid snapshot and replaying the log
    after it. An incomplete final record from a crash is dropped. Damage anywhere
    else stops startup with an error that names the file, offset, and sequence
    number.
  - Add checkpoints and log compaction. Two snapshots and the log since the older
    one are kept, so a damaged newest snapshot never loses data. A final
    checkpoint is written on clean shutdown.
  - Add a data directory layout with `manifest.json`, a storage format version, and
    a process lock that is taken over when the previous holder has died.
  - Report recovery details in the `server.started` log.
  - Return `InternalError` when the server cannot persist a write, instead of a
    document validation error.
  - Limit database and collection names to 255 bytes.
  - `SinterServer.catalog` is only available after `start()` when a data directory
    is configured, and `SinterServer.recovery` reports what recovery did.
  - Add crash tests that kill the server with `SIGKILL` during writes and at each
    checkpoint stage, and tests that damage log, snapshot, and manifest files.
  - Add the Durable Storage documentation.

- Updated dependencies
  - sinterdb-protocol@0.0.8

## 0.0.7

### Patch Changes

- Complete the basic CRUD surface with updates, replacements, and deletes.

  - Add `updateOne()` and `updateMany()` with the `$set`, `$unset`, `$inc`,
    `$min`, `$max`, `$push`, `$pull`, and `$addToSet` operators.
  - Add `replaceOne()`, `deleteOne()`, and `deleteMany()`.
  - Add upsert support for updates and replacements.
  - Add `UpdateResult` and `DeleteResult` with matched, modified, upserted, and
    deleted counts. `modifiedCount` only counts documents whose stored value
    changed.
  - Add typed `UpdateFilter<TDocument>` so operators only accept compatible
    fields and value types.
  - Enforce immutable `_id` values for updates and replacements.
  - Apply `updateMany` all-or-nothing so a failure never leaves a partially
    updated set of documents.
  - Add the `updateOne`, `updateMany`, `replaceOne`, `deleteOne`, and
    `deleteMany` server commands.
  - Add the `InvalidUpdate` (4002) and `ImmutableId` (4003) wire error codes.
  - Add a command reference to the wire protocol document.
  - Rename the exported `findOptions` interface to `FindOptions`.
  - Type-check test files in CI and align editor and build configurations.

- Updated dependencies
  - sinterdb-protocol@0.0.7

## 0.0.6

### Patch Changes

- Add multi-document queries with server-side cursors.

  - Add `find()` returning `FindCursor<TDocument>` with `for await...of`,
    `next`, `hasNext`, `toArray`, and `close`.
  - Add the `find`, `getMore`, and `closeCursor` server commands with bounded
    batches, session-scoped cursors, idle cursor timeouts, and cleanup when a
    connection closes. Add the `CursorNotFound` wire error (code 5000).
  - Add equality, comparison, membership, existence, logical (`$and`, `$or`,
    `$nor`), `$not`, and nested-field filter operators.
  - Add `sort`, `skip`, and `limit` find options. Sort accepts an ordered list of
    `[path, 1 | -1]` pairs and orders mixed types deterministically.
  - Add the typed `Filter<TDocument>` and `Sort<TDocument>` driver APIs and
    export `CustomId` and `Document` from `sinterdb`.
  - Add `listDatabases()` to the client and `listCollections()` to databases.
  - Add a stop timeout to `SinterServer.stop()` that force-closes connections
    that do not close in time.
  - Fix compatibility errors for `UnsupportedCapability` handshake failures.
  - Show the `-p` option in the server help text and refresh stale documentation.

- Updated dependencies
  - sinterdb-protocol@0.0.6

## 0.0.5

### Patch Changes

- Add the first complete document write and point-read path, including CustomId
  generation and serialization, in-memory collection storage, insertOne,
  ordered insertMany, equality-filtered findOne, duplicate identifier detection,
  document validation, typed results, and ordered batch failure details.
- Updated dependencies
  - sinterdb-protocol@0.0.5

## 0.0.4

### Patch Changes

- Add the first functional SinterDB Node.js driver connection API, including
  connection-string parsing, TCP connection management, protocol negotiation,
  ping requests, driver events, timeouts, typed database and collection handles,
  and the public driver error hierarchy.
- sinterdb-protocol@0.0.4

## 0.0.3

### Patch Changes

- sinterdb-protocol@0.0.3

## 0.0.2

### Patch Changes

- Updated dependencies
  - sinterdb-protocol@0.0.2
