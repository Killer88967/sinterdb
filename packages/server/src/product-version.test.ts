import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { SERVER_PRODUCT_VERSION } from "./command-dispatcher.js";

describe("server product version", () => {
  it("matches the package version", () => {
    const manifest = JSON.parse(
      readFileSync(new URL("../package.json", import.meta.url), "utf8"),
    ) as { version: string };

    expect(SERVER_PRODUCT_VERSION).toBe(manifest.version);
  });
});
