import { spawn, type ChildProcess } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const SERVER_BINARY = fileURLToPath(
  new URL("../../../apps/server-cli/dist/index.js", import.meta.url),
);

export interface ServerOptions {
  /** A directory to keep data in. Without one the server keeps memory only. */
  readonly dataDirectory?: string;
  readonly durability?: "fsync" | "buffered";
}

export interface RunningServer {
  readonly port: number;
  readonly url: string;
  /** Milliseconds from spawning the process to the `server.started` line. */
  readonly startupMS: number;
  readonly startedDetails: Record<string, unknown>;
  /** SIGTERM: a clean stop with a final checkpoint. */
  stop(): Promise<void>;
  /** SIGKILL: what a crash looks like. */
  kill(): Promise<void>;
}

export function startServer(
  options: ServerOptions = {},
): Promise<RunningServer> {
  const argumentsList = [SERVER_BINARY, "--host", "127.0.0.1", "--port", "0"];

  if (options.dataDirectory !== undefined) {
    argumentsList.push("--data-dir", options.dataDirectory);
  }

  if (options.durability !== undefined) {
    argumentsList.push("--durability", options.durability);
  }

  return new Promise((resolve, reject) => {
    const spawnedAt = performance.now();
    const child = spawn(process.execPath, argumentsList, {
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    let errors = "";
    let started = false;

    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`The server did not start in time. ${errors}`));
    }, 120_000);

    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      output += chunk;

      const line = output
        .split("\n")
        .find((candidate) => candidate.includes('"server.started"'));

      if (started || line === undefined) {
        return;
      }

      started = true;
      clearTimeout(timer);

      const details = (JSON.parse(line) as { details: Record<string, unknown> })
        .details;
      const port = details["port"] as number;

      resolve({
        port,
        url: `sinterdb://127.0.0.1:${port}/bench`,
        startupMS: performance.now() - spawnedAt,
        startedDetails: details,
        stop: () => terminate(child, "SIGTERM"),
        kill: () => terminate(child, "SIGKILL"),
      });
    });
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk: string) => {
      errors += chunk;
    });
    child.once("exit", (code) => {
      if (!started) {
        clearTimeout(timer);
        reject(new Error(`The server exited early (${code}). ${errors}`));
      }
    });
  });
}

function terminate(child: ChildProcess, signal: NodeJS.Signals): Promise<void> {
  return new Promise((resolve) => {
    if (child.exitCode !== null || child.signalCode !== null) {
      resolve();
      return;
    }

    child.once("exit", () => resolve());
    child.kill(signal);
  });
}

export function temporaryDirectory(): { path: string; remove(): void } {
  const path = mkdtempSync(join(tmpdir(), "sinterdb-bench-"));

  return { path, remove: () => rmSync(path, { recursive: true, force: true }) };
}

export interface Measurement {
  readonly name: string;
  readonly operations: number;
  readonly totalMS: number;
  readonly operationsPerSecond: number;
  /** Per-operation latency in microseconds, when each operation was timed. */
  readonly latencyMicros?: {
    readonly p50: number;
    readonly p95: number;
    readonly p99: number;
    readonly max: number;
  };
  readonly note?: string;
}

function percentile(sorted: readonly number[], fraction: number): number {
  const index = Math.min(
    sorted.length - 1,
    Math.max(0, Math.ceil(sorted.length * fraction) - 1),
  );

  return sorted[index] as number;
}

/** Runs `operation` `count` times in sequence and records every latency. */
export async function measureSequential(
  name: string,
  count: number,
  operation: (index: number) => Promise<unknown>,
  note?: string,
): Promise<Measurement> {
  const latencies: number[] = [];
  const startedAt = performance.now();

  for (let index = 0; index < count; index += 1) {
    const operationStart = performance.now();

    await operation(index);
    latencies.push((performance.now() - operationStart) * 1000);
  }

  return summarize(name, count, performance.now() - startedAt, latencies, note);
}

/** Runs `count` operations in total spread over `workers` parallel loops. */
export async function measureParallel(
  name: string,
  count: number,
  workers: number,
  operation: (worker: number, index: number) => Promise<unknown>,
  note?: string,
): Promise<Measurement> {
  const perWorker = Math.ceil(count / workers);
  const latencies: number[] = [];
  const startedAt = performance.now();

  await Promise.all(
    Array.from({ length: workers }, async (_unused, worker) => {
      for (let index = 0; index < perWorker; index += 1) {
        const operationStart = performance.now();

        await operation(worker, index);
        latencies.push((performance.now() - operationStart) * 1000);
      }
    }),
  );

  return summarize(
    name,
    perWorker * workers,
    performance.now() - startedAt,
    latencies,
    note,
  );
}

/** Times one piece of work that handles `operations` items in bulk. */
export async function measureBulk(
  name: string,
  operations: number,
  work: () => Promise<unknown>,
  note?: string,
): Promise<Measurement> {
  const startedAt = performance.now();

  await work();

  return summarize(name, operations, performance.now() - startedAt, [], note);
}

function summarize(
  name: string,
  operations: number,
  totalMS: number,
  latencies: readonly number[],
  note?: string,
): Measurement {
  const sorted = [...latencies].sort((a, b) => a - b);

  return {
    name,
    operations,
    totalMS: round(totalMS),
    operationsPerSecond: round((operations / totalMS) * 1000),
    ...(sorted.length === 0
      ? {}
      : {
          latencyMicros: {
            p50: round(percentile(sorted, 0.5)),
            p95: round(percentile(sorted, 0.95)),
            p99: round(percentile(sorted, 0.99)),
            max: round(sorted[sorted.length - 1] as number),
          },
        }),
    ...(note === undefined ? {} : { note }),
  };
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
