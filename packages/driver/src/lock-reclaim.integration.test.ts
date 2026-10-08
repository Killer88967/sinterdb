import { spawn, type ChildProcess } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { SinterClient } from "./client.js";

// A container that is killed leaves its LOCK file in the volume, and the next
// container has another host name. These tests run the real `sinterd` binary
// against that situation. `pnpm build` must have run first.

const CLI = fileURLToPath(
  new URL("../../../apps/server-cli/dist/index.js", import.meta.url),
);

interface Running {
  readonly child: ChildProcess;
  readonly port: number;
  readonly output: () => string;
}

const children: ChildProcess[] = [];
let directory: string;

beforeAll(() => {
  if (!existsSync(CLI)) {
    throw new Error("The server CLI is not built. Run `pnpm build` first.");
  }
});

afterAll(() => {
  for (const child of children) {
    child.kill("SIGKILL");
  }

  rmSync(directory, { recursive: true, force: true });
});

function launch(
  args: string[],
  environment: Record<string, string> = {},
): { child: ChildProcess; output: () => string } {
  const child = spawn(process.execPath, [CLI, ...args], {
    env: { ...process.env, ...environment },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let text = "";

  children.push(child);
  child.stdout?.setEncoding("utf8");
  child.stderr?.setEncoding("utf8");
  child.stdout?.on("data", (chunk: string) => (text += chunk));
  child.stderr?.on("data", (chunk: string) => (text += chunk));

  return { child, output: () => text };
}

async function start(
  args: string[],
  environment: Record<string, string> = {},
): Promise<Running> {
  const { child, output } = launch(["--port", "0", ...args], environment);

  const deadline = Date.now() + 15_000;

  while (Date.now() < deadline) {
    const line = output()
      .split("\n")
      .find((entry) => entry.includes('"server.started"'));

    if (line !== undefined) {
      const port = (JSON.parse(line) as { details: { port: number } }).details
        .port;

      return { child, port, output };
    }

    if (child.exitCode !== null) {
      throw new Error(`The server exited early:\n${output()}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  throw new Error(`The server did not start:\n${output()}`);
}

async function exitCodeOf(child: ChildProcess): Promise<number | null> {
  if (child.exitCode !== null) {
    return child.exitCode;
  }

  return new Promise((resolve) => child.on("exit", (code) => resolve(code)));
}

async function names(port: number): Promise<string[]> {
  const client = new SinterClient(`sinterdb://127.0.0.1:${port}/lock`);

  await client.connect();

  try {
    const items = await client
      .db()
      .collection<{ name: string }>("items")
      .find()
      .toArray();

    return items.map((item) => item.name);
  } finally {
    await client.close();
  }
}

/** Leaves a data directory whose LOCK looks like a stopped container's. */
async function leaveForeignLock(): Promise<void> {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-lock-"));

  const first = await start(["--data-dir", directory]);
  const client = new SinterClient(`sinterdb://127.0.0.1:${first.port}/lock`);

  await client.connect();
  await client.db().collection<{ name: string }>("items").insertOne({
    name: "survivor",
  });
  await client.close();

  first.child.kill("SIGKILL");
  await exitCodeOf(first.child);

  const lockPath = join(directory, "LOCK");
  const lock = JSON.parse(readFileSync(lockPath, "utf8")) as {
    hostname: string;
  };

  // The process is gone, but a different container would not know that.
  lock.hostname = "container-that-was-killed";
  writeFileSync(lockPath, JSON.stringify(lock));
}

describe("a LOCK left behind by another host", () => {
  it("is refused by default, with a clear message", async () => {
    await leaveForeignLock();

    const refused = launch(["--port", "0", "--data-dir", directory]);

    expect(await exitCodeOf(refused.child)).toBe(1);
    expect(refused.output()).toContain("The data directory is in use");
    expect(refused.output()).toContain("container-that-was-killed");
  });

  it("is taken over with --reclaim-lock, and the data is still there", async () => {
    const server = await start(["--data-dir", directory, "--reclaim-lock"]);

    expect(await names(server.port)).toEqual(["survivor"]);

    server.child.kill("SIGKILL");
    await exitCodeOf(server.child);
  });

  it("is taken over with SINTERDB_RECLAIM_LOCK=true", async () => {
    const lockPath = join(directory, "LOCK");
    const lock = JSON.parse(readFileSync(lockPath, "utf8")) as {
      hostname: string;
    };

    lock.hostname = "another-container";
    writeFileSync(lockPath, JSON.stringify(lock));

    const server = await start(["--data-dir", directory], {
      SINTERDB_RECLAIM_LOCK: "true",
    });

    expect(await names(server.port)).toEqual(["survivor"]);

    server.child.kill("SIGTERM");
    expect(await exitCodeOf(server.child)).toBe(0);
    expect(existsSync(join(directory, "LOCK"))).toBe(false);
  });

  it("does not let --reclaim-lock start a second server beside a running one", async () => {
    const running = await start(["--data-dir", directory]);
    const second = launch([
      "--port",
      "0",
      "--data-dir",
      directory,
      "--reclaim-lock",
    ]);

    // The lock names this host and a live process, so it is not foreign.
    expect(await exitCodeOf(second.child)).toBe(1);
    expect(second.output()).toContain("The data directory is in use");
    expect(await names(running.port)).toEqual(["survivor"]);
  });
});
