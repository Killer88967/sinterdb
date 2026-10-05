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
      durability: "fsync",
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
      durability: "fsync",
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
      durability: "fsync",
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

describe("resolveServerConfig storage options", () => {
  it("keeps the server in memory without a data directory", () => {
    expect(resolveServerConfig({}, {})).not.toHaveProperty("dataDirectory");
  });

  it("reads the data directory and durability from input", () => {
    expect(
      resolveServerConfig(
        { dataDirectory: "  /var/lib/sinterdb  ", durability: "buffered" },
        {},
      ),
    ).toMatchObject({
      dataDirectory: "/var/lib/sinterdb",
      durability: "buffered",
    });
  });

  it("reads the data directory and durability from the environment", () => {
    expect(
      resolveServerConfig(
        {},
        { SINTERDB_DATA_DIR: "/data", SINTERDB_DURABILITY: "buffered" },
      ),
    ).toMatchObject({ dataDirectory: "/data", durability: "buffered" });
  });

  it("defaults to fsync durability with a data directory", () => {
    expect(resolveServerConfig({ dataDirectory: "/data" }, {})).toMatchObject({
      durability: "fsync",
    });
  });

  it("gives explicit input precedence over the environment", () => {
    expect(
      resolveServerConfig(
        { dataDirectory: "/explicit", durability: "fsync" },
        { SINTERDB_DATA_DIR: "/env", SINTERDB_DURABILITY: "buffered" },
      ),
    ).toMatchObject({ dataDirectory: "/explicit", durability: "fsync" });
  });

  it("rejects an empty data directory", () => {
    expect(() => resolveServerConfig({ dataDirectory: "   " }, {})).toThrow(
      ServerConfigurationError,
    );
  });

  it("rejects an unknown durability mode", () => {
    expect(() =>
      resolveServerConfig({ dataDirectory: "/data", durability: "fast" }, {}),
    ).toThrow(ServerConfigurationError);
  });

  it("rejects a durability mode without a data directory", () => {
    try {
      resolveServerConfig({ durability: "fsync" }, {});
      throw new Error("Expected a configuration error.");
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(ServerConfigurationError);
      expect((error as ServerConfigurationError).option).toBe("durability");
    }
  });
});
