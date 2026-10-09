import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { afterEach, describe, expect, it } from "vitest";

import { checkRelease } from "./check.ts";
import {
  PUBLIC_PACKAGES,
  REPOSITORY_URL,
  VERSIONED_DIRECTORIES,
} from "./manifests.ts";

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function write(root: string, path: string, content: string): void {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), content);
}

/** A repository that passes every check, for a test to break on purpose. */
function makeRepo(version = "0.1.0"): string {
  const root = mkdtempSync(join(tmpdir(), "sinterdb-release-check-"));

  roots.push(root);
  write(root, "package.json", JSON.stringify({ name: "w", version }));

  for (const directory of VERSIONED_DIRECTORIES) {
    const entry = PUBLIC_PACKAGES.find((p) => p.directory === directory);

    write(
      root,
      `${directory}/package.json`,
      JSON.stringify({
        name: entry?.name ?? directory,
        version,
        license: "Apache-2.0",
        files: ["dist", "README.md", "LICENSE", "NOTICE"],
        engines: { node: ">=24.0.0" },
        publishConfig: { access: "public", provenance: true },
        repository: { url: REPOSITORY_URL, directory },
      }),
    );

    if (entry !== undefined) {
      write(
        root,
        `${directory}/CHANGELOG.md`,
        `# ${entry.name}\n\n## ${version}\n`,
      );
    }
  }

  write(root, `docs/releases/${version}.md`, "Release notes. ".repeat(30));
  write(
    root,
    "packages/driver/src/client.ts",
    `export const DRIVER_PRODUCT_VERSION = "${version}";\n`,
  );
  write(
    root,
    "packages/server/src/command-dispatcher.ts",
    `export const SERVER_PRODUCT_VERSION = "${version}";\n`,
  );
  write(
    root,
    "packages/driver/README.md",
    `Version \`${version}\` provides:\n`,
  );
  write(root, ".changeset/config.json", "{}");
  write(root, ".changeset/README.md", "# Changesets");

  return root;
}

function edit(
  root: string,
  path: string,
  change: (text: string) => string,
): void {
  write(root, path, change(readFileSync(join(root, path), "utf8")));
}

function editJson(
  root: string,
  path: string,
  change: (manifest: Record<string, unknown>) => void,
): void {
  edit(root, path, (text) => {
    const manifest = JSON.parse(text) as Record<string, unknown>;

    change(manifest);

    return JSON.stringify(manifest);
  });
}

describe("checkRelease", () => {
  it("accepts a repository that is ready", () => {
    expect(checkRelease(makeRepo(), { tag: "v0.1.0", release: true })).toEqual(
      [],
    );
  });

  it("accepts this repository's own state", () => {
    const root = fileURLToPath(new URL("../../../", import.meta.url));

    expect(checkRelease(root)).toEqual([]);
  });

  it("rejects a tag that is not the version", () => {
    const problems = checkRelease(makeRepo(), { tag: "v0.1.1" });

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("Expected v0.1.0");
  });

  it("rejects a prerelease or malformed root version", () => {
    const root = makeRepo();

    editJson(root, "package.json", (m) => (m["version"] = "0.1.0-next.1"));

    expect(checkRelease(root)).toHaveLength(1);
  });

  it("rejects a package that was not bumped", () => {
    const root = makeRepo();

    editJson(root, "packages/storage/package.json", (m) => {
      m["version"] = "0.0.9";
    });

    expect(checkRelease(root).join("\n")).toContain(
      "packages/storage/package.json is at 0.0.9",
    );
  });

  it("rejects missing or empty release notes", () => {
    const root = makeRepo();

    write(root, "docs/releases/0.1.0.md", "TODO");

    expect(checkRelease(root).join("\n")).toContain("docs/releases/0.1.0.md");
  });

  it("rejects a changelog without the release", () => {
    const root = makeRepo();

    write(root, "apps/server-cli/CHANGELOG.md", "# cli\n\n## 0.0.9\n");

    expect(checkRelease(root).join("\n")).toContain(
      'apps/server-cli/CHANGELOG.md has no "## 0.1.0"',
    );
  });

  it.each([
    ["private", (m: Record<string, unknown>) => (m["private"] = true)],
    ["access", (m: Record<string, unknown>) => (m["publishConfig"] = {})],
    [
      "provenance",
      (m: Record<string, unknown>) =>
        (m["publishConfig"] = { access: "public" }),
    ],
    [
      "repository url",
      (m: Record<string, unknown>) =>
        (m["repository"] = {
          url: "https://github.com/SinterDB/sinterdb",
          directory: "packages/driver",
        }),
    ],
    ["license", (m: Record<string, unknown>) => (m["license"] = "MIT")],
    ["files", (m: Record<string, unknown>) => (m["files"] = ["dist"])],
    ["engines", (m: Record<string, unknown>) => delete m["engines"]],
  ])("rejects a public package with a bad %s", (_name, change) => {
    const root = makeRepo();

    editJson(root, "packages/driver/package.json", change);

    const problems = checkRelease(root);

    expect(problems.length).toBeGreaterThan(0);

    for (const problem of problems) {
      expect(problem).toContain("packages/driver/package.json");
    }
  });

  it("rejects stale product versions", () => {
    const root = makeRepo();

    edit(root, "packages/driver/src/client.ts", (t) =>
      t.replace("0.1.0", "0.0.9"),
    );
    edit(root, "packages/server/src/command-dispatcher.ts", (t) =>
      t.replace("0.1.0", "0.0.9"),
    );

    const text = checkRelease(root).join("\n");

    expect(text).toContain("DRIVER_PRODUCT_VERSION is 0.0.9");
    expect(text).toContain("SERVER_PRODUCT_VERSION is 0.0.9");
  });

  it("rejects a README that still names the old version", () => {
    const root = makeRepo();

    write(root, "packages/driver/README.md", "Version `0.0.9` provides:\n");

    expect(checkRelease(root).join("\n")).toContain(
      "packages/driver/README.md",
    );
  });

  it("only complains about waiting changesets for a release", () => {
    const root = makeRepo();

    write(root, ".changeset/brave-lions.md", "---\n---\nSomething.");

    expect(checkRelease(root)).toEqual([]);
    expect(checkRelease(root, { release: true }).join("\n")).toContain(
      "brave-lions.md",
    );
  });
});
