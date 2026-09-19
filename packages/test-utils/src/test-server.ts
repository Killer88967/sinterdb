import {
  SinterServer,
  type ServerConfigInput,
  type SinterServerAddress,
} from "@sinterdb-internal/server";

export interface StartedTestServer {
  readonly server: SinterServer;
  readonly address: SinterServerAddress;
  readonly uri: string;
  close(): Promise<void>;
}

export async function startTestServer(
  options: ServerConfigInput = {},
): Promise<StartedTestServer> {
  const server = new SinterServer(
    {
      ...options,
      port: options.port ?? 0,
    },
    {},
  );

  const address = await server.start();
  const uri = createServerUri(address);

  return {
    server,
    address,
    uri,
    close: async () => {
      await server.stop();
    },
  };
}

export async function withTestServer<T>(
  callback: (testServer: StartedTestServer) => T | Promise<T>,
  options: ServerConfigInput = {},
): Promise<T> {
  const testServer = await startTestServer(options);

  try {
    return await callback(testServer);
  } finally {
    await testServer.close();
  }
}

function createServerUri(address: SinterServerAddress): string {
  const host = address.host.includes(":") ? `[${address.host}]` : address.host;

  return `sinterdb://${host}:${address.port}`;
}
