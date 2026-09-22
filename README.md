# SinterDB

[![CI](https://img.shields.io/github/actions/workflow/status/Killer88967/sinterdb/ci.yml?branch=main&label=CI)](https://github.com/Killer88967/sinterdb/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/Killer88967/sinterdb)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24-339933?logo=node.js&logoColor=white)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A document-oriented database, its official Node.js driver, and supporting packages.

> [!WARNING]
> SinterDB is in early development. The server can store and retrieve documents in memory, but data is not yet persisted and is lost when the server stops. APIs and protocol details may change before `1.0.0`.

## Project Goals

SinterDB aims to provide:

- A document-oriented database server
- A versioned network protocol
- Persistent local storage
- An official TypeScript-first Node.js driver
- Transactions, indexes, authentication, and replication
- A separate ODM package inspired by tools such as Mongoose
- A straightforward local-development experience

## Workspace

| Package                         | Visibility | Purpose                                        |
| ------------------------------- | ---------- | ---------------------------------------------- |
| `sinterdb`                      | Public     | Official Node.js database driver               |
| `sinterdb-protocol`             | Public     | Wire-protocol types, framing, and errors       |
| `sinterdb-server`               | Public     | `sinterd` server executable                    |
| `@sinterdb-internal/server`     | Private    | Sessions, commands, and query execution        |
| `@sinterdb-internal/storage`    | Private    | Persistent storage, WAL, indexes, and recovery |
| `@sinterdb-internal/test-utils` | Private    | Shared fixtures and server test utilities      |

The ODM will be developed separately as `sinterdb-odm` after the driver API
becomes stable enough to support it.

## Repository Layout

```text
sinterdb/
├── apps/
│   └── server-cli/
├── packages/
│   ├── driver/
│   ├── protocol/
│   ├── server/
│   ├── storage/
│   └── test-utils/
├── tests/
│   ├── integration/
│   └── specification/
├── docs/
│   ├── architecture/
│   ├── protocol/
│   └── reference/
├── examples/
│   ├── basic/
│   └── typescript/
└── ROADMAP.md
```

## Requirements

- Node.js 24 or newer
- pnpm 12 or newer

## Development

Clone the repository and install its dependencies:

```sh
git clone https://github.com/Killer88967/sinterdb.git
cd sinterdb
pnpm install --frozen-lockfile
```

Run the complete validation suite:

```sh
pnpm all
```

The individual validation commands are:

```sh
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

Remove generated output:

```sh
pnpm clean
```

## Server CLI

Build and start the development server:

```sh
pnpm --filter sinterdb-server build
node apps/server-cli/dist/index.js
```

Use a custom address:

```sh
node apps/server-cli/dist/index.js \
  --host 127.0.0.1 \
  --port 5000
```

Display the available options:

```sh
node apps/server-cli/dist/index.js --help
```

The server emits newline-delimited JSON lifecycle logs and shuts down gracefully
on `SIGINT` or `SIGTERM`.

## Development Status

The current milestone is `0.0.5 — Insert and Point Read`.

Implemented so far:

- Publishable pnpm monorepo
- TypeScript builds and declarations
- Binary wire framing
- Deterministic typed document encoding
- Custom identifier generation and binary serialization
- Incremental protocol stream decoding
- Protocol handshakes and capability negotiation
- TCP server and session lifecycle
- Official Node.js driver connection lifecycle
- Driver lifecycle events and error hierarchy
- Ping requests
- Typed database and collection handles
- In-memory document storage
- `insertOne` and ordered `insertMany`
- `findOne` with equality filters
- Duplicate identifier detection
- Document-size and nesting validation
- Structured server logging
- Temporary-port test-server utilities
- End-to-end driver and server integration tests
- Graceful signal shutdown

The next milestone, `0.0.6`, introduces filters and cursors.

See [ROADMAP.md](./ROADMAP.md) for the complete development plan.

## Versioning

SinterDB follows semantic versioning.

Before `1.0.0`, APIs and protocol details may change between minor versions.
Changesets are used to track package changes and coordinate releases.

## License

Licensed under the [Apache License, Version 2.0](LICENSE).

See [NOTICE](NOTICE) for attribution information.
