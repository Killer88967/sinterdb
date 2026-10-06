# SinterDB Storage

Internal durable-storage engine for SinterDB.

This package owns:

- The data directory layout, manifest, and format version
- The write-ahead log with checksummed records and segment rotation
- Atomic multi-document operations
- Checkpoints (snapshots) and log compaction
- Startup recovery, including repair of incomplete final records
- Data directory locking
- The in-memory collection with filters, sorting, updates, and deletes

Index persistence is planned for a later version.

See [Durable Storage](../../docs/storage.md) for how the pieces fit together.

> [!WARNING]
> This package is private and does not provide a stable public API.
