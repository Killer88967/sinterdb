import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { readBlocks } from "./guide.ts";
import { PUBLIC_PACKAGES, readManifest, tarballSpec } from "./manifests.ts";
import { checkPackedPackage, readTarball } from "./tarball.ts";

export interface RehearsalOptions {
  readonly root: string;
  /**
   * Keep the tarballs in this folder, created if needed, so they can be
   * published as they are. Otherwise they go to a temporary folder that is
   * removed afterwards.
   */
  readonly outputDirectory?: string;
  readonly log?: (line: string) => void;
}

export interface RehearsalResult {
  readonly version: string;
  readonly packages: readonly {
    readonly name: string;
    readonly file: string;
    readonly bytes: number;
    readonly files: number;
  }[];
}

interface RunningServer {
  readonly child: ChildProcess;
  readonly port: number;
  readonly details: Record<string, unknown>;
  stop(signal: NodeJS.Signals): Promise<number | null>;
}

/**
 * Does what a new user does with the published packages, without publishing
 * them. It packs the three public packages, checks what is inside, installs
 * the tarballs into an empty folder the way npm would, and follows
 * docs/quick-start.md: start the server, run the guide's programs, restart,
 * and recover the data. It then kills the server and recovers once more.
 *
 * `pnpm build` must have run first. It throws with every problem it found.
 */
export async function rehearseRelease(
  options: RehearsalOptions,
): Promise<RehearsalResult> {
  const { root } = options;
  const log = options.log ?? (() => undefined);
  const version = readManifest(root, "packages/driver").version as string;
  const work = mkdtempSync(join(tmpdir(), "sinterdb-rehearsal-"));
  const tarballs =
    options.outputDirectory === undefined
      ? join(work, "tarballs")
      : resolve(options.outputDirectory);
  const children: ChildProcess[] = [];

  try {
    mkdirSync(tarballs, { recursive: true });

    // 1. Pack and inspect.
    log(`Packing version ${version}`);

    const packed = PUBLIC_PACKAGES.map(({ name }) => {
      run("pnpm", ["--filter", name, "pack", "--pack-destination", tarballs], {
        cwd: root,
      });

      const file = join(tarballs, tarballName(name, version));

      return { name, packed: readTarball(file) };
    });
    const problems = packed.flatMap(({ name, packed: tarball }) =>
      checkPackedPackage(name, version, tarball),
    );

    if (problems.length > 0) {
      throw new Error(
        `The packed packages are wrong:\n${problems.map((p) => `- ${p}`).join("\n")}`,
      );
    }

    const fileOf = (name: string): string =>
      tarballSpec(
        (packed.find((entry) => entry.name === name) as (typeof packed)[number])
          .packed.file,
      );

    // 2. Install the way a user would: the server globally, the driver in a
    // project. No registry is involved, so the driver's dependency on the
    // protocol package is satisfied by the tarball next to it.
    log("Installing the tarballs into empty folders");

    const prefix = join(work, "global");
    const project = join(work, "todo");
    const data = join(work, "sinterdb-data");

    mkdirSync(project, { recursive: true });
    writeFileSync(
      join(project, "package.json"),
      JSON.stringify({ name: "todo", type: "module" }),
    );
    run(
      "npm",
      [
        "install",
        "--global",
        "--prefix",
        prefix,
        "--no-audit",
        "--no-fund",
        fileOf("@sinterdb/cli"),
      ],
      { cwd: work },
    );
    run(
      "npm",
      [
        "install",
        "--no-audit",
        "--no-fund",
        fileOf("sinterdb"),
        fileOf("sinterdb-protocol"),
      ],
      { cwd: project },
    );

    const sinterd = join(prefix, "bin", "sinterd");
    const reported = run(sinterd, ["--version"], { cwd: work }).trim();

    if (reported !== version) {
      throw new Error(`sinterd --version printed ${reported}, not ${version}.`);
    }

    // 3. Follow the guide.
    const guide = readBlocks(
      readFileSync(join(root, "docs/quick-start.md"), "utf8"),
    );
    const serverBlock = guide.find((b) => b.attributes.get("run") === "server");
    const files = new Map(
      guide
        .filter((b) => b.attributes.has("file"))
        .map((b) => [b.attributes.get("file") as string, b.code]),
    );
    const expected = new Map(
      guide
        .filter((b) => b.attributes.has("expect"))
        .map((b) => [b.attributes.get("expect") as string, b.code]),
    );

    if (serverBlock === undefined) {
      throw new Error("docs/quick-start.md has no ```bash run=server block.");
    }

    const [command, ...flags] = serverBlock.code.trim().split(/\s+/);
    const dataIndex = flags.indexOf("--data-dir");

    if (command !== "sinterd" || dataIndex < 0) {
      throw new Error(
        "The guide's server command is not `sinterd --data-dir`.",
      );
    }

    flags[dataIndex + 1] = data;

    const serverArguments = [...flags, "--host", "127.0.0.1", "--port", "0"];
    const start = async (): Promise<RunningServer> => {
      const server = await startServer(sinterd, serverArguments);

      children.push(server.child);

      if (server.details["storage"] !== "disk") {
        throw new Error("The guide's server command does not store to disk.");
      }

      return server;
    };

    log("Type-checking the guide's programs against the installed package");
    typeCheck(root, project, files);

    log("Following the quick-start: store, restart, recover");

    const first = await start();

    expectOutput("app.ts", project, files, expected, first.port);

    if ((await first.stop("SIGINT")) !== 0) {
      throw new Error("The server did not exit cleanly on Ctrl+C.");
    }

    const second = await start();

    expectOutput("recover.ts", project, files, expected, second.port);

    if ((await second.stop("SIGINT")) !== 0) {
      throw new Error("The server did not exit cleanly on the second stop.");
    }

    log("Writing a document, killing the server, and recovering it");

    const third = await start();

    runInline(
      project,
      "before-crash.ts",
      `import { SinterClient } from "sinterdb";
const client = new SinterClient("sinterdb://127.0.0.1:${third.port}/todo");
await client.connect();
await client.db().collection("tasks").insertOne({ title: "Written before the crash", done: false, priority: 9 });
await client.close();
`,
    );
    await third.stop("SIGKILL");

    const fourth = await start();
    const titles = runInline(
      project,
      "after-crash.ts",
      `import { SinterClient } from "sinterdb";
const client = new SinterClient("sinterdb://127.0.0.1:${fourth.port}/todo");
await client.connect();
const tasks = await client.db().collection<{ title: string }>("tasks").find({}, { sort: [["priority", 1]] }).toArray();
console.log(tasks.map((task) => task.title).join("|"));
await client.close();
`,
    ).trim();

    if (
      titles !== "Write a document|Restart the server|Written before the crash"
    ) {
      throw new Error(`After the crash the tasks were: ${titles}`);
    }

    if ((await fourth.stop("SIGINT")) !== 0) {
      throw new Error("The server did not exit cleanly after the crash.");
    }

    return {
      version,
      packages: packed.map(({ name, packed: tarball }) => ({
        name,
        file: tarball.file,
        bytes: tarball.bytes,
        files: tarball.entries.length,
      })),
    };
  } finally {
    for (const child of children) {
      child.kill("SIGKILL");
    }

    rmSync(work, { recursive: true, force: true });
  }
}

function tarballName(name: string, version: string): string {
  return `${name.replace(/^@/, "").replace("/", "-")}-${version}.tgz`;
}

function run(
  command: string,
  arguments_: string[],
  options: { cwd: string },
): string {
  const result = spawnSync(command, arguments_, {
    cwd: options.cwd,
    encoding: "utf8",
    timeout: 180_000,
  });

  if (result.status !== 0) {
    throw new Error(
      `${command} ${arguments_.join(" ")} failed (${result.status ?? result.signal}):\n${result.stdout}${result.stderr}`,
    );
  }

  return result.stdout;
}

function typeCheck(
  root: string,
  project: string,
  files: ReadonlyMap<string, string>,
): void {
  for (const [name, source] of files) {
    writeFileSync(join(project, name), source);
  }

  writeFileSync(
    join(project, "tsconfig.json"),
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
        skipLibCheck: false,
        types: ["node"],
        typeRoots: [join(root, "node_modules/@types")],
      },
      include: [...files.keys()],
    }),
  );

  run(
    process.execPath,
    [join(root, "node_modules/typescript/bin/tsc"), "-p", project],
    { cwd: project },
  );
}

function runInline(project: string, name: string, source: string): string {
  writeFileSync(join(project, name), source);

  return run(process.execPath, [name], { cwd: project });
}

function expectOutput(
  name: string,
  project: string,
  files: ReadonlyMap<string, string>,
  expected: ReadonlyMap<string, string>,
  port: number,
): void {
  const source = files.get(name);
  const wanted = expected.get(name);

  if (source === undefined || wanted === undefined) {
    throw new Error(`docs/quick-start.md has no file or output for ${name}.`);
  }

  // The guide connects to the default port; the rehearsal uses a free one.
  writeFileSync(
    join(project, name),
    source.replaceAll("sinterdb://localhost", `sinterdb://127.0.0.1:${port}`),
  );

  const printed = run(process.execPath, [name], { cwd: project });

  if (printed.trim() !== wanted.trim()) {
    throw new Error(
      `${name} printed something other than the guide says.\nExpected:\n${wanted}\nGot:\n${printed}`,
    );
  }
}

function startServer(
  binary: string,
  arguments_: string[],
): Promise<RunningServer> {
  return new Promise((resolve, reject) => {
    const child = spawn(binary, arguments_, {
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    let errors = "";
    let started = false;
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`The server did not start.\n${output}${errors}`.trim()));
    }, 20_000);

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk: string) => {
      errors += chunk;
    });
    child.stdout.on("data", (chunk: string) => {
      output += chunk;

      const line = output
        .split("\n")
        .find((l) => l.includes('"server.started"'));

      if (started || line === undefined) {
        return;
      }

      const details = (JSON.parse(line) as { details: Record<string, unknown> })
        .details;

      started = true;
      clearTimeout(timer);
      resolve({
        child,
        port: details["port"] as number,
        details,
        stop: (signal) =>
          new Promise<number | null>((done) => {
            child.once("exit", (code) => done(code));
            child.kill(signal);
          }),
      });
    });
    child.on("exit", (code) => {
      if (!started) {
        clearTimeout(timer);
        reject(
          new Error(
            `The server exited early (code ${code}).\n${errors}`.trim(),
          ),
        );
      }
    });
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL("../../../", import.meta.url));
  const arguments_ = process.argv.slice(2);
  const outIndex = arguments_.indexOf("--out");
  const outputDirectory =
    outIndex >= 0 ? (arguments_[outIndex + 1] as string) : undefined;

  rehearseRelease({
    root,
    ...(outputDirectory === undefined ? {} : { outputDirectory }),
    log: (line) => process.stdout.write(`${line}\n`),
  }).then(
    (result) => {
      process.stdout.write(`\nRehearsal passed for ${result.version}.\n`);

      for (const entry of result.packages) {
        process.stdout.write(
          `  ${entry.name.padEnd(20)} ${String(entry.files).padStart(4)} files  ${(entry.bytes / 1024).toFixed(1).padStart(7)} KiB\n`,
        );
      }
    },
    (error: unknown) => {
      process.stderr.write(
        `\nRehearsal failed:\n${(error as Error).message}\n`,
      );
      process.exit(1);
    },
  );
}
