# SinterDB Server Core

Internal server implementation for the SinterDB document database.

This package will own:

- TCP connection handling
- Client sessions
- Database and collection catalogs
- Query execution
- Authentication and authorization
- Transactions
- Replication

Storage persistence is delegated to `@sinterdb-internal/storage`. Wire messages
are defined by `@sinterdb-internal/protocol`.

> [!WARNING]
> This package is private and does not provide a stable public API.
