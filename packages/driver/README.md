# SinterDB Node.js Driver

The official Node.js driver for the SinterDB document database.

> [!WARNING]
> SinterDB is under active development and is not ready for production use.
> Data is currently stored in memory and is lost when the server stops.

## Installation

The package has not been published to npm yet. Once available, install it with:

```bash
pnpm add sinterdb
```

## Quick Start

```ts
import { CustomId, SinterClient } from "sinterdb";

interface User {
  _id: CustomId;
  name: string;
  email: string;
  active: boolean;
}

const client = new SinterClient("sinterdb://127.0.0.1:4721/application");

try {
  await client.connect();

  const users = client.db().collection<User>("users");

  const insert = await users.insertOne({
    name: "Ada",
    email: "ada@example.com",
    active: true,
  });

  const user = await users.findOne({
    _id: insert.insertedId,
  });

  console.log(user);
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

Pass a document type to `collection<TDocument>()`:

```ts
import type { CustomId } from "sinterdb";

interface User {
  _id: CustomId;
  name: string;
  email: string;
  createdAt: Date;
}

const users = client.db("application").collection<User>("users");

console.log(users.name); // users
console.log(users.namespace); // application.users
```

The `_id` property may be omitted from inserts. The server generates a
`CustomId` when one is not provided.

## Insert One

```ts
const result = await users.insertOne({
  name: "Ada",
  email: "ada@example.com",
  createdAt: new Date(),
});

console.log(result.acknowledged); // true
console.log(result.insertedId.toHexString());
```

A caller-provided identifier is also supported:

```ts
import { CustomId } from "sinterdb";

const id = CustomId.generate();

await users.insertOne({
  _id: id,
  name: "Ada",
  email: "ada@example.com",
  createdAt: new Date(),
});
```

Duplicate identifiers produce a server error with the numeric
`DuplicateKey` wire-error code.

## Insert Many

`insertMany()` applies documents in array order:

```ts
const result = await users.insertMany([
  {
    name: "Ada",
    email: "ada@example.com",
    createdAt: new Date(),
  },
  {
    name: "Grace",
    email: "grace@example.com",
    createdAt: new Date(),
  },
]);

console.log(result.insertedCount); // 2
console.log(result.insertedIds);
```

An ordered batch stops at its first failure. Successfully inserted documents
remain stored.

```ts
import { SinterInsertManyError } from "sinterdb";

try {
  await users.insertMany(documents);
} catch (error: unknown) {
  if (error instanceof SinterInsertManyError) {
    console.error("Failed index:", error.failedIndex);
    console.error("Applied IDs:", error.insertedIds);
  } else {
    throw error;
  }
}
```

## Find One

`findOne()` supports top-level equality filters:

```ts
const user = await users.findOne({
  email: "ada@example.com",
});

if (user !== null) {
  console.log(user._id);
  console.log(user.name);
}
```

An empty filter returns the first stored document:

```ts
const firstUser = await users.findOne();
```

Equality comparisons support all SinterDB document values, including
`CustomId`, dates, binary values, arrays, nested documents, and bigints.

## CustomId

A `CustomId` is a 16-byte SinterDB document identifier:

```ts
import { CustomId } from "sinterdb";

const generated = CustomId.generate();
const hexadecimal = generated.toHexString();
const parsed = CustomId.fromHexString(hexadecimal);

console.log(parsed.equals(generated)); // true
console.log(generated.timestamp);
```

The first six bytes contain the creation timestamp. The remaining ten bytes
are cryptographically random.

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

All public driver errors extend `SinterError`:

```ts
import {
  SinterConnectionError,
  SinterError,
  SinterErrorCode,
  SinterServerError,
} from "sinterdb";

try {
  await client.connect();
} catch (error: unknown) {
  if (error instanceof SinterConnectionError) {
    console.error("Could not connect to SinterDB.", error);
  } else if (
    error instanceof SinterError &&
    error.code === SinterErrorCode.IncompatibleProtocol
  ) {
    console.error("The protocol versions are incompatible.");
  } else if (error instanceof SinterServerError) {
    console.error(error.wireCode, error.serverErrorName);
  } else {
    throw error;
  }
}
```

## Current Scope

Version `0.0.5` provides:

- `SinterClient`
- `sinterdb://` connection-string parsing
- Protocol handshake and capability negotiation
- Connection, request, and socket timeouts
- Typed lifecycle events
- `CustomId` generation and serialization
- Typed `SinterDatabase` and `SinterCollection<TDocument>` handles
- `insertOne()`
- Ordered `insertMany()`
- `findOne()` with equality filters
- Duplicate `_id` detection
- Document-size and nesting validation
- In-memory collection storage

Advanced filters and cursors are planned for version `0.0.6`.
