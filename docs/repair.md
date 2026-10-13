# Inspecting and repairing a data directory

Two commands look at a data directory that will not open, or that you do not
trust, and fix what can be fixed safely. Run `sinterd inspect --help` for the
options.

```sh
sinterd inspect --data-dir ./data
sinterd repair --data-dir ./data
sinterd repair --data-dir ./data --apply
```

If you have a backup, [restoring it](./backup.md) is usually the better answer
to a damaged directory. Repair is for when you do not, or when the backup is
older than you would like.

## inspect

`inspect` reads the directory and says whether the server could open it. It
never changes anything, takes no lock and can run while a server is using the
directory (the answer is then a snapshot of that moment). It reports:

- the manifest: its status, the storage format version and whether the next
  start upgrades the files
- the lock file: who holds it and whether that process is still running
- every snapshot: whether its checksum holds, and how many collections and
  documents it contains
- every log segment: its range of log sequence numbers, how many records are
  intact, and the first damaged byte if there is one
- temporary files a crash left behind (the server removes them on start)
- a verdict, with the same checks the server makes on start: the snapshot it
  would start from, how many records it would replay, and why it would refuse

A torn end on the newest log segment is normal after a crash and is reported
but not treated as damage. The server cuts it off when it starts.

Add `--json` for a machine-readable report. Log sequence numbers are strings
in the JSON. `inspect` exits with 0 when the directory can be opened and 1
when it cannot. `inspect` checks files, not documents: a record whose checksum
holds but whose contents the server cannot understand is only found when the
server replays it.

## repair

`repair` works out what to change from the same report. **Without `--apply` it
changes nothing** and prints the steps it would take. With `--apply` it takes
the directory lock (so a running server is never touched), carries out the
steps and inspects the directory again.

Nothing is deleted. Files it removes are moved to
`quarantine/<UTC time>/` inside the data directory, keeping their relative
paths. When it cuts a log segment short, the bytes it cut off are saved next to
it with a `.tail` suffix. Delete the quarantine yourself when you are sure you
do not need it. Backups do not include it.

### What it can fix

| Situation                                                                                       | Step                                                                | Needs                |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------- |
| Old log segments are damaged or missing, but a snapshot already covers everything they recorded | Move the useless segments to quarantine. No data is lost            | nothing              |
| The log is damaged after the newest snapshot                                                    | Cut the log at the last intact record, quarantining what follows    | `--allow-data-loss`  |
| The log ends before the newest snapshot (segments were lost)                                    | Quarantine the log and start a new empty segment after the snapshot | `--allow-data-loss`  |
| `manifest.json` is missing or unreadable                                                        | Write a new manifest for the current storage format version         | `--rebuild-manifest` |
| The lock file was left by another host or container                                             | Take it over                                                        | `--clear-lock`       |

A step that is not allowed is listed but skipped, and the exit code is 1.

`--allow-data-loss` is named for what it does: records after the point of
damage, which are in no snapshot, are not recovered. The steps that need it
are marked `can lose data` in the plan. Check the plan before adding the flag,
and consider copying the directory first.

`--rebuild-manifest` assumes the files were written by this version of
SinterDB. If you are not sure, restore from a backup instead.

### What it will not do

- Change a manifest that belongs to another kind of directory or to a newer
  storage format version.
- Rebuild history that is gone. If log records before the oldest log segment
  are missing and no readable snapshot covers them, it says so and stops.
- Run while a process on the same host holds the lock. A lock from another
  host or container is only taken over with `--clear-lock`.
- Repair individual documents. It works on whole files and whole log records.

### Exit codes

`repair` exits with 0 when the directory can be opened (or, after `--apply`,
now can be) and nothing was skipped, and with 1 otherwise. A dry run exits 0
only when there is nothing to repair. A usage error exits with 2.

## When the problem is the disk

If the damage came from a failing disk or a full volume, fix that first, then
run `inspect` again. See [storage.md](./storage.md#when-a-disk-write-fails) for
how the server reports disk errors.
