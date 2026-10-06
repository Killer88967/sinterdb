import { spawn } from "node:child_process";
import {
  appendFileSync,
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  truncateSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { StorageError } from "../errors.js";
import { StorageEngine } from "./storage-engine.js";

// These tests run a real child process against the built storage package and
// kill it with SIGKILL, so `pnpm build` must have run first.
const WORKER = fileURLToPath(
  new URL("../../test-support/crash-worker.mjs", import.meta.url),
);
const STORAGE_MODULE_URL = new URL("../../dist/index.js", import.meta.url);

interface Operation {
  kind: string;
  key?: number;
  keys?: number[];
  group?: number;
  v?: number;
}

interface Row {
  group: number;
  v: number;
  extra: boolean;
}

type Model = Map<number, Row>;
type Durability = "fsync" | "buffered";

interface WorkerConfig {
  directory: string;
  durability: Durability;
  seed: number;
  maxOps: number;
  segmentSizeBytes?: number;
  checkpointThresholdBytes?: number;
  crashAtStage?: string;
  crashOnNth?: number;
}

type Stop = { afterAcks: number } | { afterMs: number } | { selfKill: true };

interface WorkerResult {
  acked: Operation[];
  inflight: Operation | undefined;
  signal: NodeJS.Signals | null;
}

let root: string;

beforeEach(() => {
  if (!existsSync(fileURLToPath(STORAGE_MODULE_URL))) {
    throw new Error(
      "The storage package is not built. Run `pnpm build` before the crash tests.",
    );
  }

  root = mkdtempSync(join(tmpdir(), "sinterdb-crash-"));
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

function createRandom(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;

    let t = state;

    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cloneModel(model: Model): Model {
  return new Map([...model].map(([key, row]) => [key, { ...row }]));
}

function applyOperation(model: Model, operation: Operation): void {
  switch (operation.kind) {
    case "insert":
      model.set(operation.key as number, {
        group: operation.group as number,
        v: 0,
        extra: false,
      });
      break;

    case "insertMany":
      for (const key of operation.keys as number[]) {
        model.set(key, {
          group: operation.group as number,
          v: 0,
          extra: false,
        });
      }

      break;

    case "set": {
      const row = model.get(operation.key as number);

      if (row !== undefined) {
        row.v = operation.v as number;
      }

      break;
    }

    case "inc":
      for (const row of model.values()) {
        if (row.group === operation.group) {
          row.v += 1;
        }
      }

      break;

    case "delete":
      model.delete(operation.key as number);
      break;

    case "deleteGroup":
      for (const [key, row] of [...model]) {
        if (row.group === operation.group) {
          model.delete(key);
        }
      }

      break;

    case "replace":
      if (model.has(operation.key as number)) {
        model.set(operation.key as number, {
          group: operation.group as number,
          v: operation.v as number,
          extra: true,
        });
      }

      break;

    default:
      throw new Error(`Unknown operation ${operation.kind}`);
  }
}

function serialize(model: Model): string {
  return JSON.stringify([...model].sort((left, right) => left[0] - right[0]));
}

function readModel(engine: StorageEngine): Model {
  const model: Model = new Map();

  for (const document of engine.getCollection("crash", "items")?.find({}) ??
    []) {
    const key = document["key"] as number;

    if (model.has(key)) {
      throw new Error(`Recovered a duplicate document for key ${key}.`);
    }

    model.set(key, {
      group: document["group"] as number,
      v: document["v"] as number,
      extra: document["extra"] === "r",
    });
  }

  return model;
}

function runWorker(config: WorkerConfig, stop: Stop): Promise<WorkerResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        WORKER,
        JSON.stringify({ ...config, storageModule: STORAGE_MODULE_URL.href }),
      ],
      { stdio: ["ignore", "pipe", "pipe"] },
    );
    const begun = new Map<number, Operation>();
    const acked: Operation[] = [];
    let ackedIndexes = 0;
    let buffer = "";
    let stderr = "";
    let killed = false;
    let timer: NodeJS.Timeout | undefined;

    const kill = (): void => {
      if (!killed) {
        killed = true;
        child.kill("SIGKILL");
      }
    };

    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      buffer += chunk;

      for (
        let newline = buffer.indexOf("\n");
        newline >= 0;
        newline = buffer.indexOf("\n")
      ) {
        const line = buffer.slice(0, newline);

        buffer = buffer.slice(newline + 1);

        if (line.startsWith("BEGIN ")) {
          const [, index, json] = /^BEGIN (\d+) (.*)$/.exec(line) as string[];

          begun.set(Number(index), JSON.parse(json as string) as Operation);
        } else if (line.startsWith("ACK ")) {
          const index = Number(line.slice(4));

          acked.push(begun.get(index) as Operation);
          begun.delete(index);
          ackedIndexes += 1;
        }
      }

      if ("afterAcks" in stop && ackedIndexes >= stop.afterAcks) {
        kill();
      }
    });
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk: string) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code, signal) => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }

      if (signal === null && code !== 0) {
        reject(new Error(`The worker exited with code ${code}: ${stderr}`));

        return;
      }

      resolve({
        acked,
        inflight: [...begun.values()][0],
        signal,
      });
    });

    if ("afterMs" in stop) {
      timer = setTimeout(kill, stop.afterMs);
    }
  });
}

function describeState(model: Model): string {
  return `${model.size} rows: ${serialize(model).slice(0, 400)}`;
}

function verifyRecovery(
  directory: string,
  previous: Model,
  result: WorkerResult,
  label: string,
): { model: Model; applied: Operation[] } {
  const acknowledged = cloneModel(previous);

  for (const operation of result.acked) {
    applyOperation(acknowledged, operation);
  }

  let withInflight: Model | undefined;

  if (result.inflight !== undefined) {
    withInflight = cloneModel(acknowledged);
    applyOperation(withInflight, result.inflight);
  }

  const engine = StorageEngine.open({ directory, checkpointOnClose: false });
  let recovered: Model;

  try {
    recovered = readModel(engine);
  } finally {
    engine.close();
  }

  const actual = serialize(recovered);

  if (actual === serialize(acknowledged)) {
    return { model: acknowledged, applied: result.acked };
  }

  if (withInflight !== undefined && actual === serialize(withInflight)) {
    return {
      model: withInflight,
      applied: [...result.acked, result.inflight as Operation],
    };
  }

  throw new Error(
    `${label}: recovered state matches neither the acknowledged writes nor those plus the in-flight one.\n` +
      `in flight: ${JSON.stringify(result.inflight)}\n` +
      `expected: ${describeState(acknowledged)}\n` +
      `actual:   ${describeState(recovered)}`,
  );
}

interface RoundsOptions {
  directory: string;
  durability: Durability;
  rounds: number;
  seed: number;
  segmentSizeBytes?: number;
  checkpointThresholdBytes?: number;
}

async function runRounds(
  options: RoundsOptions,
): Promise<{ model: Model; history: Operation[]; kills: number }> {
  const random = createRandom(options.seed);
  let model: Model = new Map();
  const history: Operation[] = [];
  let kills = 0;

  for (let round = 0; round < options.rounds; round += 1) {
    const stop: Stop =
      round % 2 === 0
        ? { afterAcks: 1 + Math.floor(random() * 150) }
        : { afterMs: 30 + Math.floor(random() * 250) };
    const result = await runWorker(
      {
        directory: options.directory,
        durability: options.durability,
        seed: options.seed * 1000 + round,
        maxOps: 100_000,
        ...(options.segmentSizeBytes === undefined
          ? {}
          : { segmentSizeBytes: options.segmentSizeBytes }),
        ...(options.checkpointThresholdBytes === undefined
          ? {}
          : { checkpointThresholdBytes: options.checkpointThresholdBytes }),
      },
      stop,
    );

    if (result.signal === "SIGKILL") {
      kills += 1;
    }

    const outcome = verifyRecovery(
      options.directory,
      model,
      result,
      `round ${round} (seed ${options.seed})`,
    );

    model = outcome.model;
    history.push(...outcome.applied);
  }

  return { model, history, kills };
}

function snapshotCount(directory: string): number {
  return readdirSync(join(directory, "checkpoints")).filter((name) =>
    name.endsWith(".snap"),
  ).length;
}

describe("killing the process with SIGKILL during writes", () => {
  const configurations: {
    name: string;
    durability: Durability;
    segmentSizeBytes?: number;
    checkpointThresholdBytes?: number;
    seed: number;
  }[] = [
    {
      name: "fsync with constant checkpoints and tiny segments",
      durability: "fsync",
      segmentSizeBytes: 1024,
      checkpointThresholdBytes: 700,
      seed: 11,
    },
    {
      name: "buffered with constant checkpoints and tiny segments",
      durability: "buffered",
      segmentSizeBytes: 1024,
      checkpointThresholdBytes: 700,
      seed: 22,
    },
    {
      name: "fsync with default checkpoints and tiny segments",
      durability: "fsync",
      segmentSizeBytes: 2048,
      seed: 33,
    },
    {
      name: "buffered with infrequent checkpoints",
      durability: "buffered",
      checkpointThresholdBytes: 5000,
      seed: 44,
    },
  ];

  for (const configuration of configurations) {
    it(
      `keeps every acknowledged write: ${configuration.name}`,
      { timeout: 120_000 },
      async () => {
        const directory = join(root, "data");
        const { kills } = await runRounds({
          directory,
          durability: configuration.durability,
          rounds: 14,
          seed: configuration.seed,
          ...(configuration.segmentSizeBytes === undefined
            ? {}
            : { segmentSizeBytes: configuration.segmentSizeBytes }),
          ...(configuration.checkpointThresholdBytes === undefined
            ? {}
            : {
                checkpointThresholdBytes:
                  configuration.checkpointThresholdBytes,
              }),
        });

        expect(kills).toBeGreaterThanOrEqual(10);

        if (
          configuration.checkpointThresholdBytes !== undefined &&
          configuration.checkpointThresholdBytes <= 1000
        ) {
          expect(snapshotCount(directory)).toBeGreaterThan(0);
        }
      },
    );
  }
});

describe("killing the process in the middle of a checkpoint", () => {
  const stages = [
    "snapshot-written",
    "snapshot-renamed",
    "snapshots-pruned",
    "log-truncated",
  ];

  for (const durability of ["fsync", "buffered"] as const) {
    for (const stage of stages) {
      it(
        `recovers after SIGKILL at ${stage} in ${durability} mode`,
        { timeout: 60_000 },
        async () => {
          const directory = join(root, "data");
          const first = await runWorker(
            {
              directory,
              durability,
              seed: 7,
              maxOps: 50_000,
              segmentSizeBytes: 1024,
              checkpointThresholdBytes: 600,
              crashAtStage: stage,
              crashOnNth: 3,
            },
            { selfKill: true },
          );

          expect(first.signal).toBe("SIGKILL");

          const afterCrash = verifyRecovery(
            directory,
            new Map(),
            first,
            `crash at ${stage}`,
          );

          const second = await runWorker(
            {
              directory,
              durability,
              seed: 8,
              maxOps: 100_000,
              segmentSizeBytes: 1024,
              checkpointThresholdBytes: 600,
            },
            { afterAcks: 80 },
          );

          verifyRecovery(directory, afterCrash.model, second, "after restart");
        },
      );
    }
  }
});

describe("damaged files after a crash", () => {
  function listFiles(directory: string): string[] {
    const files = [join(directory, "manifest.json")];

    for (const folder of ["wal", "checkpoints"]) {
      for (const name of readdirSync(join(directory, folder))) {
        files.push(join(directory, folder, name));
      }
    }

    return files;
  }

  function damage(path: string, random: () => number): string {
    const action = Math.floor(random() * 5);
    const size = statSync(path).size;

    switch (action) {
      case 0: {
        const bytes = readFileSync(path);
        const index = Math.floor(random() * bytes.byteLength);

        bytes[index] =
          (bytes[index] as number) ^ (1 << Math.floor(random() * 8));
        writeFileSync(path, bytes);

        return `flipped a bit at ${index}`;
      }

      case 1: {
        const length = Math.floor(random() * size);

        truncateSync(path, length);

        return `truncated to ${length}`;
      }

      case 2:
        unlinkSync(path);

        return "deleted";

      case 3:
        appendFileSync(path, Buffer.alloc(4096));

        return "appended zeros";

      default: {
        const bytes = readFileSync(path);
        const start = Math.floor(random() * Math.max(1, bytes.byteLength - 16));

        for (
          let index = start;
          index < Math.min(bytes.byteLength, start + 16);
          index += 1
        ) {
          bytes[index] = Math.floor(random() * 256);
        }

        writeFileSync(path, bytes);

        return `overwrote 16 bytes at ${start}`;
      }
    }
  }

  it(
    "either recovers a state that really existed or refuses with a clear error",
    { timeout: 120_000 },
    async () => {
      const directory = join(root, "data");
      const { history } = await runRounds({
        directory,
        durability: "fsync",
        rounds: 4,
        seed: 55,
        segmentSizeBytes: 1024,
        checkpointThresholdBytes: 700,
      });

      const validStates = new Set<string>();
      const replay: Model = new Map();

      validStates.add(serialize(replay));

      for (const operation of history) {
        applyOperation(replay, operation);
        validStates.add(serialize(replay));
      }

      expect(history.length).toBeGreaterThan(20);

      const random = createRandom(99);
      let recovered = 0;
      let refused = 0;

      for (let trial = 0; trial < 80; trial += 1) {
        const copy = join(root, `copy-${trial}`);

        cpSync(directory, copy, { recursive: true });

        const files = listFiles(copy);
        const target = files[Math.floor(random() * files.length)] as string;
        const description = damage(target, random);
        const label = `trial ${trial}: ${description} on ${target.slice(copy.length + 1)}`;

        let engine: StorageEngine | undefined;

        try {
          engine = StorageEngine.open({
            directory: copy,
            checkpointOnClose: false,
          });

          const state = serialize(readModel(engine));

          expect(
            validStates.has(state),
            `${label} produced a state that never existed`,
          ).toBe(true);
          recovered += 1;
        } catch (error: unknown) {
          if (error instanceof StorageError && error.message.length > 20) {
            refused += 1;
          } else {
            throw new Error(`${label} failed unclearly: ${String(error)}`, {
              cause: error,
            });
          }
        } finally {
          engine?.close();
          rmSync(copy, { recursive: true, force: true });
        }
      }

      expect(recovered + refused).toBe(80);
      expect(recovered).toBeGreaterThan(0);
      expect(refused).toBeGreaterThan(0);
    },
  );
});
