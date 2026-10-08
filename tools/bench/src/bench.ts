import { mkdirSync, writeFileSync } from "node:fs";
import { cpus, platform, release, totalmem } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import { CustomId, SinterClient } from "sinterdb";

import {
  measureBulk,
  measureParallel,
  measureSequential,
  startServer,
  temporaryDirectory,
  type Measurement,
  type RunningServer,
} from "./harness.ts";
import { toMarkdown } from "./report.ts";

// Basic benchmarks for a developer preview: how long do the everyday
// operations take on this machine? They run a real `sinterd` and the real
// driver over a local socket, one scenario after another. They are meant for
// spotting large changes and for giving a rough idea of cost, not for
// comparing databases. See docs/benchmarks.md.

const USAGE = `Usage: pnpm bench [--quick] [--out <file>]

  --quick        Use a tiny workload. Finishes in seconds; for checking that the
                 benchmarks still run, not for measuring anything.
  --out <file>   Write the results as JSON to this file. Default:
                 benchmarks/results/<timestamp>.json (ignored by git).
  -h, --help     Show this text.
`;

interface Person {
  name: string;
  email: string;
  age: number;
  tags: string[];
  profile: { level: number; bio: string };
  createdAt: Date;
}

interface Workload {
  readonly pings: number;
  readonly sequentialWrites: number;
  readonly bufferedWrites: number;
  readonly bulkDocuments: number;
  readonly bulkBatch: number;
  readonly collectionSize: number;
  readonly pointReads: number;
  readonly indexedQueries: number;
  readonly scanQueries: number;
  readonly rangeQueries: number;
  readonly updates: number;
  readonly parallelClients: number;
  readonly parallelReads: number;
  readonly recoveryDocuments: number;
}

const FULL: Workload = {
  pings: 2_000,
  sequentialWrites: 500,
  bufferedWrites: 2_000,
  bulkDocuments: 20_000,
  bulkBatch: 100,
  collectionSize: 20_000,
  pointReads: 5_000,
  indexedQueries: 2_000,
  scanQueries: 50,
  rangeQueries: 500,
  updates: 1_000,
  parallelClients: 8,
  parallelReads: 8_000,
  recoveryDocuments: 20_000,
};

const QUICK: Workload = {
  pings: 50,
  sequentialWrites: 20,
  bufferedWrites: 50,
  bulkDocuments: 400,
  bulkBatch: 100,
  collectionSize: 400,
  pointReads: 100,
  indexedQueries: 50,
  scanQueries: 5,
  rangeQueries: 20,
  updates: 40,
  parallelClients: 4,
  parallelReads: 200,
  recoveryDocuments: 400,
};

const BIO = "A short biography that makes each document a realistic size. "
  .repeat(4)
  .trim();

function person(index: number): Person {
  return {
    name: `Person ${index}`,
    email: `person${index}@example.com`,
    age: 18 + (index % 60),
    tags: ["alpha", "beta", `group-${index % 50}`],
    profile: { level: index % 100, bio: BIO },
    createdAt: new Date(1_700_000_000_000 + index * 1000),
  };
}

async function connect(server: RunningServer): Promise<SinterClient> {
  const client = new SinterClient(server.url);

  await client.connect();

  return client;
}

async function writeScenarios(
  workload: Workload,
  server: RunningServer,
  label: string,
): Promise<Measurement[]> {
  const client = await connect(server);

  try {
    const people = client.db().collection<Person>("write");
    const results: Measurement[] = [];
    const count =
      label === "disk, fsync"
        ? workload.sequentialWrites
        : workload.bufferedWrites;
    const ids: CustomId[] = [];

    results.push(
      await measureSequential(
        `insertOne (${label})`,
        count,
        async (index) => {
          const { insertedId } = await people.insertOne(person(index));

          ids.push(insertedId);
        },
        "one document per request, waiting for each",
      ),
    );

    results.push(
      await measureSequential(
        `updateOne $inc (${label})`,
        Math.min(workload.updates, ids.length),
        (index) =>
          people.updateOne(
            { _id: ids[index] as CustomId },
            { $inc: { age: 1 } },
          ),
        "by _id",
      ),
    );

    results.push(
      await measureSequential(
        `deleteOne (${label})`,
        Math.min(workload.updates, ids.length),
        (index) => people.deleteOne({ _id: ids[index] as CustomId }),
        "by _id",
      ),
    );

    return results;
  } finally {
    await client.close();
  }
}

async function readScenarios(
  workload: Workload,
  server: RunningServer,
): Promise<Measurement[]> {
  const client = await connect(server);

  try {
    const people = client.db().collection<Person>("people");
    const results: Measurement[] = [];
    const ids: CustomId[] = [];

    results.push(
      await measureSequential("ping", workload.pings, () => client.ping()),
    );

    results.push(
      await measureBulk(
        `insertMany, ${workload.bulkBatch} per request (disk, fsync)`,
        workload.bulkDocuments,
        async () => {
          for (
            let start = 0;
            start < workload.bulkDocuments;
            start += workload.bulkBatch
          ) {
            const batch = Array.from(
              {
                length: Math.min(
                  workload.bulkBatch,
                  workload.bulkDocuments - start,
                ),
              },
              (_unused, offset) => person(start + offset),
            );
            const result = await people.insertMany(batch);

            ids.push(...result.insertedIds);
          }
        },
        "operations are documents",
      ),
    );

    // Build indexes after loading, so index maintenance is not in the numbers
    // above, then measure the queries they serve.
    const indexStart = performance.now();

    await people.createIndex({ field: "email", unique: true });
    await people.createIndex({ field: "age" });

    results.push({
      name: `createIndex x2 on ${workload.bulkDocuments} documents`,
      operations: 2,
      totalMS: Math.round((performance.now() - indexStart) * 100) / 100,
      operationsPerSecond: 0,
      note: "total time for both indexes; blocks other requests while it runs",
    });

    results.push(
      await measureSequential("findOne by _id", workload.pointReads, (index) =>
        people.findOne({ _id: ids[(index * 7919) % ids.length] as CustomId }),
      ),
    );

    results.push(
      await measureSequential(
        "find, equality on an indexed field (1 match)",
        workload.indexedQueries,
        (index) =>
          people
            .find({
              email: `person${(index * 7919) % workload.bulkDocuments}@example.com`,
            })
            .toArray(),
      ),
    );

    results.push(
      await measureSequential(
        "find, equality on an unindexed field (full scan, 1 match)",
        workload.scanQueries,
        (index) =>
          people
            .find({ name: `Person ${(index * 7919) % workload.bulkDocuments}` })
            .toArray(),
        "reads every document",
      ),
    );

    results.push(
      await measureSequential(
        "find, range on an indexed field (about 1/60 of documents)",
        workload.rangeQueries,
        () => people.find({ age: { $gte: 30, $lt: 31 } }).toArray(),
      ),
    );

    results.push(
      await measureBulk(
        "find all, read through a cursor",
        workload.bulkDocuments,
        async () => {
          let seen = 0;

          for await (const _document of people.find()) {
            seen += 1;
          }

          if (seen !== workload.bulkDocuments) {
            throw new Error(
              `Expected ${workload.bulkDocuments}, read ${seen}.`,
            );
          }
        },
        "operations are documents",
      ),
    );

    const clients = await Promise.all(
      Array.from({ length: workload.parallelClients }, () => connect(server)),
    );

    try {
      results.push(
        await measureParallel(
          `findOne by _id, ${workload.parallelClients} clients at once`,
          workload.parallelReads,
          workload.parallelClients,
          (worker, index) =>
            clients[worker]!.db()
              .collection<Person>("people")
              .findOne({
                _id: ids[(index * 7919 + worker) % ids.length] as CustomId,
              }),
          "the server handles one request at a time",
        ),
      );
    } finally {
      await Promise.all(clients.map((other) => other.close()));
    }

    return results;
  } finally {
    await client.close();
  }
}

async function recoveryScenarios(workload: Workload): Promise<Measurement[]> {
  const directory = temporaryDirectory();
  const results: Measurement[] = [];

  try {
    let server = await startServer({ dataDirectory: directory.path });
    let client = await connect(server);
    const people = client.db().collection<Person>("people");

    for (let start = 0; start < workload.recoveryDocuments; start += 100) {
      await people.insertMany(
        Array.from({ length: 100 }, (_unused, offset) =>
          person(start + offset),
        ),
      );
    }

    await people.createIndex({ field: "email", unique: true });
    await client.close();

    // A crash: no final checkpoint, so every record is replayed from the log.
    await server.kill();
    server = await startServer({ dataDirectory: directory.path });
    results.push({
      name: `start after a crash, ${workload.recoveryDocuments} documents`,
      operations: workload.recoveryDocuments,
      totalMS: Math.round(server.startupMS * 100) / 100,
      operationsPerSecond: 0,
      note: `replayed ${String(server.startedDetails["replayedRecords"])} log records; includes process start`,
    });

    client = await connect(server);
    await client.close();

    // A clean stop writes a checkpoint, so the next start loads a snapshot.
    await server.stop();
    server = await startServer({ dataDirectory: directory.path });
    results.push({
      name: `start after a clean stop, ${workload.recoveryDocuments} documents`,
      operations: workload.recoveryDocuments,
      totalMS: Math.round(server.startupMS * 100) / 100,
      operationsPerSecond: 0,
      note: `replayed ${String(server.startedDetails["replayedRecords"])} log records; includes process start`,
    });
    await server.stop();
  } finally {
    directory.remove();
  }

  return results;
}

async function withServer<T>(
  options: Parameters<typeof startServer>[0],
  run: (server: RunningServer) => Promise<T>,
): Promise<T> {
  const server = await startServer(options);

  try {
    return await run(server);
  } finally {
    await server.stop();
  }
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      quick: { type: "boolean" },
      out: { type: "string" },
      help: { type: "boolean", short: "h" },
    },
  });

  if (values.help === true) {
    console.log(USAGE);
    return;
  }

  const workload = values.quick === true ? QUICK : FULL;
  const results: Measurement[] = [];
  const directories = [
    temporaryDirectory(),
    temporaryDirectory(),
    temporaryDirectory(),
  ];

  try {
    console.error(
      values.quick === true
        ? "Quick run."
        : "Full run; this takes a few minutes.",
    );

    console.error("Reads and bulk writes (disk, fsync)...");
    results.push(
      ...(await withServer(
        { dataDirectory: directories[0]!.path, durability: "fsync" },
        (server) => readScenarios(workload, server),
      )),
    );

    console.error("Single writes with fsync...");
    results.push(
      ...(await withServer(
        { dataDirectory: directories[1]!.path, durability: "fsync" },
        (server) => writeScenarios(workload, server, "disk, fsync"),
      )),
    );

    console.error("Single writes with buffered durability...");
    results.push(
      ...(await withServer(
        { dataDirectory: directories[2]!.path, durability: "buffered" },
        (server) => writeScenarios(workload, server, "disk, buffered"),
      )),
    );

    console.error("Single writes in memory only...");
    results.push(
      ...(await withServer({}, (server) =>
        writeScenarios(workload, server, "memory only"),
      )),
    );

    console.error("Restarts...");
    results.push(...(await recoveryScenarios(workload)));
  } finally {
    for (const directory of directories) {
      directory.remove();
    }
  }

  const environment = {
    node: process.versions.node,
    platform: `${platform()} ${release()}`,
    cpu: cpus()[0]?.model ?? "unknown",
    cpuCount: cpus().length,
    memoryGiB: Math.round((totalmem() / 1024 ** 3) * 10) / 10,
    quick: values.quick === true,
  };
  const outputFile =
    values.out ??
    join(
      fileURLToPath(new URL("../../../benchmarks/results/", import.meta.url)),
      `${new Date().toISOString().replaceAll(":", "-")}.json`,
    );

  mkdirSync(join(outputFile, ".."), { recursive: true });
  writeFileSync(
    outputFile,
    `${JSON.stringify({ environment, workload, results }, null, 2)}\n`,
  );

  console.log(
    `Node ${environment.node} on ${environment.platform}; ${environment.cpuCount} x ${environment.cpu}; ${environment.memoryGiB} GiB\n`,
  );
  console.log(toMarkdown(results));
  console.error(`\nResults written to ${outputFile}`);
}

await main();
