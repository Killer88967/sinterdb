import { spawnSync } from "node:child_process";
import { statSync } from "node:fs";

import type { Manifest } from "./manifests.ts";

export interface PackedPackage {
  readonly file: string;
  readonly bytes: number;
  readonly entries: readonly string[];
  readonly manifest: Manifest;
  /** The first line of the file the package's `bin` points at, if it has one. */
  readonly binFirstLine?: string;
}

function tar(file: string, ...arguments_: string[]): string {
  const result = spawnSync("tar", ["-xzOf", file, ...arguments_], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });

  if (result.status !== 0) {
    throw new Error(`tar could not read ${file}: ${result.stderr}`);
  }

  return result.stdout;
}

/** Reads what a published package would contain, straight from its tarball. */
export function readTarball(file: string): PackedPackage {
  const listing = spawnSync("tar", ["-tzf", file], { encoding: "utf8" });

  if (listing.status !== 0) {
    throw new Error(`tar could not list ${file}: ${listing.stderr}`);
  }

  const entries = listing.stdout.split("\n").filter((line) => line.length > 0);
  const manifest = JSON.parse(tar(file, "package/package.json")) as Manifest;
  const bin = Object.values(manifest.bin ?? {})[0];
  const binEntry = bin === undefined ? undefined : toEntry(bin);

  return {
    file,
    bytes: statSync(file).size,
    entries,
    manifest,
    ...(binEntry !== undefined && entries.includes(binEntry)
      ? { binFirstLine: tar(file, binEntry).split("\n")[0] ?? "" }
      : {}),
  };
}

function toEntry(path: string): string {
  return `package/${path.replace(/^\.\//, "")}`;
}

const NEVER_PUBLISHED = [
  /(^|\/)src\//,
  /(^|\/)etc\//,
  /(^|\/)node_modules\//,
  /\.test\.[cm]?[jt]s(\.map)?$/,
  /\.test\.d\.ts/,
  /(^|\/)tsconfig[^/]*\.json$/,
  /\.tsbuildinfo$/,
  /(^|\/)\.env/,
];

const REQUIRED_FILES: Readonly<Record<string, readonly string[]>> = {
  "sinterdb-protocol": ["dist/index.js", "dist/index.d.ts"],
  sinterdb: ["dist/index.js", "dist/index.d.ts"],
  "@sinterdb/cli": ["dist/index.js"],
};

/**
 * Returns every way a packed package differs from what users should receive:
 * missing files, files that should stay private, unresolved workspace ranges,
 * dependencies that are not published, and a command line tool that cannot
 * run.
 */
export function checkPackedPackage(
  name: string,
  version: string,
  packed: PackedPackage,
): string[] {
  const problems: string[] = [];
  const fail = (message: string): void => {
    problems.push(`${name}: ${message}`);
  };
  const { manifest, entries } = packed;

  if (manifest.name !== name) {
    fail(`the tarball is for ${manifest.name}.`);
  }

  if (manifest.version !== version) {
    fail(`the tarball is version ${manifest.version}, expected ${version}.`);
  }

  for (const entry of entries) {
    if (!entry.startsWith("package/")) {
      fail(`${entry} is outside the package/ folder.`);
    }
  }

  for (const required of [
    "package.json",
    "README.md",
    "LICENSE",
    "NOTICE",
    ...(REQUIRED_FILES[name] ?? []),
  ]) {
    if (!entries.includes(`package/${required}`)) {
      fail(`the tarball has no ${required}.`);
    }
  }

  for (const entry of entries) {
    if (NEVER_PUBLISHED.some((pattern) => pattern.test(entry))) {
      fail(`${entry} should not be published.`);
    }
  }

  for (const [field, ranges] of Object.entries({
    dependencies: manifest.dependencies,
    devDependencies: manifest.devDependencies,
  })) {
    for (const [dependency, range] of Object.entries(ranges ?? {})) {
      if (range.startsWith("workspace:")) {
        fail(`${field}.${dependency} is still "${range}".`);
      }
    }
  }

  const dependencies = Object.keys(manifest.dependencies ?? {});

  if (name === "sinterdb") {
    if (dependencies.join() !== "sinterdb-protocol") {
      fail(
        `it must depend on exactly sinterdb-protocol, not [${dependencies.join(", ")}].`,
      );
    } else if (manifest.dependencies?.["sinterdb-protocol"] !== `^${version}`) {
      fail(
        `it depends on sinterdb-protocol ${manifest.dependencies?.["sinterdb-protocol"]}, expected ^${version}.`,
      );
    }
  } else if (dependencies.length > 0) {
    // The protocol package is self-contained and the CLI is one bundled file.
    fail(
      `it must have no runtime dependencies, but lists [${dependencies.join(", ")}].`,
    );
  }

  if (name === "@sinterdb/cli") {
    if (manifest.bin?.["sinterd"] !== "./dist/index.js") {
      fail('bin.sinterd must be "./dist/index.js".');
    }

    if (packed.binFirstLine !== "#!/usr/bin/env node") {
      fail(
        `dist/index.js must start with "#!/usr/bin/env node", not ${JSON.stringify(packed.binFirstLine)}.`,
      );
    }
  }

  return problems;
}
