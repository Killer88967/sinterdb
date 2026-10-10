import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { SinterServer, type ServerConfigInput } from "./index.js";

let directory: string;
let server: SinterServer | undefined;

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-server-checkpoints-"));
});

afterEach(async () => {
  await server?.stop({ timeoutMS: 100 });
  server = undefined;
  rmSync(directory, { recursive: true, force: true });
});

function snapshotCount(): number {
  return readdirSync(join(directory, "checkpoints")).filter((name) =>
    name.endsWith(".snap"),
  ).length;
}

async function writeSome(options: ServerConfigInput): Promise<void> {
  server = new SinterServer(
    {
      port: 0,
      dataDirectory: directory,
      checkpointThresholdBytes: 1,
      ...options,
    },
    {},
  );
  await server.start();

  const collection = server.catalog.getOrCreateCollection("app", "things");

  for (let n = 1; n <= 8; n += 1) {
    collection.insertOne({ n });
  }
}

describe("server checkpoint retention", () => {
  it("keeps two snapshots by default", async () => {
    await writeSome({});

    expect(snapshotCount()).toBe(2);
  });

  it("keeps as many snapshots as it is configured to", async () => {
    await writeSome({ checkpointKeep: 4 });

    expect(snapshotCount()).toBe(4);
  });
});
