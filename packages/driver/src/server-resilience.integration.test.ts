import { spawn, type ChildProcess } from "node:child_process";
import { existsSync } from "node:fs";
import { connect } from "node:net";
import { fileURLToPath } from "node:url";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { SinterClient } from "./client.js";

// Runs the real `sinterd` binary and treats it badly. A server that stops
// because one client misbehaves, or because a query matched a lot of data, is
// not a database anyone can use. `pnpm build` must have run first.

const CLI = fileURLToPath(
  new URL("../../../apps/server-cli/dist/index.js", import.meta.url),
);

let child: ChildProcess;
let port: number;
let exited: number | null | undefined;
let log = "";

beforeAll(async () => {
  if (!existsSync(CLI)) {
    throw new Error("The server CLI is not built. Run `pnpm build` first.");
  }

  child = spawn(process.execPath, [CLI, "--port", "0"], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.on("exit", (code) => {
    exited = code;
  });
  child.stderr?.setEncoding("utf8");
  child.stderr?.on("data", (chunk: string) => {
    log += chunk;
  });

  port = await new Promise<number>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("The server did not start.")),
      15_000,
    );
    let output = "";

    child.stdout?.setEncoding("utf8");
    child.stdout?.on("data", (chunk: string) => {
      output += chunk;

      const line = output
        .split("\n")
        .find((l) => l.includes('"server.started"'));

      if (line !== undefined) {
        clearTimeout(timer);
        resolve(
          (JSON.parse(line) as { details: { port: number } }).details.port,
        );
      }
    });
  });
});

afterAll(() => {
  child.kill("SIGKILL");
});

function pause(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function withClient<T>(
  run: (client: SinterClient) => Promise<T>,
): Promise<T> {
  const client = new SinterClient(`sinterdb://127.0.0.1:${port}/resilience`);

  await client.connect();

  try {
    return await run(client);
  } finally {
    await client.close();
  }
}

describe("sinterd under bad behavior", () => {
  it("keeps running when clients send half a message and reset their connections", async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const socket = connect(port, "127.0.0.1");

      socket.on("error", () => undefined);
      await new Promise<void>((resolve) => socket.once("connect", resolve));
      // Less than a frame header, so the server keeps waiting for the rest and
      // the reset reaches an open connection.
      socket.write(Buffer.from("garbage"));
      await pause(100);
      socket.resetAndDestroy();
    }

    await pause(100);

    expect(exited).toBeUndefined();

    // It was reported as a warning, not as a fatal runtime error.
    expect(log).not.toContain("server.runtime_error");

    await expect(withClient((client) => client.ping())).resolves.toMatchObject({
      ok: true,
    });
  });

  it("returns documents that together exceed the message limit", async () => {
    const text = "x".repeat(9 << 20);

    await withClient(async (client) => {
      const items = client
        .db()
        .collection<{ k: number; text: string }>("items");

      await items.insertOne({ k: 1, text });
      await items.insertOne({ k: 2, text });

      // Two documents of 9 MiB cannot share one 16 MiB message. The cursor
      // splits them across batches without the caller noticing.
      const found = await items.find({}, { sort: [["k", 1]] }).toArray();

      expect(found.map((item) => item.k)).toEqual([1, 2]);
      expect(found.every((item) => item.text.length === text.length)).toBe(
        true,
      );
    });

    expect(exited).toBeUndefined();
  }, 60_000);
});
