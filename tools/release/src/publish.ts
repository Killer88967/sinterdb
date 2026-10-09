import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { PREVIEW_DIST_TAG, PUBLIC_PACKAGES, tarballSpec } from "./manifests.ts";

export interface CommandResult {
  readonly status: number | null;
  readonly stdout: string;
  readonly stderr: string;
}

export type CommandRunner = (
  command: string,
  arguments_: readonly string[],
) => CommandResult;

export interface PublishOptions {
  /** The folder holding the tarballs that `rehearse` packed and checked. */
  readonly directory: string;
  readonly version: string;
  /** The npm dist-tag to publish under. */
  readonly distTag: string;
  /** Run `npm publish --dry-run` instead. Nothing is uploaded. */
  readonly dryRun?: boolean;
  readonly run?: CommandRunner;
  readonly log?: (line: string) => void;
  /** Called between attempts to read a dist-tag back. */
  readonly wait?: (milliseconds: number) => void;
}

export interface PublishResult {
  readonly published: readonly string[];
  readonly skipped: readonly string[];
}

const defaultRun: CommandRunner = (command, arguments_) => {
  const result = spawnSync(command, [...arguments_], {
    encoding: "utf8",
    timeout: 300_000,
  });

  return {
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
};

function sleep(milliseconds: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}

/**
 * Publishes the packed packages to npm, protocol first because the driver
 * depends on it. It publishes the exact tarballs that were tested, with
 * provenance, under `distTag` and never `latest`. A version that is already on
 * npm is skipped, so a run that stopped halfway can be run again.
 */
export function publishTarballs(options: PublishOptions): PublishResult {
  const run = options.run ?? defaultRun;
  const log = options.log ?? (() => undefined);
  const wait = options.wait ?? sleep;
  const { version, distTag } = options;
  const published: string[] = [];
  const skipped: string[] = [];

  if (distTag === "latest") {
    throw new Error(
      'A developer preview must not be published under "latest". Promote it with `npm dist-tag add` after it has been tried.',
    );
  }

  const plan = PUBLIC_PACKAGES.map(({ name }) => ({
    name,
    file: tarballSpec(
      join(
        options.directory,
        `${name.replace(/^@/, "").replace("/", "-")}-${version}.tgz`,
      ),
    ),
  }));

  // Fail before uploading anything if a tarball is missing.
  for (const { name, file } of plan) {
    if (!existsSync(file) && options.run === undefined) {
      throw new Error(`The tarball for ${name} is missing: ${file}`);
    }
  }

  for (const { name, file } of plan) {
    const existing = run("npm", ["view", `${name}@${version}`, "version"]);

    if (existing.status === 0 && existing.stdout.trim() === version) {
      log(`${name}@${version} is already on npm; skipping.`);
      skipped.push(name);

      continue;
    }

    log(`Publishing ${name}@${version} under "${distTag}"`);

    const result = run("npm", [
      "publish",
      file,
      "--tag",
      distTag,
      "--access",
      "public",
      ...(options.dryRun === true ? ["--dry-run"] : ["--provenance"]),
    ]);

    if (result.status !== 0) {
      throw new Error(
        `npm publish failed for ${name}@${version}:\n${result.stdout}${result.stderr}`,
      );
    }

    published.push(name);

    if (options.dryRun !== true) {
      confirmTag(name, version, distTag, run, wait, log);
    }
  }

  return { published, skipped };
}

/** The registry can take a moment to show a new version; try a few times. */
function confirmTag(
  name: string,
  version: string,
  distTag: string,
  run: CommandRunner,
  wait: (milliseconds: number) => void,
  log: (line: string) => void,
): void {
  let seen = "nothing";

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const result = run("npm", ["view", name, "dist-tags", "--json"]);

    if (result.status === 0) {
      try {
        const tags = JSON.parse(result.stdout) as Record<string, string>;

        seen = JSON.stringify(tags);

        if (tags[distTag] === version) {
          // npm can point "latest" at the very first version of a new package
          // whatever tag it was published under. That is npm's doing, so say
          // so rather than fail a release that went out correctly.
          if (tags["latest"] === version && distTag !== "latest") {
            log(
              `Note: npm also points "latest" at ${name}@${version}. It does that for the first version of a package; it is replaced by the next release you promote.`,
            );
          }

          return;
        }
      } catch {
        // Not JSON yet; try again.
      }
    }

    wait(5_000);
  }

  throw new Error(
    `${name}@${version} was published, but the "${distTag}" tag does not point at it. The registry reports ${seen}.`,
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arguments_ = process.argv.slice(2);
  const value = (flag: string): string | undefined => {
    const index = arguments_.indexOf(flag);

    return index >= 0 ? arguments_[index + 1] : undefined;
  };
  const directory = value("--dir");
  const version = value("--version");

  if (directory === undefined || version === undefined) {
    process.stderr.write(
      "Usage: node src/publish.ts --dir <tarballs> --version <x.y.z> [--tag next] [--dry-run]\n",
    );
    process.exit(2);
  }

  try {
    const result = publishTarballs({
      directory,
      version,
      distTag: value("--tag") ?? PREVIEW_DIST_TAG,
      dryRun: arguments_.includes("--dry-run"),
      log: (line) => process.stdout.write(`${line}\n`),
    });

    process.stdout.write(
      `\nPublished: ${result.published.join(", ") || "nothing"}. Skipped: ${result.skipped.join(", ") || "nothing"}.\n`,
    );
  } catch (error: unknown) {
    process.stderr.write(`\n${(error as Error).message}\n`);
    process.exit(1);
  }
}
