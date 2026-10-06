// A child process for crash tests. It opens a data directory, performs a
// deterministic stream of writes, and reports each one on stdout so the parent
// knows what was acknowledged before it kills this process with SIGKILL.
//
// Protocol (one line each):
//   READY <json>        the engine opened and recovered
//   BEGIN <n> <json>    operation n is about to run
//   ACK <n>             operation n returned, so it was acknowledged
//   DONE                the operation limit was reached

import { writeSync } from "node:fs";

const config = JSON.parse(process.argv[2]);
const { StorageEngine } = await import(config.storageModule);

const KEYS = 50;
const GROUPS = 5;

function send(line) {
  const bytes = Buffer.from(`${line}\n`);
  let offset = 0;

  while (offset < bytes.length) {
    try {
      offset += writeSync(1, bytes, offset, bytes.length - offset);
    } catch (error) {
      if (error.code !== "EAGAIN") {
        throw error;
      }
    }
  }
}

function createRandom(seed) {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;

    let t = state;

    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = createRandom(config.seed);
const pick = (items) => items[Math.floor(random() * items.length)];
let stageHits = 0;

const engine = StorageEngine.open({
  directory: config.directory,
  durability: config.durability,
  segmentSizeBytes: config.segmentSizeBytes,
  checkpointThresholdBytes: config.checkpointThresholdBytes,
  checkpointOnClose: false,
  onCheckpointStage: (stage) => {
    if (config.crashAtStage === stage) {
      stageHits += 1;

      if (stageHits === config.crashOnNth) {
        process.kill(process.pid, "SIGKILL");
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10000);
      }
    }
  },
});

send(
  `READY ${JSON.stringify({
    replayedRecords: engine.recovery.replayedRecords,
    checkpointLsn: String(engine.recovery.checkpointLsn),
    skippedCheckpoints: engine.recovery.skippedCheckpoints.length,
  })}`,
);

const items = engine.openCollection("crash", "items");
const pad = "x".repeat(24);

function chooseOperation() {
  const documents = [...items.find({})];
  const present = new Map(
    documents.map((document) => [document.key, document]),
  );
  const absent = [];

  for (let key = 0; key < KEYS; key += 1) {
    if (!present.has(key)) {
      absent.push(key);
    }
  }

  const groups = [...new Set(documents.map((document) => document.group))];
  const kinds = [];

  if (absent.length > 0) {
    kinds.push("insert", "insert", "insert");
  }

  if (absent.length >= 3) {
    kinds.push("insertMany", "insertMany");
  }

  if (present.size > 0) {
    kinds.push("set", "set", "delete", "replace");
  }

  if (groups.length > 0) {
    kinds.push("inc", "inc", "inc");
  }

  if (groups.length > 2) {
    kinds.push("deleteGroup");
  }

  const kind = pick(kinds);
  const group = Math.floor(random() * GROUPS);

  switch (kind) {
    case "insert":
      return { kind, key: pick(absent), group };

    case "insertMany": {
      const keys = [];

      while (keys.length < 3) {
        const key = pick(absent);

        if (!keys.includes(key)) {
          keys.push(key);
        }
      }

      return { kind, keys, group };
    }

    case "set":
      return {
        kind,
        key: pick([...present.keys()]),
        v: 1 + Math.floor(random() * 9999),
      };

    case "delete":
      return { kind, key: pick([...present.keys()]) };

    case "replace": {
      const key = pick([...present.keys()]);

      return { kind, key, group, v: 1 + Math.floor(random() * 9999) };
    }

    case "inc":
      return { kind, group: pick(groups) };

    default:
      return { kind: "deleteGroup", group: pick(groups) };
  }
}

function apply(operation) {
  switch (operation.kind) {
    case "insert":
      items.insertOne({
        key: operation.key,
        group: operation.group,
        v: 0,
        pad,
      });
      break;

    case "insertMany":
      items.insertMany(
        operation.keys.map((key) => ({
          key,
          group: operation.group,
          v: 0,
          pad,
        })),
      );
      break;

    case "set":
      items.updateMany({ key: operation.key }, { $set: { v: operation.v } });
      break;

    case "inc":
      items.updateMany({ group: operation.group }, { $inc: { v: 1 } });
      break;

    case "delete":
      items.deleteMany({ key: operation.key });
      break;

    case "deleteGroup":
      items.deleteMany({ group: operation.group });
      break;

    case "replace":
      items.replaceOne(
        { key: operation.key },
        {
          key: operation.key,
          group: operation.group,
          v: operation.v,
          extra: "r",
          pad,
        },
      );
      break;

    default:
      throw new Error(`Unknown operation ${operation.kind}`);
  }
}

for (let index = 0; index < config.maxOps; index += 1) {
  const operation = chooseOperation();

  send(`BEGIN ${index} ${JSON.stringify(operation)}`);
  apply(operation);
  send(`ACK ${index}`);
}

send("DONE");
process.exit(0);
