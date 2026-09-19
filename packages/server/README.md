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
- In-memory database and collection catalog
- `serverInfo`
- `listDatabases`
- `createCollection`
- `listCollections`
- Structured wire errors
- Graceful connection shutdown

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

Port `0` asks the operating system to select an available temporary port.

## Package Boundaries

Storage persistence is delegated to `@sinterdb-internal/storage`. Wire messages, framing, and document encoding are provided by `sinterdb-protocol`.

The public executable is distributed separately as `sinterdb-server`.

## Current Limitations

The server currently stores only database and collection metadata in memory. It does not yet support document insertion, querying, persistence, indexes, authentication, or transactions.

## License

Licensed under the Apache License, Version 2.0.
