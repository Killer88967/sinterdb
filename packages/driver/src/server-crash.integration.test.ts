import { spawn, type ChildProcess } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { CustomId } from "sinterdb-protocol";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { SinterClient } from "./client.js";

// These tests start the real `sinterd` binary and kill it with SIGKILL, so
// `pnpm build` must have run first.
const CLI = fileURLToPath(
  new URL("../../../apps/server-cli/dist/index.js", import.meta.url),
);

interface Entry {
  _id: CustomId;
  seq: number;
  round: number;
  pad: string;
}

interface RunningServer {
  readonly child: ChildProcess;
  readonly port: number;
  readonly details: Record<string, unknown>;
  kill(signal: NodeJS.Signals): Promise<void>;
}

let directory: string;
const running: RunningServer[] = [];

beforeEach(() => {
  if (!existsSync(CLI)) {
    throw new Error(
      "The server CLI is not built. Run `pnpm build` before the crash tests.",
    );
  }

  directory = mkdtempSync(join(tmpdir(), "sinterdb-server-crash-"));
});

afterEach(async () => {
  for (const server of running.splice(0)) {
    await server.kill("SIGKILL");
  }

  rmSync(directory, { recursive: true, force: true });
});

function startServer(extraArguments: string[] = []): Promise<RunningServer> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        CLI,
        "--host",
        "127.0.0.1",
        "--port",
        "0",
        "--data-dir",
        directory,
        ...extraArguments,
      ],
      { stdio: ["ignore", "pipe", "pipe"] },
    );
    let output = "";
    let errors = "";
    let started = false;

    const server = (details: Record<string, unknown>): RunningServer => ({
      child,
      port: details["port"] as number,
      details,
      kill: (signal) =>
        new Promise<void>((done) => {
          if (child.exitCode !== null || child.signalCode !== null) {
            done();

            return;
          }

          child.once("exit", () => done());
          child.kill(signal);
        }),
    });

    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(
        new Error(
          `The server did not start. stdout: ${output} stderr: ${errors}`,
        ),
      );
    }, 15_000);

    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      output += chunk;

      for (const line of output.split("\n")) {
        if (started || !line.includes('"server.started"')) {
          continue;
        }

        const parsed = JSON.parse(line) as { details: Record<string, unknown> };

        started = true;
        clearTimeout(timer);

        const result = server(parsed.details);

        running.push(result);
        resolve(result);
      }
    });
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk: string) => {
      errors += chunk;
    });
    child.on("exit", (code, signal) => {
      if (!started) {
        clearTimeout(timer);
        reject(
          new Error(
            `The server exited early (code ${code}, signal ${signal}). stderr: ${errors}`,
          ),
        );
      }
    });
  });
}

async function readSequences(port: number): Promise<number[]> {
  const client = new SinterClient(`sinterdb://127.0.0.1:${port}/crash`);

  try {
    await client.connect();

    const entries = await client
      .db()
      .collection<Entry>("entries")
      .find({}, { sort: [["seq", 1]] })
      .toArray();

    return entries.map((entry) => entry.seq);
  } finally {
    await client.close();
  }
}

describe("killing the real server process", () => {
  it(
    "keeps every acknowledged insert across repeated SIGKILLs",
    { timeout: 120_000 },
    async () => {
      const acknowledged = new Set<number>();
      let uncertain = new Set<number>();
      let next = 0;

      for (let round = 0; round < 6; round += 1) {
        const server = await startServer(["--checkpoint-bytes", "3000"]);

        expect(server.details["storage"]).toBe("disk");
        expect(server.details["durability"]).toBe("fsync");
        expect(typeof server.details["replayedRecords"]).toBe("number");

        const present = await readSequences(server.port);

        expect(new Set(present).size, "no duplicate documents").toBe(
          present.length,
        );

        for (const seq of acknowledged) {
          expect(present, `acknowledged insert ${seq} was lost`).toContain(seq);
        }

        for (const seq of present) {
          expect(
            acknowledged.has(seq) || uncertain.has(seq),
            `unexpected document ${seq}`,
          ).toBe(true);
          acknowledged.add(seq);
        }

        uncertain = new Set();

        const client = new SinterClient(
          `sinterdb://127.0.0.1:${server.port}/crash`,
        );

        await client.connect();

        const entries = client.db().collection<Entry>("entries");
        const inFlight = new Set<number>();
        const killAfter = 15 + ((round * 17) % 60);
        let completed = 0;
        let killing = false;

        const writer = async (): Promise<void> => {
          for (;;) {
            const seq = next;

            next += 1;
            inFlight.add(seq);

            await entries.insertOne({
              seq,
              round,
              pad: "x".repeat(40),
            } as Entry);

            inFlight.delete(seq);
            acknowledged.add(seq);
            completed += 1;

            if (completed >= killAfter && !killing) {
              killing = true;
              void server.kill("SIGKILL");
            }
          }
        };

        const results = await Promise.allSettled([
          writer(),
          writer(),
          writer(),
        ]);

        expect(results.every((result) => result.status === "rejected")).toBe(
          true,
        );

        await server.kill("SIGKILL");

        expect(server.child.signalCode).toBe("SIGKILL");

        uncertain = new Set(inFlight);
        await client.close().catch(() => undefined);
      }

      const final = await startServer();
      const present = await readSequences(final.port);

      for (const seq of acknowledged) {
        expect(present).toContain(seq);
      }

      expect(acknowledged.size).toBeGreaterThan(100);
      expect(present.length).toBeGreaterThanOrEqual(acknowledged.size);
      expect(final.details["replayedRecords"]).toBeGreaterThanOrEqual(0);
    },
  );

  it(
    "recovers a graceful shutdown from the final snapshot",
    { timeout: 60_000 },
    async () => {
      const first = await startServer();
      const client = new SinterClient(`sinterdb://127.0.0.1:${first.port}/app`);

      await client.connect();
      await client
        .db()
        .collection("things")
        .insertMany(Array.from({ length: 25 }, (_, n) => ({ n })));
      await client.close();

      await new Promise<void>((resolve) => {
        first.child.once("exit", () => resolve());
        first.child.kill("SIGTERM");
      });

      expect(first.child.exitCode).toBe(0);

      const second = await startServer();
      const reader = new SinterClient(
        `sinterdb://127.0.0.1:${second.port}/app`,
      );

      await reader.connect();

      expect(
        await reader.db().collection("things").find().toArray(),
      ).toHaveLength(25);
      expect(second.details["replayedRecords"]).toBe(0);
      expect(String(second.details["checkpointLsn"])).not.toBe("0");

      await reader.close();
    },
  );

  it(
    "takes over the data directory of a server that was killed",
    { timeout: 60_000 },
    async () => {
      const first = await startServer();

      await first.kill("SIGKILL");

      const second = await startServer();

      expect(second.details["storage"]).toBe("disk");
      expect(second.child.pid).not.toBe(first.child.pid);
    },
  );
});
