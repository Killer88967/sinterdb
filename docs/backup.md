# Backup and restore

`sinterd` can copy a data directory into a checked backup and restore it later.
A backup is a plain directory. Every file in it is recorded in `backup.json`
with its size and a SHA-256 checksum, so damage is found before you rely on it.

These commands work on a closed data directory. **Stop the server first** with
`SIGTERM` or `SIGINT`, which writes a final checkpoint. Backing up a directory a
server still holds fails with the same "in use" error a second server would
get. To back up without stopping the server, take a snapshot of the volume
instead and restore from that.

## Commands

```sh
sinterd backup --data-dir ./data --to ./backups/2026-10-11
sinterd verify-backup --from ./backups/2026-10-11
sinterd restore --from ./backups/2026-10-11 --data-dir ./restored
```

| Command                                                | What it does                                                    |
| ------------------------------------------------------ | --------------------------------------------------------------- |
| `sinterd backup --data-dir <path> --to <directory>`    | Copies the data directory and writes `backup.json`              |
| `sinterd verify-backup --from <directory>`             | Checks every file against its recorded size and checksum        |
| `sinterd restore --from <directory> --data-dir <path>` | Verifies, copies, then proves the copy recovers before using it |

`sinterd backup --help` lists the options. `backup` also accepts
`--reclaim-lock` for a directory whose lock was left by another host or
container. Only use it when no server can be using the directory.

Exit codes are 0 for success, 1 for a failure and 2 for a usage error.

## What is copied

Everything in the data directory except the `LOCK` file and temporary `*.tmp`
files: `manifest.json`, the write-ahead log and the checkpoints. The copy goes
into a temporary directory next to the destination, is flushed to disk, and is
renamed into place only when it is complete. A failed or interrupted backup
leaves no half-written destination.

## Destinations

The destination of a backup and the data directory of a restore must be missing
or empty. SinterDB never overwrites existing data. The two directories also
cannot be inside each other.

## What a restore checks

1. The backup passes the same check as `verify-backup`.
2. Each file is checksummed again as it is copied.
3. The copy is opened once as a database to prove it recovers.

Only then is it renamed to the data directory you asked for. If any step fails,
the data directory is not created and nothing is left behind.

## Backup format

`backup.json` has `format` (`sinterdb-backup`), `formatVersion` (currently
`1`), `createdAt`, the `storageFormatVersion` of the copied data and the list of
files. A backup written by a newer format version is refused rather than
guessed at. See [storage.md](./storage.md#storage-format-versions) for how
storage format versions are handled.

## Not covered yet

- Backing up while the server runs.
- Incremental backups. Every backup is a full copy.
- Compression and encryption. Protect backup directories like the data
  directory itself.
