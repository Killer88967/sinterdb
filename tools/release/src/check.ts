import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  PUBLIC_PACKAGES,
  REPOSITORY_URL,
  VERSIONED_DIRECTORIES,
  readManifest,
  readText,
  type Manifest,
} from "./manifests.ts";

export interface CheckOptions {
  /** The git tag being released, such as `v0.1.0`. */
  readonly tag?: string;
  /**
   * Also require that the version has been applied: no changeset is waiting.
   * Left off during development, when changesets pile up on purpose.
   */
  readonly release?: boolean;
}

const SEMVER = /^\d+\.\d+\.\d+$/;

/**
 * Returns every reason the repository is not ready to publish. An empty list
 * means the version, the notes, the manifests and the version text agree.
 */
export function checkRelease(
  root: string,
  options: CheckOptions = {},
): string[] {
  const problems: string[] = [];
  const rootManifest = readManifest(root, ".");
  const version = rootManifest.version ?? "";

  if (!SEMVER.test(version)) {
    return [
      `The root package.json version ${JSON.stringify(version)} is not a plain major.minor.patch version.`,
    ];
  }

  for (const directory of VERSIONED_DIRECTORIES) {
    const found = readManifest(root, directory).version;

    if (found !== version) {
      problems.push(
        `${directory}/package.json is at ${found} but the root is at ${version}. Run \`pnpm version-packages\` and update the root version.`,
      );
    }
  }

  if (options.tag !== undefined && options.tag !== `v${version}`) {
    problems.push(
      `The tag ${options.tag} does not match version ${version}. Expected v${version}.`,
    );
  }

  const notes = readText(root, `docs/releases/${version}.md`);

  if (notes === undefined || notes.trim().length < 200) {
    problems.push(
      `docs/releases/${version}.md is missing or too short to be release notes.`,
    );
  }

  for (const { name, directory } of PUBLIC_PACKAGES) {
    const changelog = readText(root, `${directory}/CHANGELOG.md`);

    if (changelog === undefined || !changelog.includes(`## ${version}`)) {
      problems.push(`${directory}/CHANGELOG.md has no "## ${version}" entry.`);
    }

    problems.push(
      ...checkPublicManifest(name, directory, readManifest(root, directory)),
    );
  }

  problems.push(...checkVersionText(root, version));

  if (options.release === true) {
    const pending = pendingChangesets(root);

    if (pending.length > 0) {
      problems.push(
        `These changesets are still waiting: ${pending.join(", ")}. Run \`pnpm version-packages\` and commit the result.`,
      );
    }
  }

  return problems;
}

function checkPublicManifest(
  name: string,
  directory: string,
  manifest: Manifest,
): string[] {
  const problems: string[] = [];
  const fail = (message: string): void => {
    problems.push(`${directory}/package.json: ${message}`);
  };

  if (manifest.name !== name) {
    fail(`the name is ${manifest.name}, expected ${name}.`);
  }

  if (manifest.private === true) {
    fail("the package is private, so npm would refuse to publish it.");
  }

  if (manifest.publishConfig?.access !== "public") {
    fail('publishConfig.access must be "public".');
  }

  if (manifest.publishConfig?.provenance !== true) {
    fail("publishConfig.provenance must be true.");
  }

  // npm compares this with the repository that runs the workflow.
  if (manifest.repository?.url !== REPOSITORY_URL) {
    fail(`repository.url must be exactly ${REPOSITORY_URL}.`);
  }

  if (manifest.repository?.directory !== directory) {
    fail(`repository.directory must be ${directory}.`);
  }

  if (manifest.license !== "Apache-2.0") {
    fail("the license must be Apache-2.0.");
  }

  for (const file of ["LICENSE", "NOTICE", "README.md"]) {
    if (!(manifest.files ?? []).includes(file)) {
      fail(`files must include ${file}.`);
    }
  }

  if (manifest.engines?.["node"] === undefined) {
    fail("engines.node is missing.");
  }

  return problems;
}

/** Product versions and "Version x provides" text must follow the release. */
function checkVersionText(root: string, version: string): string[] {
  const problems: string[] = [];
  const constants: [string, string][] = [
    ["packages/driver/src/client.ts", "DRIVER_PRODUCT_VERSION"],
    ["packages/server/src/command-dispatcher.ts", "SERVER_PRODUCT_VERSION"],
  ];

  for (const [path, constant] of constants) {
    const source = readText(root, path) ?? "";
    const found = new RegExp(`${constant} = "([^"]*)"`).exec(source)?.[1];

    if (found !== version) {
      problems.push(`${path}: ${constant} is ${found}, expected ${version}.`);
    }
  }

  for (const path of [
    "packages/driver/README.md",
    "apps/server-cli/README.md",
  ]) {
    for (const match of (readText(root, path) ?? "").matchAll(
      /^Version `(\d+\.\d+\.\d+)` provides/gm,
    )) {
      if (match[1] !== version) {
        problems.push(
          `${path}: says "Version \`${match[1]}\` provides" but the release is ${version}.`,
        );
      }
    }
  }

  return problems;
}

function pendingChangesets(root: string): string[] {
  try {
    return readdirSync(join(root, ".changeset")).filter(
      (file) => file.endsWith(".md") && file !== "README.md",
    );
  } catch {
    return [];
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL("../../../", import.meta.url));
  const arguments_ = process.argv.slice(2);
  const tagIndex = arguments_.indexOf("--tag");
  const tag = tagIndex >= 0 ? arguments_[tagIndex + 1] : undefined;
  const problems = checkRelease(root, {
    ...(tag === undefined ? {} : { tag }),
    release: arguments_.includes("--release"),
  });

  if (problems.length > 0) {
    process.stderr.write(
      `The release is not ready:\n${problems.map((p) => `- ${p}`).join("\n")}\n`,
    );
    process.exit(1);
  }

  process.stdout.write("The release checks passed.\n");
}
