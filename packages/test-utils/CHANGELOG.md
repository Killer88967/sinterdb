# @sinterdb-internal/test-utils

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
  - @sinterdb-internal/server@0.0.6

## 0.0.5

### Patch Changes

- Updated dependencies
  - @sinterdb-internal/server@0.0.5

## 0.0.4

### Patch Changes

- @sinterdb-internal/server@0.0.4

## 0.0.3

### Patch Changes

- Implement the first functional SinterDB server lifecycle with TCP sessions, protocol handshakes, ping responses, command dispatch, an in-memory database and collection catalog, structured CLI logging, graceful shutdown, and temporary test-server utilities.
- Updated dependencies
  - @sinterdb-internal/server@0.0.3

## 0.0.2

No changes in this release.
