import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { fileURLToPath } from "node:url";

import { afterAll, describe, expect, it, vi } from "vitest";

import { SinterClient } from "./client.js";

// Builds nothing itself: set SINTERDB_DOCKER_IMAGE to an image built from the
// root Dockerfile (`docker build --tag sinterdb-local .`) and this test runs
// the image for real: write, stop, start again, read back. A second test does
// the same through the Compose example. Both are skipped when the variable is
// not set, so `pnpm test` works on machines without Docker. CI sets it.

const IMAGE = process.env["SINTERDB_DOCKER_IMAGE"];
const COMPOSE_FILE = fileURLToPath(
  new URL("../../../examples/docker/compose.yaml", import.meta.url),
);

const suffix = randomBytes(4).toString("hex");
const containers: string[] = [];
const volumes: string[] = [];
let composeProject: string | undefined;

function docker(...args: string[]): string {
  const result = spawnSync("docker", args, {
    encoding: "utf8",
    timeout: 180_000,
  });

  if (result.status !== 0) {
    throw new Error(
      `docker ${args.join(" ")} failed (${result.status}): ${result.stderr}`,
    );
  }

  return result.stdout.trim();
}

function dockerQuiet(...args: string[]): void {
  spawnSync("docker", args, { encoding: "utf8", timeout: 120_000 });
}

async function waitFor(
  description: string,
  check: () => boolean | Promise<boolean>,
  timeoutMs = 60_000,
): Promise<void> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await check()) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Timed out waiting for ${description}.`);
}

async function waitUntilHealthy(container: string): Promise<void> {
  try {
    await waitFor(`${container} to be healthy`, () => {
      return health(container) === "healthy";
    });
  } catch (error: unknown) {
    // A container that never becomes healthy usually says why in its log.
    const logs = spawnSync("docker", ["logs", container], {
      encoding: "utf8",
    });

    throw new Error(
      `${(error as Error).message}\n--- docker logs ${container} ---\n${logs.stdout}${logs.stderr}`,
      { cause: error },
    );
  }
}

function health(container: string): string {
  return docker("inspect", "--format", "{{.State.Health.Status}}", container);
}

function hostPort(container: string): number {
  // "127.0.0.1:49153" (and possibly a second line for IPv6).
  const line = docker("port", container, "4721/tcp").split("\n")[0] ?? "";

  return Number(line.slice(line.lastIndexOf(":") + 1));
}

interface Item {
  readonly name: string;
  readonly quantity: number;
}

async function withClient<T>(
  port: number,
  action: (client: SinterClient) => Promise<T>,
): Promise<T> {
  const client = new SinterClient(`sinterdb://127.0.0.1:${port}/docker`);

  await client.connect();

  try {
    return await action(client);
  } finally {
    await client.close();
  }
}

afterAll(() => {
  for (const container of containers) {
    dockerQuiet("rm", "--force", container);
  }

  for (const volume of volumes) {
    dockerQuiet("volume", "rm", "--force", volume);
  }

  if (composeProject !== undefined) {
    dockerQuiet(
      "compose",
      "--project-name",
      composeProject,
      "--file",
      COMPOSE_FILE,
      "down",
      "--volumes",
      "--timeout",
      "5",
    );
  }
});

describe.skipIf(IMAGE === undefined)("the server image", () => {
  vi.setConfig({ testTimeout: 180_000 });

  const volume = `sinterdb-test-${suffix}`;

  function run(name: string): string {
    containers.push(name);

    return docker(
      "run",
      "--detach",
      "--name",
      name,
      "--publish",
      "127.0.0.1:0:4721",
      "--volume",
      `${volume}:/data`,
      IMAGE as string,
    );
  }

  it("serves requests, becomes healthy, and does not run as root", async () => {
    volumes.push(volume);
    docker("volume", "create", volume);
    run(`sinterdb-a-${suffix}`);

    await waitUntilHealthy(`sinterdb-a-${suffix}`);

    expect(docker("exec", `sinterdb-a-${suffix}`, "id", "-u")).toBe("1000");

    const stored = await withClient(
      hostPort(`sinterdb-a-${suffix}`),
      async (client) => {
        const items = client.db().collection<Item>("items");

        await items.insertMany([
          { name: "widget", quantity: 3 },
          { name: "gadget", quantity: 5 },
        ]);

        return items.find({}, { sort: [["name", 1]] }).toArray();
      },
    );

    expect(stored.map((item) => item.name)).toEqual(["gadget", "widget"]);
  });

  it("stops cleanly on docker stop and keeps the data in the volume", async () => {
    const first = `sinterdb-a-${suffix}`;

    docker("stop", first);

    expect(docker("inspect", "--format", "{{.State.ExitCode}}", first)).toBe(
      "0",
    );
    expect(docker("logs", first)).toContain('"event":"server.stopped"');

    // A different container, the same volume.
    docker("rm", first);
    run(`sinterdb-b-${suffix}`);

    await waitUntilHealthy(`sinterdb-b-${suffix}`);

    expect(docker("logs", `sinterdb-b-${suffix}`)).toContain(
      '"storage":"disk"',
    );

    const found = await withClient(hostPort(`sinterdb-b-${suffix}`), (client) =>
      client
        .db()
        .collection<Item>("items")
        .find({}, { sort: [["name", 1]] })
        .toArray(),
    );

    expect(found.map((item) => [item.name, item.quantity])).toEqual([
      ["gadget", 5],
      ["widget", 3],
    ]);
  });

  it("recovers after the container is killed without a clean stop", async () => {
    const second = `sinterdb-b-${suffix}`;

    await withClient(hostPort(second), (client) =>
      client.db().collection<Item>("items").insertOne({
        name: "after-checkpoint",
        quantity: 1,
      }),
    );

    docker("kill", second);
    docker("rm", second);
    run(`sinterdb-c-${suffix}`);

    await waitUntilHealthy(`sinterdb-c-${suffix}`);

    const names = await withClient(
      hostPort(`sinterdb-c-${suffix}`),
      async (client) =>
        (await client.db().collection<Item>("items").find().toArray()).map(
          (item) => item.name,
        ),
    );

    expect(names.sort()).toEqual(["after-checkpoint", "gadget", "widget"]);
  });
});

describe.skipIf(IMAGE === undefined)("examples/docker/compose.yaml", () => {
  const project = `sinterdb-compose-${suffix}`;
  const port = 20_000 + Math.floor(Math.random() * 20_000);

  function compose(...args: string[]): string {
    const result = spawnSync(
      "docker",
      ["compose", "--project-name", project, "--file", COMPOSE_FILE, ...args],
      {
        encoding: "utf8",
        timeout: 600_000,
        env: { ...process.env, SINTERDB_PUBLISH_PORT: String(port) },
      },
    );

    if (result.status !== 0) {
      throw new Error(
        `docker compose ${args.join(" ")} failed (${result.status}): ${result.stderr}`,
      );
    }

    return result.stdout.trim();
  }

  it("starts, keeps data across down and up, and cleans up", async () => {
    composeProject = project;

    compose("up", "--detach", "--build", "--wait");

    await withClient(port, (client) =>
      client.db().collection<Item>("items").insertOne({
        name: "compose",
        quantity: 7,
      }),
    );

    // `down` removes the container but keeps the volume.
    compose("down", "--timeout", "15");
    compose("up", "--detach", "--wait");

    const items = await withClient(port, (client) =>
      client.db().collection<Item>("items").find().toArray(),
    );

    expect(items.map((item) => [item.name, item.quantity])).toEqual([
      ["compose", 7],
    ]);
  }, 600_000);
});
