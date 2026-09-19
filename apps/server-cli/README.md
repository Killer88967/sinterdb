# sinterdb-server

Command-line server for SinterDB. The package installs the `sinterd` executable.

> [!WARNING]
> SinterDB is under active development. The current server uses an in-memory catalog and is not ready for production data.

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
  --port <port>       TCP port to listen on
  -h, --help          Show the help message
  -v, --version       Show the server version
```

Example:

```bash
sinterd --host 0.0.0.0 --port 5000
```

Port `0` asks the operating system to select an available temporary port.

## Environment Variables

| Variable        | Purpose           | Default     |
| --------------- | ----------------- | ----------- |
| `SINTERDB_HOST` | Listening address | `127.0.0.1` |
| `SINTERDB_PORT` | TCP port          | `4721`      |

Command-line options take precedence over environment variables.

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
    "version": "0.0.3"
  }
}
```

## Shutdown

`SIGINT` and `SIGTERM` stop the listener, close active connections, and allow the process to exit cleanly.

Press `Ctrl+C` during local development to initiate shutdown.

## Current Commands

After completing the protocol handshake, clients can use:

- `ping`
- `serverInfo`
- `listDatabases`
- `createCollection`
- `listCollections`

## License

Licensed under the Apache License, Version 2.0.
