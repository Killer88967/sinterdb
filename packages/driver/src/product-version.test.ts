import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { DRIVER_PRODUCT_VERSION } from "./client.js";

describe("driver product version", () => {
  it("matches the package version", () => {
    const manifest = JSON.parse(
      readFileSync(new URL("../package.json", import.meta.url), "utf8"),
    ) as { version: string };

    expect(DRIVER_PRODUCT_VERSION).toBe(manifest.version);
  });
});
