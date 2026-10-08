import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Runs the example app for real: the built `sinterd` binary serves a data
// directory on disk, and the app is started as a separate Node process for
// every command, exactly as a user would run it. `pnpm build` must have run
// first.

const APP_DIR = fileURLToPath(new URL("..", import.meta.url));
const CLI = fileURLToPath(
  new URL("../../../apps/server-cli/dist/index.js", import.meta.url),
);

interface RunningServer {
  readonly url: string;
  stop(): Promise<number | null>;
}

let dataDir: string;
const children: ChildProcess[] = [];

beforeAll(() => {
  if (!existsSync(CLI)) {
    throw new Error("The server CLI is not built. Run `pnpm build` first.");
  }

  dataDir = mkdtempSync(join(tmpdir(), "sinterdb-todo-app-"));
});

afterAll(() => {
  for (const child of children) {
    child.kill("SIGKILL");
  }

  rmSync(dataDir, { recursive: true, force: true });
});

function startServer(directory: string = dataDir): Promise<RunningServer> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [CLI, "--data-dir", directory, "--host", "127.0.0.1", "--port", "0"],
      { stdio: ["ignore", "pipe", "pipe"] },
    );
    let output = "";
    let errors = "";
    let started = false;

    children.push(child);

    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`The server did not start. stderr: ${errors}`));
    }, 15_000);

    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      output += chunk;

      for (const line of output.split("\n")) {
        if (started || !line.includes('"server.started"')) {
          continue;
        }

        const details = (
          JSON.parse(line) as { details: Record<string, unknown> }
        ).details;

        started = true;
        clearTimeout(timer);
        resolve({
          url: `sinterdb://127.0.0.1:${details["port"] as number}/todo`,
          stop: () =>
            new Promise<number | null>((done) => {
              child.once("exit", (code) => done(code));
              child.kill("SIGINT");
            }),
        });
      }
    });
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk: string) => {
      errors += chunk;
    });
    child.on("exit", (code) => {
      if (!started) {
        clearTimeout(timer);
        reject(new Error(`The server exited early (${code}). ${errors}`));
      }
    });
  });
}

interface Outcome {
  readonly status: number | null;
  readonly stdout: string;
  readonly stderr: string;
}

function app(url: string, ...args: string[]): Outcome {
  const result = spawnSync(process.execPath, ["src/main.ts", ...args], {
    cwd: APP_DIR,
    encoding: "utf8",
    timeout: 30_000,
    env: { ...process.env, SINTERDB_URL: url },
  });

  return {
    status: result.status,
    stdout: result.stdout,
    stderr: result.stderr,
  };
}

describe("examples/todo-app", () => {
  let server: RunningServer;

  beforeAll(async () => {
    server = await startServer();
  });

  it("adds items, lists them by priority, and rejects duplicate titles", () => {
    expect(app(server.url, "add", "Write docs", "--priority", "2").status).toBe(
      0,
    );
    expect(
      app(server.url, "add", "Ship", "--priority", "1", "--tag", "release")
        .status,
    ).toBe(0);
    expect(app(server.url, "add", "Relax").status).toBe(0);

    expect(app(server.url, "list").stdout).toBe(
      [
        "[ ] P1  Ship  #release",
        "[ ] P2  Write docs",
        "[ ] P3  Relax",
        "",
      ].join("\n"),
    );

    const duplicate = app(server.url, "add", "Ship");

    expect(duplicate.status).toBe(1);
    expect(duplicate.stderr).toContain(
      'There is already a to-do titled "Ship"',
    );
  });

  it("filters by tag and limits the number of items", () => {
    expect(app(server.url, "tag", "Write docs", "release").status).toBe(0);
    expect(app(server.url, "tag", "Write docs", "release").status).toBe(0);

    expect(app(server.url, "list", "--tag", "release").stdout).toBe(
      ["[ ] P1  Ship  #release", "[ ] P2  Write docs  #release", ""].join("\n"),
    );
    expect(app(server.url, "list", "--limit", "1").stdout).toBe(
      "[ ] P1  Ship  #release\n",
    );
  });

  it("finishes, reprioritizes and removes items", () => {
    expect(app(server.url, "done", "Ship").stdout).toBe('Finished "Ship".\n');
    expect(app(server.url, "done", "Ship").status).toBe(1);
    expect(app(server.url, "priority", "Relax", "1").status).toBe(0);
    expect(app(server.url, "stats").stdout).toBe("3 total, 2 open, 1 done.\n");
    expect(app(server.url, "list").stdout).toBe(
      ["[ ] P1  Relax", "[ ] P2  Write docs  #release", ""].join("\n"),
    );
    expect(app(server.url, "remove", "missing").status).toBe(1);
  });

  it("finds the data again after the server restarts", async () => {
    expect(await server.stop()).toBe(0);
    server = await startServer();

    expect(app(server.url, "list", "--all").stdout).toBe(
      [
        "[x] P1  Ship  #release",
        "[ ] P1  Relax",
        "[ ] P2  Write docs  #release",
        "",
      ].join("\n"),
    );
    expect(app(server.url, "clear").stdout).toBe("Removed 1 finished item.\n");
    expect(app(server.url, "stats").stdout).toBe("2 total, 2 open, 0 done.\n");
  });

  it("reports a server that is not running", async () => {
    const url = server.url;

    expect(await server.stop()).toBe(0);

    const outcome = app(url, "list");

    expect(outcome.status).toBe(1);
    expect(outcome.stderr).toContain("Cannot reach SinterDB");
  });

  it("explains misuse with the usage text", () => {
    const outcome = app("sinterdb://127.0.0.1:1/todo", "--help");

    expect(outcome.status).toBe(0);
    expect(outcome.stdout).toContain("Usage: node src/main.ts");
  });
});

describe("examples/todo-app/README.md", () => {
  it("shows commands that work as written", async () => {
    const readme = readFileSync(join(APP_DIR, "README.md"), "utf8");
    const commands = [...readme.matchAll(/^node src\/main\.ts (.+)$/gm)].map(
      (match) => match[1] as string,
    );

    expect(commands.length).toBeGreaterThanOrEqual(5);

    const directory = mkdtempSync(join(tmpdir(), "sinterdb-todo-readme-"));
    const readmeServer = await startServer(directory);

    try {
      for (const command of commands) {
        // Split like a shell would, keeping quoted titles together.
        const args = [...command.matchAll(/"([^"]*)"|(\S+)/g)].map(
          (match) => (match[1] ?? match[2]) as string,
        );
        const outcome = app(readmeServer.url, ...args);

        expect(outcome.status, `${command}\n${outcome.stderr}`).toBe(0);
      }
    } finally {
      await readmeServer.stop();
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
