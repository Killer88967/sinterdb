# Benchmarks

`pnpm bench` runs a small set of benchmarks against a real `sinterd` and the
real driver. They answer a plain question: how long do the everyday operations
take, on this machine? They are meant for getting a rough idea of cost and for
noticing when a change makes something much slower. They are not a way to
compare SinterDB with other databases.

## Run them

From a clone of the repository:

```bash
pnpm install
pnpm build
pnpm bench
```

A full run takes a minute or two. `pnpm bench -- --quick` uses a tiny workload
and finishes in seconds; it only checks that the benchmarks still run. Results
are printed as a table and written as JSON to `benchmarks/results/`, which git
ignores. Use `--out <file>` to choose the file.

Each scenario starts from a fresh server process on a temporary data
directory, talks to it over a local socket, and measures from the driver's
side, so the numbers include the driver, the network stack, and the server.

## What they measure

| Scenario                                   | What it does                                                                                                                                                                              |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ping`                                     | A round trip with no work in it: the floor for any request.                                                                                                                               |
| `insertMany, 100 per request`              | Loads the collection with 20,000 documents of about 430 bytes (nested fields, an array, a date) in batches of 100, with the default `fsync` durability. The rate is documents per second. |
| `createIndex x2`                           | Builds a unique index on `email` and an index on `age` over those documents. Other clients wait while it runs.                                                                            |
| `findOne by _id`                           | A lookup by `_id`, one request at a time.                                                                                                                                                 |
| `find, equality on an indexed field`       | One matching document found through an index.                                                                                                                                             |
| `find, equality on an unindexed field`     | The same, without an index: the server reads every document.                                                                                                                              |
| `find, range on an indexed field`          | About 1/60 of the documents, found through an index and returned to the client.                                                                                                           |
| `find all, read through a cursor`          | Reads every document with `for await`, in batches. The rate is documents per second.                                                                                                      |
| `findOne by _id, 8 clients at once`        | The same lookup from 8 connections in parallel. The server handles one request at a time, so this shows how well it keeps up, not a speed-up.                                             |
| `insertOne`, `updateOne $inc`, `deleteOne` | Single writes by `_id`, one at a time, in three configurations: on disk with `fsync` (the default), on disk with `buffered`, and in memory only.                                          |
| `start after a crash`                      | Time from starting the process to the `server.started` line after the previous server was killed with `SIGKILL`. It replays the whole write-ahead log.                                    |
| `start after a clean stop`                 | The same after a `SIGTERM`, which writes a checkpoint, so the server loads a snapshot instead.                                                                                            |

## A sample run

These numbers come from one full run on a small cloud virtual machine: Node.js
24.21.0, 2 x Intel(R) Xeon(R) Processor @ 2.80GHz, 7.8 GiB of memory, Linux
6.18.44-fc-v80.

| Scenario                                                  | Operations | Per second | p50 (µs) |  p99 (µs) | Total (ms) |
| --------------------------------------------------------- | ---------: | ---------: | -------: | --------: | ---------: |
| ping                                                      |      2,000 |      4,991 |      158 |       928 |        401 |
| insertMany, 100 per request (disk, fsync)                 |     20,000 |      9,416 |        - |         - |      2,124 |
| createIndex x2 on 20000 documents                         |          2 |          - |        - |         - |      1,783 |
| findOne by _id                                            |      5,000 |      3,143 |      268 |     1,044 |      1,591 |
| find, equality on an indexed field (1 match)              |      2,000 |      2,785 |      269 |     2,594 |        718 |
| find, equality on an unindexed field (full scan, 1 match) |         50 |       1.18 |  844,480 | 1,038,093 |     42,465 |
| find, range on an indexed field (about 1/60 of documents) |        500 |      35.15 |   27,676 |    47,105 |     14,226 |
| find all, read through a cursor                           |     20,000 |     11,308 |        - |         - |      1,769 |
| findOne by _id, 8 clients at once                         |      8,000 |      5,133 |    1,160 |     6,744 |      1,559 |
| insertOne (disk, fsync)                                   |        500 |      1,308 |      670 |     1,959 |        382 |
| updateOne $inc (disk, fsync)                              |        500 |      1,371 |      620 |     2,721 |        365 |
| deleteOne (disk, fsync)                                   |        500 |      1,553 |      596 |     1,665 |        322 |
| insertOne (disk, buffered)                                |      2,000 |      2,705 |      282 |     1,737 |        739 |
| updateOne $inc (disk, buffered)                           |      1,000 |      2,379 |      333 |     1,751 |        420 |
| deleteOne (disk, buffered)                                |      1,000 |      3,526 |      224 |     1,302 |        284 |
| insertOne (memory only)                                   |      2,000 |      2,825 |      262 |     1,629 |        708 |
| updateOne $inc (memory only)                              |      1,000 |      2,354 |      320 |     1,909 |        425 |
| deleteOne (memory only)                                   |      1,000 |      3,981 |      196 |     1,175 |        251 |
| start after a crash, 20000 documents                      |     20,000 |          - |        - |         - |      1,050 |
| start after a clean stop, 20000 documents                 |     20,000 |          - |        - |         - |      1,192 |

Latencies are per request, in microseconds. `p50` is the median and `p99` the
slowest one request in a hundred.

## Reading the numbers

- **Expect different numbers on your machine.** Disks, CPUs, and operating
  systems vary a great deal. This sample ran on a virtual machine whose disk
  may not behave like yours.
- **`fsync` costs depend on your disk.** The gap between the `fsync` and
  `buffered` rows shows the cost of waiting for the disk here. On hardware
  where a flush is slow, the gap is much larger, and `insertMany` helps a lot
  because one flush covers the whole batch.
- **Indexes matter more than anything else.** With an index, finding one
  document took well under a millisecond. Without one, the server read all
  20,000 documents and one query took most of a second, because documents are
  kept in encoded form and a scan has to decode each one. Index the fields you
  filter on. See [indexes.md](./indexes.md).
- **Writes and reads share one thread.** One slow query delays every other
  client, which is why the parallel read does not scale with the number of
  clients. See [limitations.md](./limitations.md).
- **A restart reads the whole dataset.** Startup time grows with the amount of
  data and the number of indexes, because indexes are rebuilt on every start.
  See [storage.md](./storage.md).
- Each scenario runs once. Run it a few times and compare medians before
  you decide that a change made something faster or slower.
