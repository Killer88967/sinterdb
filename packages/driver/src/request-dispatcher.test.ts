import { once } from "node:events";
import {
  createConnection,
  createServer,
  type AddressInfo,
  type Server,
  type Socket,
} from "node:net";

import {
  encodeMessage,
  MessageKind,
  MessageStreamDecoder,
  WireErrorCode,
  type DecodedMessage,
} from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import {
  RequestDispatcher,
  type RequestDispatcherOptions,
} from "./request-dispatcher.js";
import { SinterRequestTimeoutError, SinterServerError } from "./errors.js";

describe("RequestDispatcher", () => {
  it("routes a result to its request", async () => {
    const { server, port } = await startTestServer((request, socket) => {
      socket.write(
        encodeMessage({
          kind: MessageKind.Result,
          requestId: request.requestId,
          payload: {
            value: {
              ok: true,
            },
          },
        }),
      );
    });

    const socket = await connectToServer(port);
    const dispatcher = createDispatcher(socket);

    try {
      const response = await dispatcher.request(MessageKind.Ping, {
        sentAt: new Date(),
      });

      expect(response.kind).toBe(MessageKind.Result);

      if (response.kind === MessageKind.Result) {
        expect(response.payload.value).toEqual({
          ok: true,
        });
      }
    } finally {
      dispatcher.close();
      await closeSocket(socket);
      await stopServer(server);
    }
  });

  it("routes concurrent responses by request ID", async () => {
    const requests: DecodedMessage[] = [];

    const { server, port } = await startTestServer((request, socket) => {
      requests.push(request);

      if (requests.length !== 2) {
        return;
      }

      for (const queued of [...requests].reverse()) {
        socket.write(
          encodeMessage({
            kind: MessageKind.Result,
            requestId: queued.requestId,
            payload: {
              value: queued.requestId,
            },
          }),
        );
      }
    });

    const socket = await connectToServer(port);
    const dispatcher = createDispatcher(socket);

    try {
      const first = dispatcher.request(MessageKind.Ping, {
        sentAt: new Date(),
      });
      const second = dispatcher.request(MessageKind.Ping, {
        sentAt: new Date(),
      });

      const [firstResponse, secondResponse] = await Promise.all([
        first,
        second,
      ]);

      expect(firstResponse.requestId).not.toBe(secondResponse.requestId);
      expect(firstResponse.kind).toBe(MessageKind.Result);
      expect(secondResponse.kind).toBe(MessageKind.Result);

      if (
        firstResponse.kind === MessageKind.Result &&
        secondResponse.kind === MessageKind.Result
      ) {
        expect(firstResponse.payload.value).toBe(firstResponse.requestId);
        expect(secondResponse.payload.value).toBe(secondResponse.requestId);
      }
    } finally {
      dispatcher.close();
      await closeSocket(socket);
      await stopServer(server);
    }
  });

  it("converts wire errors into driver server errors", async () => {
    const { server, port } = await startTestServer((request, socket) => {
      socket.write(
        encodeMessage({
          kind: MessageKind.Error,
          requestId: request.requestId,
          payload: {
            code: WireErrorCode.InvalidRequest,
            name: "InvalidRequest",
            message: "The request was rejected.",
            retryable: false,
          },
        }),
      );
    });

    const socket = await connectToServer(port);
    const dispatcher = createDispatcher(socket);

    try {
      await expect(
        dispatcher.request(MessageKind.Ping, {
          sentAt: new Date(),
        }),
      ).rejects.toBeInstanceOf(SinterServerError);
    } finally {
      dispatcher.close();
      await closeSocket(socket);
      await stopServer(server);
    }
  });

  it("times out an unanswered request", async () => {
    const { server, port } = await startTestServer(() => undefined);
    const socket = await connectToServer(port);
    const dispatcher = createDispatcher(socket, {
      requestTimeoutMS: 20,
    });

    try {
      await expect(
        dispatcher.request(MessageKind.Ping, {
          sentAt: new Date(),
        }),
      ).rejects.toBeInstanceOf(SinterRequestTimeoutError);
    } finally {
      dispatcher.close();
      await closeSocket(socket);
      await stopServer(server);
    }
  });
});

type RequestHandler = (request: DecodedMessage, socket: Socket) => void;

function createDispatcher(
  socket: Socket,
  options: RequestDispatcherOptions = {
    requestTimeoutMS: 1_000,
  },
): RequestDispatcher {
  return new RequestDispatcher(socket, options);
}

async function startTestServer(handleRequest: RequestHandler): Promise<{
  server: Server;
  port: number;
}> {
  const server = createServer((socket) => {
    const decoder = new MessageStreamDecoder();

    socket.on("data", (chunk) => {
      const messages = decoder.push(chunk);

      for (const message of messages) {
        handleRequest(message, socket);
      }
    });
  });

  server.listen({
    host: "127.0.0.1",
    port: 0,
  });

  await once(server, "listening");

  const address = server.address();

  if (address === null || typeof address === "string") {
    throw new Error("Expected the test server to use a TCP address.");
  }

  return {
    server,
    port: (address as AddressInfo).port,
  };
}

async function connectToServer(port: number): Promise<Socket> {
  const socket = createConnection({
    host: "127.0.0.1",
    port,
  });

  await once(socket, "connect");

  return socket;
}

async function closeSocket(socket: Socket): Promise<void> {
  if (socket.destroyed) {
    return;
  }

  const closed = once(socket, "close");
  socket.destroy();
  await closed;
}

async function stopServer(server: Server): Promise<void> {
  if (!server.listening) {
    return;
  }

  server.close();
  await once(server, "close");
}
