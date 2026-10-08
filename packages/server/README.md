# SinterDB Server Core

Internal server implementation for the SinterDB document database.

> [!WARNING]
> This package is private and does not provide a stable public API.

## Implemented Features

- Validated host and port configuration
- TCP server startup and shutdown
- Multiple simultaneous client connections
- Per-connection protocol sessions
- Required client handshake
- Protocol capability advertisement
- Ping requests
- Command dispatch
- Database and collection catalog, in memory or backed by durable storage
- `serverInfo`
- `listDatabases`
- `createCollection`
- `listCollections`
- `insertOne` and ordered `insertMany`
- `findOne`
- `find` with filters, `sort`, `skip`, and `limit`
- `getMore` and `closeCursor`
- `updateOne`, `updateMany`, and `replaceOne` with upserts
- `deleteOne` and `deleteMany`
- `createIndex`, `dropIndex`, `listIndexes`, `explain`, and `validateIndexes`
- Unique and sparse single-field indexes, with a query planner that uses them
- Update operators: `$set`, `$unset`, `$inc`, `$min`, `$max`, `$push`, `$pull`, and `$addToSet`
- Immutable `_id` enforcement and all-or-nothing `updateMany`
- Session-scoped cursors with idle timeout
- Structured wire errors
- Graceful connection shutdown with a force-close timeout
- Optional durable storage with a write-ahead log, checkpoints, and startup
  recovery

## Example

```ts
import { SinterServer } from "@sinterdb-internal/server";

const server = new SinterServer({
  host: "127.0.0.1",
  port: 4721,
});

const address = await server.start();

console.log(address);

await server.stop();
```

## Durable Storage

Give the server a data directory to make writes durable and to recover them on
start:

```ts
const server = new SinterServer({
  dataDirectory: "./data",
  durability: "fsync",
  checkpointThresholdBytes: 64 * 1024 * 1024,
});

await server.start();

console.log(server.recovery);
```

| Option                     | Environment variable        | Default          |
| -------------------------- | --------------------------- | ---------------- |
| `dataDirectory`            | `SINTERDB_DATA_DIR`         | none (in memory) |
| `durability`               | `SINTERDB_DURABILITY`       | `fsync`          |
| `checkpointThresholdBytes` | `SINTERDB_CHECKPOINT_BYTES` | 64 MiB           |

`durability` and `checkpointThresholdBytes` only apply with a `dataDirectory`.
For a server with a data directory, `start()` takes the directory lock and
recovers the data before listening. `server.catalog` and `server.recovery` are
only available while it is running. `stop()` writes a final checkpoint.

Storage failures are returned to clients as `InternalError`. See
[Durable Storage](../../docs/storage.md).

`stop()` closes active connections and destroys any socket that has not closed after five seconds. Pass `{ timeoutMS }` to change the delay.

Port `0` asks the operating system to select an available temporary port.

## Package Boundaries

Durable storage is provided by `@sinterdb-internal/storage`. Wire messages, framing, and document encoding are provided by `sinterdb-protocol`.

The public executable is distributed separately as `@sinterdb/cli`.

## Current Limitations

The whole dataset must fit in memory. The server does not yet support indexes, authentication, or transactions.

## License

Licensed under the Apache License, Version 2.0.
