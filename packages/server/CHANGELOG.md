# @sinterdb-internal/server

## 0.0.5

### Patch Changes

- Add the first complete document write and point-read path, including CustomId
  generation and serialization, in-memory collection storage, insertOne,
  ordered insertMany, equality-filtered findOne, duplicate identifier detection,
  document validation, typed results, and ordered batch failure details.
- Updated dependencies
  - sinterdb-protocol@0.0.5
  - @sinterdb-internal/storage@0.0.5

## 0.0.4

### Patch Changes

- sinterdb-protocol@0.0.4
  - @sinterdb-internal/storage@0.0.4

## 0.0.3

### Patch Changes

- Implement the first functional SinterDB server lifecycle with TCP sessions, protocol handshakes, ping responses, command dispatch, an in-memory database and collection catalog, structured CLI logging, graceful shutdown, and temporary test-server utilities.
- sinterdb-protocol@0.0.3
  - @sinterdb-internal/storage@0.0.3

## 0.0.2

### Patch Changes

- Updated dependencies
  - sinterdb-protocol@0.0.2
  - @sinterdb-internal/storage@0.0.2
