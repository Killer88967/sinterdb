import { ApiReferencePage } from "../../_components/api-reference-page";

const api = {
  "id": 32,
  "name": "SinterClient",
  "slug": "SinterClient",
  "kind": "Class",
  "kindId": 128,
  "route": "classes/SinterClient",
  "description": "A connection to a SinterDB server.\n\nCreate a client from a `sinterdb://` connection string, call `connect()`,\nand then use `db()` to reach databases and collections. Commands sent\nbefore `connect()` completes throw a SinterClientStateError. Call\n`close()` when finished.",
  "type": null,
  "flags": {
    "static": false,
    "readonly": false,
    "optional": false,
    "abstract": false,
    "protected": false,
    "private": false,
    "external": false
  },
  "source": {
    "fileName": "packages/driver/dist/client.d.ts",
    "line": 115,
    "character": 21,
    "url": null
  },
  "hierarchy": {
    "extends": [
      "EventEmitter<SinterClientEvents>"
    ],
    "extendedBy": []
  },
  "typeParameters": [],
  "signatures": [],
  "children": [
    {
      "id": 33,
      "name": "constructor",
      "anchor": "constructor",
      "kind": "Constructor",
      "kindId": 512,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 133,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 34,
          "name": "SinterClient",
          "description": "",
          "typeParameters": [],
          "parameters": [
            {
              "name": "connectionString",
              "type": "string",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "options",
              "type": "SinterClientOptions",
              "optional": true,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "SinterClient",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/client.d.ts",
            "line": 133,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 38,
      "name": "connectTimeoutMS",
      "anchor": "connect-timeout-ms",
      "kind": "Property",
      "kindId": 1024,
      "description": "The effective connect timeout in milliseconds.",
      "type": "number",
      "flags": {
        "static": false,
        "readonly": true,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 121,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 39,
      "name": "requestTimeoutMS",
      "anchor": "request-timeout-ms",
      "kind": "Property",
      "kindId": 1024,
      "description": "The effective request timeout in milliseconds.",
      "type": "number",
      "flags": {
        "static": false,
        "readonly": true,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 123,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 40,
      "name": "socketTimeoutMS",
      "anchor": "socket-timeout-ms",
      "kind": "Property",
      "kindId": 1024,
      "description": "The effective idle socket timeout in milliseconds, or 0 when disabled.",
      "type": "number",
      "flags": {
        "static": false,
        "readonly": true,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 127,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 37,
      "name": "target",
      "anchor": "target",
      "kind": "Property",
      "kindId": 1024,
      "description": "The host, port and optional database parsed from the connection string.",
      "type": "ParsedSinterConnectionString",
      "flags": {
        "static": false,
        "readonly": true,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 119,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 48,
      "name": "connected",
      "anchor": "connected",
      "kind": "Accessor",
      "kindId": 262144,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 137,
        "character": 8,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 50,
      "name": "serverInfo",
      "anchor": "server-info",
      "kind": "Accessor",
      "kindId": 262144,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 142,
        "character": 8,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 46,
      "name": "state",
      "anchor": "state",
      "kind": "Accessor",
      "kindId": 262144,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 135,
        "character": 8,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 167,
      "name": "[captureRejectionSymbol]",
      "anchor": "-capture-rejection-symbol-",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": true,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 87,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 168,
          "name": "[captureRejectionSymbol]",
          "description": "The `Symbol.for('nodejs.rejection')` method is called in case a\npromise rejection happens when emitting an event and\n`captureRejections` is enabled on the emitter.\nIt is possible to use `events.captureRejectionSymbol` in\nplace of `Symbol.for('nodejs.rejection')`.\n\n```js\nimport { EventEmitter, captureRejectionSymbol } from 'node:events';\n\nclass MyClass extends EventEmitter {\n  constructor() {\n    super({ captureRejections: true });\n  }\n\n  [captureRejectionSymbol](err, event, ...args) {\n    console.log('rejection happened for', event, 'with', err, ...args);\n    this.destroy(err);\n  }\n\n  destroy(err) {\n    // Tear the resource down here.\n  }\n}\n```",
          "typeParameters": [],
          "parameters": [
            {
              "name": "error",
              "type": "Error",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "event",
              "type": "string | symbol",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "args",
              "type": "any[]",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "void",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 87,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 73,
      "name": "addListener",
      "anchor": "add-listener",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 92,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 74,
          "name": "addListener",
          "description": "Alias for `emitter.on(eventName, listener)`.",
          "typeParameters": [
            {
              "name": "E",
              "type": "string | symbol",
              "default": null
            }
          ],
          "parameters": [
            {
              "name": "eventName",
              "type": "\"connecting\" | \"connected\" | \"closed\" | E | (keyof EventEmitterEventMap) | \"error\"",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "listener",
              "type": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "this",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 92,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 66,
      "name": "close",
      "anchor": "close",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 188,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 67,
          "name": "close",
          "description": "Closes the connection. Requests still waiting for a response fail.\nClosing a closed client does nothing.",
          "typeParameters": [],
          "parameters": [],
          "returns": "Promise<void>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/client.d.ts",
            "line": 188,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 52,
      "name": "connect",
      "anchor": "connect",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 153,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 53,
          "name": "connect",
          "description": "Opens the connection and performs the protocol handshake.\n\nCalling `connect()` on a connected client resolves immediately, and\nconcurrent calls share one attempt. If the attempt fails, the client\nreturns to `new` and `connect()` may be tried again. A closed client\nrejects with a SinterClientStateError.",
          "typeParameters": [],
          "parameters": [],
          "returns": "Promise<SinterClient>",
          "returnsDescription": "This client, so calls can be chained.",
          "source": {
            "fileName": "packages/driver/dist/client.d.ts",
            "line": 153,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 63,
      "name": "db",
      "anchor": "db",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 183,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 64,
          "name": "db",
          "description": "Returns a handle to a database.\n\nThe handle is created locally; no request is sent, and the database is\ncreated on the server by the first write. Without `name`, the database\nfrom the connection string is used.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "name",
              "type": "string",
              "optional": true,
              "defaultValue": null,
              "description": "The database name. Optional when the connection string\n  names one."
            }
          ],
          "returns": "SinterDatabase",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/client.d.ts",
            "line": 183,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 81,
      "name": "emit",
      "anchor": "emit",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 134,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 82,
          "name": "emit",
          "description": "Synchronously calls each of the listeners registered for the event named\n`eventName`, in the order they were registered, passing the supplied arguments\nto each.\n\nReturns `true` if the event had listeners, `false` otherwise.\n\n```js\nimport { EventEmitter } from 'node:events';\nconst myEmitter = new EventEmitter();\n\n// First listener\nmyEmitter.on('event', function firstListener() {\n  console.log('Helloooo! first listener');\n});\n// Second listener\nmyEmitter.on('event', function secondListener(arg1, arg2) {\n  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);\n});\n// Third listener\nmyEmitter.on('event', function thirdListener(...args) {\n  const parameters = args.join(', ');\n  console.log(`event with parameters ${parameters} in third listener`);\n});\n\nconsole.log(myEmitter.listeners('event'));\n\nmyEmitter.emit('event', 1, 2, 3, 4, 5);\n\n// Prints:\n// [\n//   [Function: firstListener],\n//   [Function: secondListener],\n//   [Function: thirdListener]\n// ]\n// Helloooo! first listener\n// event with parameters 1, 2 in second listener\n// event with parameters 1, 2, 3, 4, 5 in third listener\n```",
          "typeParameters": [
            {
              "name": "E",
              "type": "string | symbol",
              "default": null
            }
          ],
          "parameters": [
            {
              "name": "eventName",
              "type": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "args",
              "type": "E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "boolean",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 134,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 86,
      "name": "eventNames",
      "anchor": "event-names",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 154,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 87,
          "name": "eventNames",
          "description": "Returns an array listing the events for which the emitter has registered\nlisteners.\n\n```js\nimport { EventEmitter } from 'node:events';\n\nconst myEE = new EventEmitter();\nmyEE.on('foo', () => {});\nmyEE.on('bar', () => {});\n\nconst sym = Symbol('symbol');\nmyEE.on(sym, () => {});\n\nconsole.log(myEE.eventNames());\n// Prints: [ 'foo', 'bar', Symbol(symbol) ]\n```",
          "typeParameters": [],
          "parameters": [],
          "returns": "(string | symbol)[]",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 154,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 56,
      "name": "executeCommand",
      "anchor": "execute-command",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 168,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 57,
          "name": "executeCommand",
          "description": "Sends a command by name and returns the raw result.\n\nThis is the low-level entry point behind the collection and database\nmethods. Prefer those; the command names and parameters are part of the\nwire protocol, not of the typed API.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "database",
              "type": "string | undefined",
              "optional": false,
              "defaultValue": null,
              "description": "The database to run the command in, or `undefined` for\n  server-wide commands."
            },
            {
              "name": "command",
              "type": "string",
              "optional": false,
              "defaultValue": null,
              "description": "The command name."
            },
            {
              "name": "parameters",
              "type": "Document",
              "optional": false,
              "defaultValue": null,
              "description": "The command parameters."
            }
          ],
          "returns": "Promise<DocumentValue>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/client.d.ts",
            "line": 168,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 88,
      "name": "getMaxListeners",
      "anchor": "get-max-listeners",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 161,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 89,
          "name": "getMaxListeners",
          "description": "Returns the current max listener value for the `EventEmitter` which is either\nset by `emitter.setMaxListeners(n)` or defaults to\n`events.defaultMaxListeners`.",
          "typeParameters": [],
          "parameters": [],
          "returns": "number",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 161,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 61,
      "name": "listDatabases",
      "anchor": "list-databases",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 170,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 62,
          "name": "listDatabases",
          "description": "Lists the names of the databases on the server.",
          "typeParameters": [],
          "parameters": [],
          "returns": "Promise<string[]>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/client.d.ts",
            "line": 170,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 90,
      "name": "listenerCount",
      "anchor": "listener-count",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 170,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 91,
          "name": "listenerCount",
          "description": "Returns the number of listeners listening for the event named `eventName`.\nIf `listener` is provided, it will return how many times the listener is found\nin the list of the listeners of the event.",
          "typeParameters": [
            {
              "name": "E",
              "type": "string | symbol",
              "default": null
            }
          ],
          "parameters": [
            {
              "name": "eventName",
              "type": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
              "optional": false,
              "defaultValue": null,
              "description": "The name of the event being listened for"
            },
            {
              "name": "listener",
              "type": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
              "optional": true,
              "defaultValue": null,
              "description": "The event handler function"
            }
          ],
          "returns": "number",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 170,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 98,
      "name": "listeners",
      "anchor": "listeners",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 186,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 99,
          "name": "listeners",
          "description": "Returns a copy of the array of listeners for the event named `eventName`.\n\n```js\nserver.on('connection', (stream) => {\n  console.log('someone connected!');\n});\nconsole.log(util.inspect(server.listeners('connection')));\n// Prints: [ [Function] ]\n```",
          "typeParameters": [
            {
              "name": "E",
              "type": "string | symbol",
              "default": null
            }
          ],
          "parameters": [
            {
              "name": "eventName",
              "type": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "((args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void)[]",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 186,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 105,
      "name": "off",
      "anchor": "off",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 191,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 106,
          "name": "off",
          "description": "Alias for `emitter.removeListener()`.",
          "typeParameters": [
            {
              "name": "E",
              "type": "string | symbol",
              "default": null
            }
          ],
          "parameters": [
            {
              "name": "eventName",
              "type": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "listener",
              "type": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "this",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 191,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 113,
      "name": "on",
      "anchor": "on",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 225,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 114,
          "name": "on",
          "description": "Adds the `listener` function to the end of the listeners array for the\nevent named `eventName`. No checks are made to see if the `listener` has\nalready been added. Multiple calls passing the same combination of `eventName`\nand `listener` will result in the `listener` being added, and called, multiple\ntimes.\n\n```js\nserver.on('connection', (stream) => {\n  console.log('someone connected!');\n});\n```\n\nReturns a reference to the `EventEmitter`, so that calls can be chained.\n\nBy default, event listeners are invoked in the order they are added. The\n`emitter.prependListener()` method can be used as an alternative to add the\nevent listener to the beginning of the listeners array.\n\n```js\nimport { EventEmitter } from 'node:events';\nconst myEE = new EventEmitter();\nmyEE.on('foo', () => console.log('a'));\nmyEE.prependListener('foo', () => console.log('b'));\nmyEE.emit('foo');\n// Prints:\n//   b\n//   a\n```",
          "typeParameters": [
            {
              "name": "E",
              "type": "string | symbol",
              "default": null
            }
          ],
          "parameters": [
            {
              "name": "eventName",
              "type": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
              "optional": false,
              "defaultValue": null,
              "description": "The name of the event."
            },
            {
              "name": "listener",
              "type": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
              "optional": false,
              "defaultValue": null,
              "description": "The callback function"
            }
          ],
          "returns": "this",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 225,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 121,
      "name": "once",
      "anchor": "once",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 256,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 122,
          "name": "once",
          "description": "Adds a **one-time** `listener` function for the event named `eventName`. The\nnext time `eventName` is triggered, this listener is removed and then invoked.\n\n```js\nserver.once('connection', (stream) => {\n  console.log('Ah, we have our first user!');\n});\n```\n\nReturns a reference to the `EventEmitter`, so that calls can be chained.\n\nBy default, event listeners are invoked in the order they are added. The\n`emitter.prependOnceListener()` method can be used as an alternative to add the\nevent listener to the beginning of the listeners array.\n\n```js\nimport { EventEmitter } from 'node:events';\nconst myEE = new EventEmitter();\nmyEE.once('foo', () => console.log('a'));\nmyEE.prependOnceListener('foo', () => console.log('b'));\nmyEE.emit('foo');\n// Prints:\n//   b\n//   a\n```",
          "typeParameters": [
            {
              "name": "E",
              "type": "string | symbol",
              "default": null
            }
          ],
          "parameters": [
            {
              "name": "eventName",
              "type": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
              "optional": false,
              "defaultValue": null,
              "description": "The name of the event."
            },
            {
              "name": "listener",
              "type": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
              "optional": false,
              "defaultValue": null,
              "description": "The callback function"
            }
          ],
          "returns": "this",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 256,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 54,
      "name": "ping",
      "anchor": "ping",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/client.d.ts",
        "line": 155,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 55,
          "name": "ping",
          "description": "Sends a ping to the server and measures the round trip.",
          "typeParameters": [],
          "parameters": [],
          "returns": "Promise<SinterPingResult>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/client.d.ts",
            "line": 155,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 129,
      "name": "prependListener",
      "anchor": "prepend-listener",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 275,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 130,
          "name": "prependListener",
          "description": "Adds the `listener` function to the _beginning_ of the listeners array for the\nevent named `eventName`. No checks are made to see if the `listener` has\nalready been added. Multiple calls passing the same combination of `eventName`\nand `listener` will result in the `listener` being added, and called, multiple\ntimes.\n\n```js\nserver.prependListener('connection', (stream) => {\n  console.log('someone connected!');\n});\n```\n\nReturns a reference to the `EventEmitter`, so that calls can be chained.",
          "typeParameters": [
            {
              "name": "E",
              "type": "string | symbol",
              "default": null
            }
          ],
          "parameters": [
            {
              "name": "eventName",
              "type": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
              "optional": false,
              "defaultValue": null,
              "description": "The name of the event."
            },
            {
              "name": "listener",
              "type": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
              "optional": false,
              "defaultValue": null,
              "description": "The callback function"
            }
          ],
          "returns": "this",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 275,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 137,
      "name": "prependOnceListener",
      "anchor": "prepend-once-listener",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 292,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 138,
          "name": "prependOnceListener",
          "description": "Adds a **one-time** `listener` function for the event named `eventName` to the\n_beginning_ of the listeners array. The next time `eventName` is triggered, this\nlistener is removed, and then invoked.\n\n```js\nserver.prependOnceListener('connection', (stream) => {\n  console.log('Ah, we have our first user!');\n});\n```\n\nReturns a reference to the `EventEmitter`, so that calls can be chained.",
          "typeParameters": [
            {
              "name": "E",
              "type": "string | symbol",
              "default": null
            }
          ],
          "parameters": [
            {
              "name": "eventName",
              "type": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
              "optional": false,
              "defaultValue": null,
              "description": "The name of the event."
            },
            {
              "name": "listener",
              "type": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
              "optional": false,
              "defaultValue": null,
              "description": "The callback function"
            }
          ],
          "returns": "this",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 292,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 145,
      "name": "rawListeners",
      "anchor": "raw-listeners",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 326,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 146,
          "name": "rawListeners",
          "description": "Returns a copy of the array of listeners for the event named `eventName`,\nincluding any wrappers (such as those created by `.once()`).\n\n```js\nimport { EventEmitter } from 'node:events';\nconst emitter = new EventEmitter();\nemitter.once('log', () => console.log('log once'));\n\n// Returns a new Array with a function `onceWrapper` which has a property\n// `listener` which contains the original listener bound above\nconst listeners = emitter.rawListeners('log');\nconst logFnWrapper = listeners[0];\n\n// Logs \"log once\" to the console and does not unbind the `once` event\nlogFnWrapper.listener();\n\n// Logs \"log once\" to the console and removes the listener\nlogFnWrapper();\n\nemitter.on('log', () => console.log('log persistently'));\n// Will return a new Array with a single function bound by `.on()` above\nconst newListeners = emitter.rawListeners('log');\n\n// Logs \"log persistently\" twice\nnewListeners[0]();\nemitter.emit('log');\n```",
          "typeParameters": [
            {
              "name": "E",
              "type": "string | symbol",
              "default": null
            }
          ],
          "parameters": [
            {
              "name": "eventName",
              "type": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "((args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void)[]",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 326,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 152,
      "name": "removeAllListeners",
      "anchor": "remove-all-listeners",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 338,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 153,
          "name": "removeAllListeners",
          "description": "Removes all listeners, or those of the specified `eventName`.\n\nIt is bad practice to remove listeners added elsewhere in the code,\nparticularly when the `EventEmitter` instance was created by some other\ncomponent or module (e.g. sockets or file streams).\n\nReturns a reference to the `EventEmitter`, so that calls can be chained.",
          "typeParameters": [
            {
              "name": "E",
              "type": "string | symbol",
              "default": null
            }
          ],
          "parameters": [
            {
              "name": "eventName",
              "type": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
              "optional": true,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "this",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 338,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 156,
      "name": "removeListener",
      "anchor": "remove-listener",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 425,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 157,
          "name": "removeListener",
          "description": "Removes the specified `listener` from the listener array for the event named\n`eventName`.\n\n```js\nconst callback = (stream) => {\n  console.log('someone connected!');\n};\nserver.on('connection', callback);\n// ...\nserver.removeListener('connection', callback);\n```\n\n`removeListener()` will remove, at most, one instance of a listener from the\nlistener array. If any single listener has been added multiple times to the\nlistener array for the specified `eventName`, then `removeListener()` must be\ncalled multiple times to remove each instance.\n\nOnce an event is emitted, all listeners attached to it at the\ntime of emitting are called in order. This implies that any\n`removeListener()` or `removeAllListeners()` calls _after_ emitting and\n_before_ the last listener finishes execution will not remove them from\n`emit()` in progress. Subsequent events behave as expected.\n\n```js\nimport { EventEmitter } from 'node:events';\nclass MyEmitter extends EventEmitter {}\nconst myEmitter = new MyEmitter();\n\nconst callbackA = () => {\n  console.log('A');\n  myEmitter.removeListener('event', callbackB);\n};\n\nconst callbackB = () => {\n  console.log('B');\n};\n\nmyEmitter.on('event', callbackA);\n\nmyEmitter.on('event', callbackB);\n\n// callbackA removes listener callbackB but it will still be called.\n// Internal listener array at time of emit [callbackA, callbackB]\nmyEmitter.emit('event');\n// Prints:\n//   A\n//   B\n\n// callbackB is now removed.\n// Internal listener array [callbackA]\nmyEmitter.emit('event');\n// Prints:\n//   A\n```\n\nBecause listeners are managed using an internal array, calling this will\nchange the position indexes of any listener registered _after_ the listener\nbeing removed. This will not impact the order in which listeners are called,\nbut it means that any copies of the listener array as returned by\nthe `emitter.listeners()` method will need to be recreated.\n\nWhen a single function has been added as a handler multiple times for a single\nevent (as in the example below), `removeListener()` will remove the most\nrecently added instance. In the example the `once('ping')`\nlistener is removed:\n\n```js\nimport { EventEmitter } from 'node:events';\nconst ee = new EventEmitter();\n\nfunction pong() {\n  console.log('pong');\n}\n\nee.on('ping', pong);\nee.once('ping', pong);\nee.removeListener('ping', pong);\n\nee.emit('ping');\nee.emit('ping');\n```\n\nReturns a reference to the `EventEmitter`, so that calls can be chained.",
          "typeParameters": [
            {
              "name": "E",
              "type": "string | symbol",
              "default": null
            }
          ],
          "parameters": [
            {
              "name": "eventName",
              "type": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "listener",
              "type": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "this",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 425,
            "character": 16,
            "url": null
          }
        }
      ]
    },
    {
      "id": 164,
      "name": "setMaxListeners",
      "anchor": "set-max-listeners",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
        "line": 436,
        "character": 16,
        "url": null
      },
      "signatures": [
        {
          "id": 165,
          "name": "setMaxListeners",
          "description": "By default `EventEmitter`s will print a warning if more than `10` listeners are\nadded for a particular event. This is a useful default that helps finding\nmemory leaks. The `emitter.setMaxListeners()` method allows the limit to be\nmodified for this specific `EventEmitter` instance. The value can be set to\n`Infinity` (or `0`) to indicate an unlimited number of listeners.\n\nReturns a reference to the `EventEmitter`, so that calls can be chained.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "n",
              "type": "number",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "this",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
            "line": 436,
            "character": 16,
            "url": null
          }
        }
      ]
    }
  ]
} as const;

const navigation = [
  {
    "id": 1,
    "name": "CustomId",
    "route": "classes/CustomId",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 285,
    "name": "FindCursor",
    "route": "classes/FindCursor",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 32,
    "name": "SinterClient",
    "route": "classes/SinterClient",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 338,
    "name": "SinterClientOptionsError",
    "route": "classes/SinterClientOptionsError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 357,
    "name": "SinterClientStateError",
    "route": "classes/SinterClientStateError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 199,
    "name": "SinterCollection",
    "route": "classes/SinterCollection",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 377,
    "name": "SinterCompatibilityError",
    "route": "classes/SinterCompatibilityError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 400,
    "name": "SinterConnectionError",
    "route": "classes/SinterConnectionError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 419,
    "name": "SinterConnectionStringError",
    "route": "classes/SinterConnectionStringError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 438,
    "name": "SinterConnectionTimeoutError",
    "route": "classes/SinterConnectionTimeoutError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 325,
    "name": "SinterDatabase",
    "route": "classes/SinterDatabase",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 457,
    "name": "SinterDocumentError",
    "route": "classes/SinterDocumentError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 476,
    "name": "SinterError",
    "route": "classes/SinterError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 511,
    "name": "SinterInsertManyError",
    "route": "classes/SinterInsertManyError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 700,
    "name": "SinterNamespaceError",
    "route": "classes/SinterNamespaceError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 537,
    "name": "SinterProtocolError",
    "route": "classes/SinterProtocolError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 556,
    "name": "SinterRequestTimeoutError",
    "route": "classes/SinterRequestTimeoutError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 575,
    "name": "SinterServerError",
    "route": "classes/SinterServerError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 598,
    "name": "SinterSocketTimeoutError",
    "route": "classes/SinterSocketTimeoutError",
    "kind": "Class",
    "kindId": 128
  },
  {
    "id": 660,
    "name": "CreateIndexResult",
    "route": "interfaces/CreateIndexResult",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 723,
    "name": "DeleteResult",
    "route": "interfaces/DeleteResult",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 26,
    "name": "Document",
    "route": "interfaces/Document",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 664,
    "name": "ExplainResult",
    "route": "interfaces/ExplainResult",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 259,
    "name": "FindOptions",
    "route": "interfaces/FindOptions",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 321,
    "name": "FindQueryOptions",
    "route": "interfaces/FindQueryOptions",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 675,
    "name": "IndexBoundInfo",
    "route": "interfaces/IndexBoundInfo",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 678,
    "name": "IndexDefinition",
    "route": "interfaces/IndexDefinition",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 685,
    "name": "IndexInfo",
    "route": "interfaces/IndexInfo",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 691,
    "name": "IndexIssue",
    "route": "interfaces/IndexIssue",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 695,
    "name": "IndexValidationResult",
    "route": "interfaces/IndexValidationResult",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 265,
    "name": "InsertManyResult",
    "route": "interfaces/InsertManyResult",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 269,
    "name": "InsertOneResult",
    "route": "interfaces/InsertOneResult",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 281,
    "name": "ParsedSinterConnectionString",
    "route": "interfaces/ParsedSinterConnectionString",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 180,
    "name": "SinterClientEvents",
    "route": "interfaces/SinterClientEvents",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 185,
    "name": "SinterClientOptions",
    "route": "interfaces/SinterClientOptions",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 189,
    "name": "SinterPingResult",
    "route": "interfaces/SinterPingResult",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 617,
    "name": "SinterServerErrorOptions",
    "route": "interfaces/SinterServerErrorOptions",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 194,
    "name": "SinterServerInfo",
    "route": "interfaces/SinterServerInfo",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 742,
    "name": "UpdateOptions",
    "route": "interfaces/UpdateOptions",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 746,
    "name": "UpdateResult",
    "route": "interfaces/UpdateResult",
    "kind": "Interface",
    "kindId": 256
  },
  {
    "id": 719,
    "name": "ArrayPaths",
    "route": "types/ArrayPaths",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 623,
    "name": "AtomicValue",
    "route": "types/AtomicValue",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 721,
    "name": "ComparablePaths",
    "route": "types/ComparablePaths",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 624,
    "name": "ComparableValue",
    "route": "types/ComparableValue",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 625,
    "name": "ComparisonOperators",
    "route": "types/ComparisonOperators",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 316,
    "name": "CursorExecutor",
    "route": "types/CursorExecutor",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 632,
    "name": "ElementOf",
    "route": "types/ElementOf",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 257,
    "name": "EqualityFilter",
    "route": "types/EqualityFilter",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 634,
    "name": "Filter",
    "route": "types/Filter",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 641,
    "name": "FilterOperators",
    "route": "types/FilterOperators",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 650,
    "name": "FilterPaths",
    "route": "types/FilterPaths",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 653,
    "name": "FilterPathValue",
    "route": "types/FilterPathValue",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 673,
    "name": "IndexablePath",
    "route": "types/IndexablePath",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 656,
    "name": "MaxPathDepth",
    "route": "types/MaxPathDepth",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 726,
    "name": "NumericPaths",
    "route": "types/NumericPaths",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 272,
    "name": "OptionalId",
    "route": "types/OptionalId",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 728,
    "name": "PathsMatching",
    "route": "types/PathsMatching",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 179,
    "name": "SinterClientState",
    "route": "types/SinterClientState",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 510,
    "name": "SinterErrorCode",
    "route": "types/SinterErrorCode",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 657,
    "name": "Sort",
    "route": "types/Sort",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 659,
    "name": "SortDirection",
    "route": "types/SortDirection",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 731,
    "name": "UpdateFilter",
    "route": "types/UpdateFilter",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 744,
    "name": "UpdatePaths",
    "route": "types/UpdatePaths",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 276,
    "name": "WithId",
    "route": "types/WithId",
    "kind": "TypeAlias",
    "kindId": 2097152
  },
  {
    "id": 29,
    "name": "DEFAULT_CONNECT_TIMEOUT_MS",
    "route": "variables/DEFAULT_CONNECT_TIMEOUT_MS",
    "kind": "Variable",
    "kindId": 32
  },
  {
    "id": 30,
    "name": "DEFAULT_REQUEST_TIMEOUT_MS",
    "route": "variables/DEFAULT_REQUEST_TIMEOUT_MS",
    "kind": "Variable",
    "kindId": 32
  },
  {
    "id": 280,
    "name": "DEFAULT_SINTERDB_PORT",
    "route": "variables/DEFAULT_SINTERDB_PORT",
    "kind": "Variable",
    "kindId": 32
  },
  {
    "id": 31,
    "name": "DEFAULT_SOCKET_TIMEOUT_MS",
    "route": "variables/DEFAULT_SOCKET_TIMEOUT_MS",
    "kind": "Variable",
    "kindId": 32
  },
  {
    "id": 172,
    "name": "SinterClientState",
    "route": "variables/SinterClientState",
    "kind": "Variable",
    "kindId": 32
  },
  {
    "id": 496,
    "name": "SinterErrorCode",
    "route": "variables/SinterErrorCode",
    "kind": "Variable",
    "kindId": 32
  }
] as const;

export default function Page() {
  return (
    <ApiReferencePage
      projectName="SinterDB driver API"
      api={api}
      navigation={navigation}
    />
  );
}
