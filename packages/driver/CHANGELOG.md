# sinterdb

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
