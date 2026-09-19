import { describe, expect, it } from "vitest";

import {
  DEFAULT_SERVER_HOST,
  DEFAULT_SERVER_PORT,
  ServerConfigurationError,
  resolveServerConfig,
} from "./config.js";

describe("resolveServerConfig", () => {
  it("uses the default configuration", () => {
    expect(resolveServerConfig({}, {})).toEqual({
      host: DEFAULT_SERVER_HOST,
      port: DEFAULT_SERVER_PORT,
    });
  });

  it("reads configuration from the environment", () => {
    expect(
      resolveServerConfig(
        {},
        {
          SINTERDB_HOST: "0.0.0.0",
          SINTERDB_PORT: "5000",
        },
      ),
    ).toEqual({
      host: "0.0.0.0",
      port: 5000,
    });
  });

  it("gives explicit input precedence over the environment", () => {
    expect(
      resolveServerConfig(
        {
          host: "127.0.0.1",
          port: 6000,
        },
        {
          SINTERDB_HOST: "0.0.0.0",
          SINTERDB_PORT: "5000",
        },
      ),
    ).toEqual({
      host: "127.0.0.1",
      port: 6000,
    });
  });

  it("allows port zero for temporary test servers", () => {
    expect(resolveServerConfig({ port: 0 }, {}).port).toBe(0);
  });

  it.each(["", " ", "-1", "65536", "1.5", "invalid"])(
    "rejects invalid port %j",
    (port) => {
      expect(() => resolveServerConfig({ port }, {})).toThrow(
        ServerConfigurationError,
      );
    },
  );

  it("rejects an empty host", () => {
    expect(() => resolveServerConfig({ host: " " }, {})).toThrow(
      ServerConfigurationError,
    );
  });

  it("identifies the invalid option", () => {
    try {
      resolveServerConfig({ port: -1 }, {});
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(ServerConfigurationError);

      if (error instanceof ServerConfigurationError) {
        expect(error.option).toBe("port");
      }

      return;
    }

    throw new Error("Expected invalid server configuration.");
  });
});
