import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

// docs/quick-start.md promises that a new user can install SinterDB, store
// documents, restart the server, and find the data again. This test follows
// the guide for real: it starts `sinterd` with the flags the guide shows, runs
// the guide's programs with `node`, compares their output with the guide, and
// type-checks them. `pnpm build` must have run first.
//
// Code blocks in the guide are picked up by their markers:
//   ```bash run=server       the command that starts the server
//   ```ts file=<name>        a file the reader creates
//   ```text expect=<name>    the output of running that file

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const CLI = join(ROOT, "apps/server-cli/dist/index.js");
const TSC = join(ROOT, "node_modules/typescript/bin/tsc");
const GUIDE = readFileSync(join(ROOT, "docs/quick-start.md"), "utf8");

interface Block {
  readonly language: string;
  readonly attributes: ReadonlyMap<string, string>;
  readonly code: string;
}

function readBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];

  for (const match of markdown.matchAll(/```(\w+)([^\n]*)\n([\s\S]*?)```/g)) {
    const attributes = new Map<string, string>();

    for (const pair of (match[2] ?? "").trim().split(/\s+/)) {
      const [key, value] = pair.split("=");

      if (key !== undefined && value !== undefined && key.length > 0) {
        attributes.set(key, value);
      }
    }

    blocks.push({
      language: match[1] as string,
      attributes,
      code: match[3] as string,
    });
  }

  return blocks;
}

const blocks = readBlocks(GUIDE);
const serverBlock = blocks.find(
  (block) => block.attributes.get("run") === "server",
);
const files = new Map(
  blocks
    .filter((block) => block.attributes.has("file"))
    .map((block) => [block.attributes.get("file") as string, block.code]),
);
const expected = new Map(
  blocks
    .filter((block) => block.attributes.has("expect"))
    .map((block) => [block.attributes.get("expect") as string, block.code]),
);

interface RunningServer {
  readonly child: ChildProcess;
  readonly port: number;
  readonly details: Record<string, unknown>;
  stop(): Promise<number | null>;
}

let workspace: string;
let projectDir: string;
let dataDir: string;
const running: ChildProcess[] = [];

beforeAll(() => {
  if (!existsSync(CLI)) {
    throw new Error("The server CLI is not built. Run `pnpm build` first.");
  }

  workspace = mkdtempSync(join(tmpdir(), "sinterdb-quick-start-"));
  projectDir = join(workspace, "todo");
  dataDir = join(workspace, "sinterdb-data");

  // The project the guide has the reader create: `npm init`, `type: module`,
  // and `npm install sinterdb`, with the install replaced by symlinks to the
  // packages in this repository.
  mkdirSync(join(projectDir, "node_modules"), { recursive: true });
  writeFileSync(
    join(projectDir, "package.json"),
    JSON.stringify({ name: "todo", type: "module" }),
  );
  symlinkSync(
    join(ROOT, "packages/driver"),
    join(projectDir, "node_modules/sinterdb"),
  );
  symlinkSync(
    join(ROOT, "packages/protocol"),
    join(projectDir, "node_modules/sinterdb-protocol"),
  );
});

afterAll(() => {
  for (const child of running) {
    child.kill("SIGKILL");
  }

  rmSync(workspace, { recursive: true, force: true });
});

function serverArguments(): string[] {
  if (serverBlock === undefined) {
    throw new Error("quick-start.md has no ```bash run=server block.");
  }

  const [command, ...flags] = serverBlock.code.trim().split(/\s+/);

  expect(command).toBe("sinterd");

  // Use a temporary data directory and a free port; keep every other flag
  // exactly as the guide shows it.
  const index = flags.indexOf("--data-dir");

  expect(index).toBeGreaterThanOrEqual(0);
  expect(flags).not.toContain("--port");
  expect(flags).not.toContain("--host");

  flags[index + 1] = dataDir;

  return [...flags, "--host", "127.0.0.1", "--port", "0"];
}

function startServer(): Promise<RunningServer> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [CLI, ...serverArguments()], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    let errors = "";
    let started = false;

    running.push(child);

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

        const details = (
          JSON.parse(line) as { details: Record<string, unknown> }
        ).details;

        started = true;
        clearTimeout(timer);
        resolve({
          child,
          port: details["port"] as number,
          details,
          stop: () =>
            new Promise<number | null>((done) => {
              child.once("exit", (code) => done(code));
              child.kill("SIGINT"); // Ctrl+C, as the guide says
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
        reject(
          new Error(
            `The server exited early (code ${code}). stderr: ${errors}`,
          ),
        );
      }
    });
  });
}

function runProgram(name: string, port: number): string {
  const source = files.get(name);

  if (source === undefined) {
    throw new Error(`quick-start.md has no file=${name} block.`);
  }

  // The guide connects to the default port on `localhost`; the test server
  // listens on a free port instead.
  const patched = source.replaceAll(
    "sinterdb://localhost",
    `sinterdb://127.0.0.1:${port}`,
  );

  expect(patched).not.toBe(source);
  writeFileSync(join(projectDir, name), patched);

  const result = spawnSync(process.execPath, [name], {
    cwd: projectDir,
    encoding: "utf8",
    timeout: 30_000,
  });

  expect(result.stderr).not.toMatch(/error/i);
  expect(result.status).toBe(0);

  return result.stdout;
}

describe("docs/quick-start.md", () => {
  it("has the blocks the test needs", () => {
    expect(serverBlock).toBeDefined();
    expect([...files.keys()].sort()).toEqual(["app.ts", "recover.ts"]);
    expect([...expected.keys()].sort()).toEqual(["app.ts", "recover.ts"]);
  });

  it("uses only flags that sinterd accepts", () => {
    const result = spawnSync(
      process.execPath,
      [CLI, ...serverArguments(), "--help"],
      {
        encoding: "utf8",
      },
    );

    // --help together with the guide's flags only succeeds if they all parse.
    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Usage:");
  });

  it("type-checks the example programs under strict settings", () => {
    for (const [name, source] of files) {
      writeFileSync(join(projectDir, name), source);
    }

    writeFileSync(
      join(projectDir, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "es2023",
          module: "nodenext",
          moduleResolution: "nodenext",
          strict: true,
          noUncheckedIndexedAccess: true,
          erasableSyntaxOnly: true,
          verbatimModuleSyntax: true,
          noEmit: true,
          skipLibCheck: true,
          types: ["node"],
          typeRoots: [join(ROOT, "node_modules/@types")],
        },
        include: [...files.keys()],
      }),
    );

    const result = spawnSync(process.execPath, [TSC, "-p", projectDir], {
      encoding: "utf8",
    });

    expect(result.stdout + result.stderr).toBe("");
    expect(result.status).toBe(0);
  });

  it("stores documents, survives a restart, and recovers them", async () => {
    const first = await startServer();

    expect(first.details["storage"]).toBe("disk");
    expect(runProgram("app.ts", first.port).trim()).toBe(
      (expected.get("app.ts") as string).trim(),
    );
    expect(await first.stop()).toBe(0);

    const second = await startServer();

    expect(second.details["storage"]).toBe("disk");
    expect(runProgram("recover.ts", second.port).trim()).toBe(
      (expected.get("recover.ts") as string).trim(),
    );
    expect(await second.stop()).toBe(0);
  }, 60_000);
});
