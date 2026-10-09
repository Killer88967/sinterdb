import { describe, expect, it } from "vitest";

import { checkPackedPackage, type PackedPackage } from "./tarball.ts";

const COMMON = [
  "package/package.json",
  "package/README.md",
  "package/LICENSE",
  "package/NOTICE",
];

function driver(overrides: Partial<PackedPackage> = {}): PackedPackage {
  return {
    file: "sinterdb-0.1.0.tgz",
    bytes: 1,
    entries: [...COMMON, "package/dist/index.js", "package/dist/index.d.ts"],
    manifest: {
      name: "sinterdb",
      version: "0.1.0",
      dependencies: { "sinterdb-protocol": "^0.1.0" },
    },
    ...overrides,
  };
}

function cli(overrides: Partial<PackedPackage> = {}): PackedPackage {
  return {
    file: "sinterdb-cli-0.1.0.tgz",
    bytes: 1,
    entries: [...COMMON, "package/dist/index.js"],
    manifest: {
      name: "@sinterdb/cli",
      version: "0.1.0",
      bin: { sinterd: "./dist/index.js" },
    },
    binFirstLine: "#!/usr/bin/env node",
    ...overrides,
  };
}

describe("checkPackedPackage", () => {
  it("accepts a correct driver and CLI", () => {
    expect(checkPackedPackage("sinterdb", "0.1.0", driver())).toEqual([]);
    expect(checkPackedPackage("@sinterdb/cli", "0.1.0", cli())).toEqual([]);
  });

  it("accepts a protocol package with no dependencies", () => {
    const protocol: PackedPackage = {
      ...driver(),
      manifest: { name: "sinterdb-protocol", version: "0.1.0" },
    };

    expect(checkPackedPackage("sinterdb-protocol", "0.1.0", protocol)).toEqual(
      [],
    );
  });

  it("rejects a wrong name or version", () => {
    const problems = checkPackedPackage(
      "sinterdb",
      "0.1.0",
      driver({ manifest: { name: "other", version: "0.0.9" } }),
    );

    expect(problems.join("\n")).toContain("tarball is for other");
    expect(problems.join("\n")).toContain("version 0.0.9");
  });

  it.each([
    "README.md",
    "LICENSE",
    "NOTICE",
    "dist/index.js",
    "dist/index.d.ts",
  ])("rejects a driver without %s", (file) => {
    const entries = driver().entries.filter((e) => e !== `package/${file}`);

    expect(
      checkPackedPackage("sinterdb", "0.1.0", driver({ entries })).join(),
    ).toContain(`no ${file}`);
  });

  it.each([
    "package/src/client.ts",
    "package/etc/sinterdb.api.md",
    "package/dist/client.test.js",
    "package/dist/client.test.d.ts",
    "package/tsconfig.json",
    "package/tsconfig.build.tsbuildinfo",
    "package/node_modules/x/index.js",
    "package/.env",
  ])("rejects %s in the tarball", (entry) => {
    const entries = [...driver().entries, entry];

    expect(
      checkPackedPackage("sinterdb", "0.1.0", driver({ entries })).join(),
    ).toContain(`${entry} should not be published`);
  });

  it("rejects an unresolved workspace range", () => {
    const problems = checkPackedPackage(
      "sinterdb",
      "0.1.0",
      driver({
        manifest: {
          name: "sinterdb",
          version: "0.1.0",
          dependencies: { "sinterdb-protocol": "workspace:^" },
        },
      }),
    );

    expect(problems.join("\n")).toContain('"workspace:^"');
  });

  it("rejects a protocol range that does not follow the version", () => {
    const problems = checkPackedPackage(
      "sinterdb",
      "0.1.0",
      driver({
        manifest: {
          name: "sinterdb",
          version: "0.1.0",
          dependencies: { "sinterdb-protocol": "^0.0.9" },
        },
      }),
    );

    expect(problems.join()).toContain("expected ^0.1.0");
  });

  it("rejects runtime dependencies the CLI and protocol must not have", () => {
    const withDependency = {
      ...cli().manifest,
      dependencies: { esbuild: "^1.0.0" },
    };

    expect(
      checkPackedPackage(
        "@sinterdb/cli",
        "0.1.0",
        cli({ manifest: withDependency }),
      ).join(),
    ).toContain("no runtime dependencies");
  });

  it("rejects a CLI that cannot run as a command", () => {
    expect(
      checkPackedPackage(
        "@sinterdb/cli",
        "0.1.0",
        cli({ binFirstLine: "import x" }),
      ).join(),
    ).toContain("#!/usr/bin/env node");
    expect(
      checkPackedPackage(
        "@sinterdb/cli",
        "0.1.0",
        cli({ manifest: { ...cli().manifest, bin: { sinterd: "./x.js" } } }),
      ).join(),
    ).toContain("bin.sinterd");
  });
});
