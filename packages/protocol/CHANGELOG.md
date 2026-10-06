# sinterdb-protocol

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

## 0.0.5

### Patch Changes

- Add the first complete document write and point-read path, including CustomId
  generation and serialization, in-memory collection storage, insertOne,
  ordered insertMany, equality-filtered findOne, duplicate identifier detection,
  document validation, typed results, and ordered batch failure details.

## 0.0.4

No changes in this release.

## 0.0.3

No changes in this release.

## 0.0.2

### Patch Changes

- Add protocol version 1 framing, typed binary document encoding, message envelopes,
  incremental TCP decoding, request ID generation, stable wire errors, golden
  fixtures, schemas, and the initial wire-protocol specification.
