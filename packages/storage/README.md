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
- Single-field indexes with unique and sparse options, the query planner, and
  index validation. Index definitions are stored and the indexes are rebuilt on
  recovery.

See [Durable Storage](../../docs/storage.md) for how the pieces fit together.

> [!WARNING]
> This package is private and does not provide a stable public API.
