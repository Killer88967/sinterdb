# sinterdb-server

Command-line server for SinterDB. The package installs the `sinterd` executable.

> [!WARNING]
> SinterDB is under active development and is not ready for production data. Without `--data-dir` the server keeps all data in memory and loses it on shutdown.

## Development

Build the executable from the repository root:

```bash
pnpm --filter sinterdb-server build
```

Start the server:

```bash
node apps/server-cli/dist/index.js
```

The default address is:

```text
sinterdb://127.0.0.1:4721
```

## Command-Line Options

```text
Usage:
  sinterd [options]

Options:
  --host <host>       Address to listen on
  -p, --port <port>   TCP port to listen on
  --data-dir <path>   Store data durably in this directory
  --durability <mode> How writes are acknowledged: fsync (default) or buffered
  --checkpoint-bytes <n>
                      Bytes of log between automatic checkpoints (default 64 MiB)
  -h, --help          Show the help message
  -v, --version       Show the server version
```

Example:

```bash
sinterd --host 0.0.0.0 --port 5000
```

Port `0` asks the operating system to select an available temporary port.

## Environment Variables

| Variable                    | Purpose                          | Default     |
| --------------------------- | -------------------------------- | ----------- |
| `SINTERDB_HOST`             | Listening address                | `127.0.0.1` |
| `SINTERDB_PORT`             | TCP port                         | `4721`      |
| `SINTERDB_DATA_DIR`         | Data directory                   | none        |
| `SINTERDB_DURABILITY`       | `fsync` or `buffered`            | `fsync`     |
| `SINTERDB_CHECKPOINT_BYTES` | Bytes of log between checkpoints | 64 MiB      |

Command-line options take precedence over environment variables.

## Durable Storage

```bash
sinterd --data-dir /var/lib/sinterdb
```

With a data directory, acknowledged writes survive restarts and crashes. See
[Durable Storage](../../docs/storage.md) for the durability modes, checkpoints,
recovery, and backups.

| Mode       | A write is acknowledged when...                 | Survives a power loss |
| ---------- | ----------------------------------------------- | --------------------- |
| `fsync`    | it has been flushed to stable storage (default) | Yes                   |
| `buffered` | it has reached the operating system             | No                    |

`--durability` and `--checkpoint-bytes` require `--data-dir`.

## Structured Logging

Lifecycle events are written as newline-delimited JSON:

```json
{
  "timestamp": "2026-09-19T02:48:23.277Z",
  "level": "info",
  "event": "server.started",
  "message": "SinterDB server is listening.",
  "details": {
    "host": "127.0.0.1",
    "port": 4721,
    "family": "IPv4",
    "version": "0.0.8",
    "storage": "disk",
    "dataDirectory": "/var/lib/sinterdb",
    "durability": "fsync",
    "databases": 1,
    "collections": 2,
    "checkpointLsn": "1042",
    "replayedRecords": 0,
    "skippedCheckpoints": []
  }
}
```

## Shutdown

`SIGINT` and `SIGTERM` stop the listener, close active connections, write a final checkpoint when a data directory is in use, and allow the process to exit cleanly.

A process that is killed instead of stopped is recovered on the next start. The server takes over the lock the dead process left behind.

## Current Commands

After completing the protocol handshake, clients can use:

- `ping`
- `serverInfo`
- `listDatabases`
- `createCollection`
- `listCollections`
- `insertOne`
- `insertMany`
- `findOne`
- `find`
- `getMore`
- `closeCursor`
- `updateOne`
- `updateMany`
- `replaceOne`
- `deleteOne`
- `deleteMany`

## License

Licensed under the Apache License, Version 2.0.
