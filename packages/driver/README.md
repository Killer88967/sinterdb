# SinterDB Node.js Driver

The official Node.js driver for the SinterDB document database.

> [!WARNING]
> SinterDB is under active development and is not ready for production use.

## Installation

The package has not been published to npm yet. Once available, install it with:

```bash
pnpm add sinterdb
```

## Quick Start

```ts
import { SinterClient } from "sinterdb";

const client = new SinterClient("sinterdb://127.0.0.1:4721");

try {
  await client.connect();

  const result = await client.ping();
  console.log(`Server replied in ${result.roundTripTimeMS} ms.`);

  const database = client.db("application");
  const users = database.collection("users");

  console.log(users.namespace);
} finally {
  await client.close();
}
```

## Connection Strings

SinterDB connection strings use the following format:

```text
sinterdb://host:port/database
```

The port and database are optional. When omitted, the driver uses port `4721`
and requires a database name when calling `client.db()`.

```ts
const client = new SinterClient("sinterdb://127.0.0.1/application");

await client.connect();

const database = client.db();
```

## Client Options

Connection, request, and idle socket timeouts can be configured in
milliseconds:

```ts
const client = new SinterClient("sinterdb://127.0.0.1:4721/application", {
  connectTimeoutMS: 10_000,
  requestTimeoutMS: 10_000,
  socketTimeoutMS: 30_000,
});
```

Set `socketTimeoutMS` to `0` to disable the idle socket timeout.

## Typed Collections

Pass a document type to `collection<TDocument>()` to retain it on the
collection handle:

```ts
interface User {
  name: string;
  email: string;
  createdAt: Date;
}

const database = client.db("application");
const users = database.collection<User>("users");

console.log(users.name); // users
console.log(users.namespace); // application.users
```

Collection operations will be added in a later release.

## Events

`SinterClient` emits typed lifecycle events:

```ts
client.on("connecting", () => {
  console.log("Connecting to SinterDB...");
});

client.on("connected", () => {
  console.log("Connected to SinterDB.");
});

client.on("closed", () => {
  console.log("Connection closed.");
});

client.on("error", (error) => {
  console.error(error);
});
```

## Error Handling

All public driver errors extend `SinterError` and can be checked with
`instanceof` or by their stable error code:

```ts
import { SinterConnectionError, SinterError, SinterErrorCode } from "sinterdb";

try {
  await client.connect();
} catch (error: unknown) {
  if (error instanceof SinterConnectionError) {
    console.error("Could not connect to SinterDB.", error);
  } else if (
    error instanceof SinterError &&
    error.code === SinterErrorCode.IncompatibleProtocol
  ) {
    console.error("The client and server protocol versions are incompatible.");
  } else {
    throw error;
  }
}
```

## Current Scope

Version `0.0.4` provides:

- `SinterClient`
- `sinterdb://` connection-string parsing
- TCP connection and shutdown management
- Protocol handshake and capability negotiation
- Connection, request, and socket timeouts
- `ping()` requests
- Typed lifecycle events
- A public error hierarchy
- `SinterDatabase` and `SinterCollection<TDocument>` handles

Document insert and point-read operations are planned for version `0.0.5`.
