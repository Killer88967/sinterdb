# Durable Storage

SinterDB can keep its data on disk so that acknowledged writes survive a
restart or a crash. Storage is opt-in: without a data directory the server
keeps everything in memory and loses it on shutdown.

```sh
sinterd --data-dir ./data
```

## What is stored

All documents are kept in memory while the server runs. The data directory is
how they are made durable and reloaded, so the whole dataset must fit in
memory.

```text
data/
├── LOCK              process lock, present while a server uses the directory
├── manifest.json     storage format and version
├── wal/              write-ahead log segments (00000000000000000001.wal, ...)
├── checkpoints/      snapshots (00000000000000000123.snap, ...)
├── segments/         reserved for a later version
└── indexes/          reserved for a later version
```

Do not edit these files by hand.

## How a write becomes durable

1. The server validates the request and works out the complete result of the
   operation.
2. It appends one record to the write-ahead log. An operation that changes
   several documents, such as `insertMany`, `updateMany` or `deleteMany`, is a
   single record, so it is applied completely or not at all.
3. It applies the change to memory.
4. It acknowledges the write to the client.

If step 2 fails, the change is not applied to memory and the client receives an
error. Every record carries checksums and a sequence number.

## Durability modes

Choose a mode with `--durability <mode>` or `SINTERDB_DURABILITY`.

| Mode              | A write is acknowledged when...                | Survives a server crash | Survives power loss or an operating-system crash |
| ----------------- | ---------------------------------------------- | ----------------------- | ------------------------------------------------ |
| `fsync` (default) | the log has been flushed to stable storage     | Yes                     | Yes, if the storage hardware honors flushes      |
| `buffered`        | the log write has reached the operating system | Yes                     | No. Recent writes can be lost                    |

`buffered` is faster. Use `fsync` for data you cannot afford to lose.

> [!NOTE]
> The automated crash tests terminate the server with `SIGKILL` and verify
> that recovery is exact. They cannot simulate losing power, so protection
> against power loss in `fsync` mode rests on the engine flushing at the right
> moments: after each log append, when creating a log segment, and when
> publishing a snapshot or removing files.

## Checkpoints and compaction

Replaying a long log would make restarts slow and the log would grow forever,
so the server periodically writes a snapshot of all collections, called a
checkpoint, and then removes log segments it no longer needs.

- A checkpoint is taken automatically after `--checkpoint-bytes` bytes of log
  (default 64 MiB), and once more on a clean shutdown so the next start has
  almost nothing to replay.
- A snapshot is written to a temporary file, flushed, and atomically renamed, so
  a crash never leaves a half-written snapshot in place.
- The two newest snapshots are kept, together with the log since the older one.
  If the newest snapshot is ever damaged, recovery falls back to the older
  snapshot plus the log and loses nothing. This also means the first checkpoint
  frees no log space, and disk use can reach two to three times the data size.
- Checkpoints run on the main thread and block the server while they are
  written. Large datasets pause briefly at each checkpoint.
- Checkpoints only start between writes, never in the middle of one.
- A failed automatic checkpoint never fails a write. The server tries again
  after another threshold's worth of log.

## Recovery

On start the server:

1. Takes the lock on the data directory.
2. Checks `manifest.json`.
3. Opens the log, repairing an incomplete final record left by a crash.
4. Loads the newest valid snapshot and replays only the log after it.
5. Starts listening.

The `server.started` log line reports what happened: `checkpointLsn`,
`replayedRecords`, and `skippedCheckpoints`, which lists any damaged snapshots
that were not used and why.

### Crashes

A crash can leave the last log record incomplete. That is expected and is
dropped silently, so a write that was never acknowledged simply does not
happen. Everything acknowledged before the crash is recovered.

### Corruption

If a record in the middle of the log, a snapshot, or the manifest is damaged,
the server refuses to start rather than guess. The error names the file, the
byte offset and the log sequence number. The recovery code is designed never
to start with data that did not exist at some point in the past, and never to
edit a log it cannot trust. The fault-injection tests check this by damaging
files at random.

| Startup error mentions                 | Meaning                                                              | What to do                                                                            |
| -------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `The data directory is in use`         | Another server holds the lock                                        | Stop it. Remove `LOCK` only if you are certain no SinterDB process uses the directory |
| `write-ahead log is corrupt`           | A log record failed its checksum, or a segment is missing            | Restore the directory from a backup                                                   |
| `cannot be recovered`                  | Every snapshot is damaged and the log before them was compacted away | Restore from a backup                                                                 |
| `lost records`                         | The log ends before the newest snapshot                              | Restore from a backup                                                                 |
| `no manifest.json` or `not valid JSON` | The manifest is missing or damaged                                   | Restore `manifest.json` from a backup                                                 |
| `Upgrade` or `newer version`           | The data was written by a newer SinterDB                             | Run the newer version                                                                 |
| `cannot be rebuilt`                    | A recorded index cannot be built from the recovered documents        | Restore from a backup                                                                 |

## The data directory lock

Only one server may use a data directory. `LOCK` records the process id and
host. After a crash, the next server on the same host notices the process is
gone and takes the lock over. The lock is a file, not an operating-system
lock, so it cannot protect a directory shared over a network file system, and
it can be fooled if the operating system reuses a process id.

A lock written on a different host is never taken over unless you ask for it,
because the server cannot tell whether that process is still running. Start the
server with `--reclaim-lock` (or `SINTERDB_RECLAIM_LOCK=true`) when you know it
is not. Containers need this, because each one has its own host name; the
[Docker image](./docker.md) sets it for you.

## Indexes

Index definitions are part of the stored data. `createIndex` and `dropIndex` are
log records, and each snapshot lists the index definitions of every collection.
The indexes themselves are rebuilt from the documents on every start, so they
add very little to the data directory. See [Indexes](./indexes.md).

If a unique index recorded in the log cannot be rebuilt because the recovered
documents violate it, the server refuses to start and names the collection. This
only happens when the data is damaged.

## Storage format versions

The data directory records a format version in `manifest.json`.

| Version | Written by | Contents                                        |
| ------: | ---------- | ----------------------------------------------- |
|       1 | 0.0.8      | Documents and collections                       |
|       2 | 0.0.9      | Adds index definitions to the log and snapshots |

A version 1 directory is upgraded to version 2 in place the first time 0.0.9
opens it, before anything is written. The manifest then records `upgradedFrom`.
Version 1 snapshots and logs are still read.

The upgrade is one way. A 0.0.8 server refuses a version 2 directory with an
"Upgrade" error instead of ignoring the indexes. Make a backup before upgrading
if you may want to go back.

## Backups

Stop the server cleanly with `SIGTERM` or `SIGINT`, which writes a final
checkpoint, then copy the whole data directory. Restore by putting the
directory back while the server is stopped. Do not copy a directory while a
server is writing to it.

## When a disk write fails

If the server cannot write to the log, the client receives an `InternalError`
and the message says the outcome is unknown. The write may or may not have
reached the disk. The server refuses further writes until it is restarted,
which recovers the true state from disk.

## Limits

- The dataset must fit in memory. Recovery briefly needs about twice the size
  of the snapshot it loads.
- Database and collection names can be at most 255 bytes.
- Recovery rebuilds every index, so startup time grows with the number and size
  of indexes.
- There is no encryption, compression, or replication.
- Reads and writes share one thread with checkpoints.
- The on-disk format has a version. A server refuses data written by a newer
  format and tells you to upgrade.
