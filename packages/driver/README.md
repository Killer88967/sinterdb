# SinterDB Node.js Driver

The official Node.js driver for the SinterDB document database.

> [!WARNING]
> SinterDB is under active development and is not ready for production use.

## Installation

The package has not been published yet. Once available, it will be installed
with:

```bash
pnpm add sinterdb
```

## Planned API

```ts
import { SinterClient } from "sinterdb";

const client = new SinterClient("sinterdb://127.0.0.1:4721");

await client.connect();

const database = client.db("application");
const users = database.collection("users");

await client.close();
```

The initial connection API is planned for version `0.0.4`.
