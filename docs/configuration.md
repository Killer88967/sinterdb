# Configuration reference

This page lists every setting of the SinterDB server (`sinterd`, from the
`@sinterdb/cli` package) and the driver (`sinterdb`). Tests compare it with the
code, so an option that is missing here fails the build.

For connection strings, see [connection-strings.md](./connection-strings.md).

## Server

Start the server with options on the command line, in environment variables, or
both. When both are set, **the command line wins**, then the environment, then
the default.

| Option               | Flag                     | Environment variable        | Default     |
| -------------------- | ------------------------ | --------------------------- | ----------- |
| Listening address    | `--host <host>`          | `SINTERDB_HOST`             | `127.0.0.1` |
| Listening port       | `-p, --port <port>`      | `SINTERDB_PORT`             | `4721`      |
| Data directory       | `--data-dir <path>`      | `SINTERDB_DATA_DIR`         | none        |
| Durability mode      | `--durability <mode>`    | `SINTERDB_DURABILITY`       | `fsync`     |
| Checkpoint threshold | `--checkpoint-bytes <n>` | `SINTERDB_CHECKPOINT_BYTES` | `64 MiB`    |

Two more flags do not start a server: `-h, --help` prints the usage text, and
`-v, --version` prints the server version.

### Host and port

The server listens on `127.0.0.1` by default, so only programs on the same
machine can connect. Use `--host 0.0.0.0` (all IPv4 interfaces) or `--host ::`
(all interfaces) to accept connections from other machines or from outside a
container.

> **Authentication and TLS are not implemented yet.** Anyone who can reach the
> port can read and change every database. Only listen on a network you trust,
> and put a firewall or a private network in front of the server.

`--port 0` lets the operating system pick a free port. The `server.started` log
line reports the port that was chosen. The port must be an integer from 0 to 65535.

### Data directory

Without `--data-dir`, the server keeps everything in memory and **loses all
data when it stops**. With it, writes go to a write-ahead log in that directory
and survive a restart. The directory is created if it does not exist, and a
second server cannot open a directory that another is using. See
[storage.md](./storage.md) for the layout and recovery.

`--durability` and `--checkpoint-bytes` only make sense with a data directory.
Setting either one without `--data-dir` is a configuration error.

### Durability

| Mode       | A write is acknowledged when...     | Survives a server crash | Survives power loss |
| ---------- | ----------------------------------- | ----------------------- | ------------------- |
| `fsync`    | it has reached stable storage       | yes                     | yes                 |
| `buffered` | it has reached the operating system | yes                     | no, may be lost     |

`fsync` is the default and the safe choice. `buffered` is faster and fits data
you can recreate.

### Checkpoints

`--checkpoint-bytes` is how many bytes of log the server writes before it takes
an automatic checkpoint. It must be a positive integer. A checkpoint is also
taken when the server stops cleanly. A larger value means fewer checkpoints but
more log to replay after a crash.

### Stopping the server

`SIGINT` (Ctrl+C) and `SIGTERM` stop the server cleanly. It stops accepting new
connections and closes the existing ones, dropping any that are still open after
5 seconds. It then closes the storage engine, which writes a final checkpoint
when a data directory is set. A client that is connected at that moment sees its
connection close, so it cannot know whether a request that was in flight was
applied. A server that is killed (`SIGKILL`, power loss) recovers from the log
at its next start.

### Exit codes

| Code | Meaning                                                        |
| ---- | -------------------------------------------------------------- |
| `0`  | The server stopped cleanly, or `--help` / `--version` ran.     |
| `1`  | The server could not start, or hit an error while running.     |
| `2`  | The command line was invalid (unknown flag, bad `--help` use). |

A bad value such as `--port nope` is reported as a start failure (`1`) with the
reason in the log.

### Log output

The server writes one JSON object per line: informational events to standard
output, and warnings and errors to standard error. A client that disconnects
abruptly is logged as a `server.connection_error` warning and does not stop the
server; an `error` line with a `server.runtime_error` event does. The fields of a line are `timestamp`,
`level`, `event`, `message`, and `details`. The `server.started` event reports
the address and, with a data directory, what recovery did. The log format is
meant for people and is not covered by the compatibility promise in
[compatibility.md](./compatibility.md).

## Driver

`new SinterClient(connectionString, options)` accepts these options. Times are
in milliseconds.

| Option             | Default | Valid values             | Meaning                                                            |
| ------------------ | ------- | ------------------------ | ------------------------------------------------------------------ |
| `connectTimeoutMS` | `10000` | integer, 1 to 2147483647 | How long `connect()` waits for the connection and handshake.       |
| `requestTimeoutMS` | `10000` | integer, 1 to 2147483647 | How long one command waits for its response.                       |
| `socketTimeoutMS`  | `0`     | integer, 0 to 2147483647 | Close the connection after this long without any data. `0` is off. |

An out-of-range value throws `SinterClientOptionsError` from the constructor.

The database a client uses comes from its connection string
(`sinterdb://host/app`) or from `client.db("app")`. With neither,
`client.db()` throws `SinterNamespaceError`.

## Limits

| Limit                                   | Value          |
| --------------------------------------- | -------------- |
| Database and collection name length     | 255 bytes      |
| Size of one request or response payload | 16 MiB         |
| Nesting depth of a document             | 100 levels     |
| Indexes per collection                  | 32, plus `_id` |
| Index name length                       | 127 characters |
