import { ApiReflectionPage } from "../../_components/api-shell";

const api = {
  "id": 32,
  "name": "SinterClient",
  "slug": "SinterClient",
  "route": "classes/SinterClient",
  "kind": "Class",
  "kindId": 128,
  "flags": {
    "static": false,
    "readonly": false,
    "optional": false,
    "abstract": false,
    "protected": false,
    "private": false,
    "external": false,
    "const": false
  },
  "comment": {
    "summary": [
      {
        "kind": "text",
        "text": "A connection to a SinterDB server.\n\nCreate a client from a ",
        "target": null
      },
      {
        "kind": "code",
        "text": "`sinterdb://`",
        "target": null
      },
      {
        "kind": "text",
        "text": " connection string, call ",
        "target": null
      },
      {
        "kind": "code",
        "text": "`connect()`",
        "target": null
      },
      {
        "kind": "text",
        "text": ",\nand then use ",
        "target": null
      },
      {
        "kind": "code",
        "text": "`db()`",
        "target": null
      },
      {
        "kind": "text",
        "text": " to reach databases and collections. Commands sent\nbefore ",
        "target": null
      },
      {
        "kind": "code",
        "text": "`connect()`",
        "target": null
      },
      {
        "kind": "text",
        "text": " completes throw a ",
        "target": null
      },
      {
        "kind": "inline-tag",
        "text": "SinterClientStateError",
        "target": null
      },
      {
        "kind": "text",
        "text": ". Call\n",
        "target": null
      },
      {
        "kind": "code",
        "text": "`close()`",
        "target": null
      },
      {
        "kind": "text",
        "text": " when finished.",
        "target": null
      }
    ],
    "blockTags": []
  },
  "type": null,
  "hierarchy": {
    "extends": [
      "EventEmitter<SinterClientEvents>"
    ],
    "extendedBy": []
  },
  "sources": [
    {
      "fileName": "packages/driver/dist/client.d.ts",
      "line": 115,
      "character": 21,
      "url": null
    }
  ],
  "relationships": {
    "inheritedFrom": null,
    "overwrites": null,
    "implementationOf": null
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
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 133,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": "EventEmitter<SinterClientEvents>.constructor",
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 34,
          "name": "SinterClient",
          "comment": null,
          "typeParameters": [],
          "parameters": [
            {
              "id": 35,
              "name": "connectionString",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": false,
                "const": false
              },
              "type": {
                "kind": "intrinsic",
                "text": "string",
                "name": "string",
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            },
            {
              "id": 36,
              "name": "options",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": true,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": false,
                "const": false
              },
              "type": {
                "kind": "reference",
                "text": "SinterClientOptions",
                "name": "SinterClientOptions",
                "target": {
                  "id": 185,
                  "name": "SinterClientOptions",
                  "route": "interfaces/SinterClientOptions"
                },
                "children": []
              },
              "defaultValue": null,
              "comment": null
            }
          ],
          "returnType": {
            "kind": "reference",
            "text": "SinterClient",
            "name": "SinterClient",
            "target": {
              "id": 32,
              "name": "SinterClient",
              "route": "classes/SinterClient"
            },
            "children": []
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/client.d.ts",
              "line": 133,
              "character": 4,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": null,
            "overwrites": "EventEmitter<SinterClientEvents>.constructor",
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 38,
      "name": "connectTimeoutMS",
      "anchor": "connect-timeout-ms",
      "kind": "Property",
      "kindId": 1024,
      "flags": {
        "static": false,
        "readonly": true,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": {
        "summary": [
          {
            "kind": "text",
            "text": "The effective connect timeout in milliseconds.",
            "target": null
          }
        ],
        "blockTags": []
      },
      "type": {
        "kind": "intrinsic",
        "text": "number",
        "name": "number",
        "target": null,
        "children": []
      },
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 121,
          "character": 13,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [],
      "typeDeclaration": []
    },
    {
      "id": 39,
      "name": "requestTimeoutMS",
      "anchor": "request-timeout-ms",
      "kind": "Property",
      "kindId": 1024,
      "flags": {
        "static": false,
        "readonly": true,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": {
        "summary": [
          {
            "kind": "text",
            "text": "The effective request timeout in milliseconds.",
            "target": null
          }
        ],
        "blockTags": []
      },
      "type": {
        "kind": "intrinsic",
        "text": "number",
        "name": "number",
        "target": null,
        "children": []
      },
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 123,
          "character": 13,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [],
      "typeDeclaration": []
    },
    {
      "id": 40,
      "name": "socketTimeoutMS",
      "anchor": "socket-timeout-ms",
      "kind": "Property",
      "kindId": 1024,
      "flags": {
        "static": false,
        "readonly": true,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": {
        "summary": [
          {
            "kind": "text",
            "text": "The effective idle socket timeout in milliseconds, or 0 when disabled.",
            "target": null
          }
        ],
        "blockTags": []
      },
      "type": {
        "kind": "intrinsic",
        "text": "number",
        "name": "number",
        "target": null,
        "children": []
      },
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 127,
          "character": 13,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [],
      "typeDeclaration": []
    },
    {
      "id": 37,
      "name": "target",
      "anchor": "target",
      "kind": "Property",
      "kindId": 1024,
      "flags": {
        "static": false,
        "readonly": true,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": {
        "summary": [
          {
            "kind": "text",
            "text": "The host, port and optional database parsed from the connection string.",
            "target": null
          }
        ],
        "blockTags": []
      },
      "type": {
        "kind": "reference",
        "text": "ParsedSinterConnectionString",
        "name": "ParsedSinterConnectionString",
        "target": {
          "id": 281,
          "name": "ParsedSinterConnectionString",
          "route": "interfaces/ParsedSinterConnectionString"
        },
        "children": []
      },
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 119,
          "character": 13,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [],
      "typeDeclaration": []
    },
    {
      "id": 48,
      "name": "connected",
      "anchor": "connected",
      "kind": "Accessor",
      "kindId": 262144,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 137,
          "character": 8,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [],
      "typeDeclaration": []
    },
    {
      "id": 50,
      "name": "serverInfo",
      "anchor": "server-info",
      "kind": "Accessor",
      "kindId": 262144,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 142,
          "character": 8,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [],
      "typeDeclaration": []
    },
    {
      "id": 46,
      "name": "state",
      "anchor": "state",
      "kind": "Accessor",
      "kindId": 262144,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 135,
          "character": 8,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [],
      "typeDeclaration": []
    },
    {
      "id": 167,
      "name": "[captureRejectionSymbol]",
      "anchor": "-capture-rejection-symbol-",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": true,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 87,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.[captureRejectionSymbol]",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 168,
          "name": "[captureRejectionSymbol]",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "The ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`Symbol.for('nodejs.rejection')`",
                "target": null
              },
              {
                "kind": "text",
                "text": " method is called in case a\npromise rejection happens when emitting an event and\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "`captureRejections`",
                "target": null
              },
              {
                "kind": "text",
                "text": " is enabled on the emitter.\nIt is possible to use ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`events.captureRejectionSymbol`",
                "target": null
              },
              {
                "kind": "text",
                "text": " in\nplace of ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`Symbol.for('nodejs.rejection')`",
                "target": null
              },
              {
                "kind": "text",
                "text": ".\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nimport { EventEmitter, captureRejectionSymbol } from 'node:events';\n\nclass MyClass extends EventEmitter {\n  constructor() {\n    super({ captureRejections: true });\n  }\n\n  [captureRejectionSymbol](err, event, ...args) {\n    console.log('rejection happened for', event, 'with', err, ...args);\n    this.destroy(err);\n  }\n\n  destroy(err) {\n    // Tear the resource down here.\n  }\n}\n```",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v13.4.0, v12.16.0",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [],
          "parameters": [
            {
              "id": 169,
              "name": "error",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "reference",
                "text": "Error",
                "name": "Error",
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            },
            {
              "id": 170,
              "name": "event",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "string | symbol",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            },
            {
              "id": 171,
              "name": "args",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "array",
                "text": "any[]",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            }
          ],
          "returnType": {
            "kind": "intrinsic",
            "text": "void",
            "name": "void",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 87,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.[captureRejectionSymbol]",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 73,
      "name": "addListener",
      "anchor": "add-listener",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 92,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.addListener",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 74,
          "name": "addListener",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Alias for ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`emitter.on(eventName, listener)`",
                "target": null
              },
              {
                "kind": "text",
                "text": ".",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v0.1.26",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [
            {
              "id": 75,
              "name": "E",
              "type": {
                "kind": "union",
                "text": "string | symbol",
                "name": null,
                "target": null,
                "children": []
              },
              "default": null,
              "comment": null
            }
          ],
          "parameters": [
            {
              "id": 76,
              "name": "eventName",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "\"connecting\" | \"connected\" | \"closed\" | E | (keyof EventEmitterEventMap) | \"error\"",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            },
            {
              "id": 77,
              "name": "listener",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "reflection",
                "text": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            }
          ],
          "returnType": {
            "kind": "intrinsic",
            "text": "this",
            "name": "this",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 92,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.addListener",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 66,
      "name": "close",
      "anchor": "close",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 188,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 67,
          "name": "close",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Closes the connection. Requests still waiting for a response fail.\nClosing a closed client does nothing.",
                "target": null
              }
            ],
            "blockTags": []
          },
          "typeParameters": [],
          "parameters": [],
          "returnType": {
            "kind": "reference",
            "text": "Promise<void>",
            "name": "Promise",
            "target": null,
            "children": [
              {
                "kind": "intrinsic",
                "text": "void",
                "name": "void",
                "target": null,
                "children": []
              }
            ]
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/client.d.ts",
              "line": 188,
              "character": 4,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": null,
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 52,
      "name": "connect",
      "anchor": "connect",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 153,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 53,
          "name": "connect",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Opens the connection and performs the protocol handshake.\n\nCalling ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`connect()`",
                "target": null
              },
              {
                "kind": "text",
                "text": " on a connected client resolves immediately, and\nconcurrent calls share one attempt. If the attempt fails, the client\nreturns to ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`new`",
                "target": null
              },
              {
                "kind": "text",
                "text": " and ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`connect()`",
                "target": null
              },
              {
                "kind": "text",
                "text": " may be tried again. A closed client\nrejects with a ",
                "target": null
              },
              {
                "kind": "inline-tag",
                "text": "SinterClientStateError",
                "target": null
              },
              {
                "kind": "text",
                "text": ".",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@returns",
                "content": [
                  {
                    "kind": "text",
                    "text": "This client, so calls can be chained.",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [],
          "parameters": [],
          "returnType": {
            "kind": "reference",
            "text": "Promise<SinterClient>",
            "name": "Promise",
            "target": null,
            "children": [
              {
                "kind": "reference",
                "text": "SinterClient",
                "name": "SinterClient",
                "target": {
                  "id": 32,
                  "name": "SinterClient",
                  "route": "classes/SinterClient"
                },
                "children": []
              }
            ]
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/client.d.ts",
              "line": 153,
              "character": 4,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": null,
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 63,
      "name": "db",
      "anchor": "db",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 183,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 64,
          "name": "db",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Returns a handle to a database.\n\nThe handle is created locally; no request is sent, and the database is\ncreated on the server by the first write. Without ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`name`",
                "target": null
              },
              {
                "kind": "text",
                "text": ", the database\nfrom the connection string is used.",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@throws",
                "content": [
                  {
                    "kind": "inline-tag",
                    "text": "SinterNamespaceError",
                    "target": null
                  },
                  {
                    "kind": "text",
                    "text": " when neither is available, or when\n  the name is invalid.",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [],
          "parameters": [
            {
              "id": 65,
              "name": "name",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": true,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": false,
                "const": false
              },
              "type": {
                "kind": "intrinsic",
                "text": "string",
                "name": "string",
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The database name. Optional when the connection string\n  names one.",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            }
          ],
          "returnType": {
            "kind": "reference",
            "text": "SinterDatabase",
            "name": "SinterDatabase",
            "target": {
              "id": 325,
              "name": "SinterDatabase",
              "route": "classes/SinterDatabase"
            },
            "children": []
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/client.d.ts",
              "line": 183,
              "character": 4,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": null,
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 81,
      "name": "emit",
      "anchor": "emit",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 134,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.emit",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 82,
          "name": "emit",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Synchronously calls each of the listeners registered for the event named\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": ", in the order they were registered, passing the supplied arguments\nto each.\n\nReturns ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`true`",
                "target": null
              },
              {
                "kind": "text",
                "text": " if the event had listeners, ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`false`",
                "target": null
              },
              {
                "kind": "text",
                "text": " otherwise.\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nimport { EventEmitter } from 'node:events';\nconst myEmitter = new EventEmitter();\n\n// First listener\nmyEmitter.on('event', function firstListener() {\n  console.log('Helloooo! first listener');\n});\n// Second listener\nmyEmitter.on('event', function secondListener(arg1, arg2) {\n  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);\n});\n// Third listener\nmyEmitter.on('event', function thirdListener(...args) {\n  const parameters = args.join(', ');\n  console.log(`event with parameters ${parameters} in third listener`);\n});\n\nconsole.log(myEmitter.listeners('event'));\n\nmyEmitter.emit('event', 1, 2, 3, 4, 5);\n\n// Prints:\n// [\n//   [Function: firstListener],\n//   [Function: secondListener],\n//   [Function: thirdListener]\n// ]\n// Helloooo! first listener\n// event with parameters 1, 2 in second listener\n// event with parameters 1, 2, 3, 4, 5 in third listener\n```",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v0.1.26",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [
            {
              "id": 83,
              "name": "E",
              "type": {
                "kind": "union",
                "text": "string | symbol",
                "name": null,
                "target": null,
                "children": []
              },
              "default": null,
              "comment": null
            }
          ],
          "parameters": [
            {
              "id": 84,
              "name": "eventName",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            },
            {
              "id": 85,
              "name": "args",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "conditional",
                "text": "E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            }
          ],
          "returnType": {
            "kind": "intrinsic",
            "text": "boolean",
            "name": "boolean",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 134,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.emit",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 86,
      "name": "eventNames",
      "anchor": "event-names",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 154,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.eventNames",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 87,
          "name": "eventNames",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Returns an array listing the events for which the emitter has registered\nlisteners.\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nimport { EventEmitter } from 'node:events';\n\nconst myEE = new EventEmitter();\nmyEE.on('foo', () => {});\nmyEE.on('bar', () => {});\n\nconst sym = Symbol('symbol');\nmyEE.on(sym, () => {});\n\nconsole.log(myEE.eventNames());\n// Prints: [ 'foo', 'bar', Symbol(symbol) ]\n```",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v6.0.0",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [],
          "parameters": [],
          "returnType": {
            "kind": "array",
            "text": "(string | symbol)[]",
            "name": null,
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 154,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.eventNames",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 56,
      "name": "executeCommand",
      "anchor": "execute-command",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 168,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 57,
          "name": "executeCommand",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Sends a command by name and returns the raw result.\n\nThis is the low-level entry point behind the collection and database\nmethods. Prefer those; the command names and parameters are part of the\nwire protocol, not of the typed API.",
                "target": null
              }
            ],
            "blockTags": []
          },
          "typeParameters": [],
          "parameters": [
            {
              "id": 58,
              "name": "database",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": false,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "string | undefined",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The database to run the command in, or ",
                    "target": null
                  },
                  {
                    "kind": "code",
                    "text": "`undefined`",
                    "target": null
                  },
                  {
                    "kind": "text",
                    "text": " for\n  server-wide commands.",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            },
            {
              "id": 59,
              "name": "command",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": false,
                "const": false
              },
              "type": {
                "kind": "intrinsic",
                "text": "string",
                "name": "string",
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The command name.",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            },
            {
              "id": 60,
              "name": "parameters",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": false,
                "const": false
              },
              "type": {
                "kind": "reference",
                "text": "Document",
                "name": "Document",
                "target": {
                  "id": 26,
                  "name": "Document",
                  "route": "interfaces/Document"
                },
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The command parameters.",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            }
          ],
          "returnType": {
            "kind": "reference",
            "text": "Promise<DocumentValue>",
            "name": "Promise",
            "target": null,
            "children": [
              {
                "kind": "reference",
                "text": "DocumentValue",
                "name": "DocumentValue",
                "target": null,
                "children": []
              }
            ]
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/client.d.ts",
              "line": 168,
              "character": 4,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": null,
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 88,
      "name": "getMaxListeners",
      "anchor": "get-max-listeners",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 161,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.getMaxListeners",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 89,
          "name": "getMaxListeners",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Returns the current max listener value for the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`EventEmitter`",
                "target": null
              },
              {
                "kind": "text",
                "text": " which is either\nset by ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`emitter.setMaxListeners(n)`",
                "target": null
              },
              {
                "kind": "text",
                "text": " or defaults to\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "`events.defaultMaxListeners`",
                "target": null
              },
              {
                "kind": "text",
                "text": ".",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v1.0.0",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [],
          "parameters": [],
          "returnType": {
            "kind": "intrinsic",
            "text": "number",
            "name": "number",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 161,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.getMaxListeners",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 61,
      "name": "listDatabases",
      "anchor": "list-databases",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 170,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 62,
          "name": "listDatabases",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Lists the names of the databases on the server.",
                "target": null
              }
            ],
            "blockTags": []
          },
          "typeParameters": [],
          "parameters": [],
          "returnType": {
            "kind": "reference",
            "text": "Promise<string[]>",
            "name": "Promise",
            "target": null,
            "children": [
              {
                "kind": "array",
                "text": "string[]",
                "name": null,
                "target": null,
                "children": []
              }
            ]
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/client.d.ts",
              "line": 170,
              "character": 4,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": null,
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 90,
      "name": "listenerCount",
      "anchor": "listener-count",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 170,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.listenerCount",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 91,
          "name": "listenerCount",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Returns the number of listeners listening for the event named ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": ".\nIf ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`listener`",
                "target": null
              },
              {
                "kind": "text",
                "text": " is provided, it will return how many times the listener is found\nin the list of the listeners of the event.",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v3.2.0",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [
            {
              "id": 92,
              "name": "E",
              "type": {
                "kind": "union",
                "text": "string | symbol",
                "name": null,
                "target": null,
                "children": []
              },
              "default": null,
              "comment": null
            }
          ],
          "parameters": [
            {
              "id": 93,
              "name": "eventName",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The name of the event being listened for",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            },
            {
              "id": 94,
              "name": "listener",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": true,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "reflection",
                "text": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The event handler function",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            }
          ],
          "returnType": {
            "kind": "intrinsic",
            "text": "number",
            "name": "number",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 170,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.listenerCount",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 98,
      "name": "listeners",
      "anchor": "listeners",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 186,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.listeners",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 99,
          "name": "listeners",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Returns a copy of the array of listeners for the event named ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": ".\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nserver.on('connection', (stream) => {\n  console.log('someone connected!');\n});\nconsole.log(util.inspect(server.listeners('connection')));\n// Prints: [ [Function] ]\n```",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v0.1.26",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [
            {
              "id": 100,
              "name": "E",
              "type": {
                "kind": "union",
                "text": "string | symbol",
                "name": null,
                "target": null,
                "children": []
              },
              "default": null,
              "comment": null
            }
          ],
          "parameters": [
            {
              "id": 101,
              "name": "eventName",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            }
          ],
          "returnType": {
            "kind": "array",
            "text": "((args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void)[]",
            "name": null,
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 186,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.listeners",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 105,
      "name": "off",
      "anchor": "off",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 191,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.off",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 106,
          "name": "off",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Alias for ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`emitter.removeListener()`",
                "target": null
              },
              {
                "kind": "text",
                "text": ".",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v10.0.0",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [
            {
              "id": 107,
              "name": "E",
              "type": {
                "kind": "union",
                "text": "string | symbol",
                "name": null,
                "target": null,
                "children": []
              },
              "default": null,
              "comment": null
            }
          ],
          "parameters": [
            {
              "id": 108,
              "name": "eventName",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            },
            {
              "id": 109,
              "name": "listener",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "reflection",
                "text": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            }
          ],
          "returnType": {
            "kind": "intrinsic",
            "text": "this",
            "name": "this",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 191,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.off",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 113,
      "name": "on",
      "anchor": "on",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 225,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.on",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 114,
          "name": "on",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Adds the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`listener`",
                "target": null
              },
              {
                "kind": "text",
                "text": " function to the end of the listeners array for the\nevent named ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": ". No checks are made to see if the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`listener`",
                "target": null
              },
              {
                "kind": "text",
                "text": " has\nalready been added. Multiple calls passing the same combination of ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": "\nand ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`listener`",
                "target": null
              },
              {
                "kind": "text",
                "text": " will result in the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`listener`",
                "target": null
              },
              {
                "kind": "text",
                "text": " being added, and called, multiple\ntimes.\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nserver.on('connection', (stream) => {\n  console.log('someone connected!');\n});\n```",
                "target": null
              },
              {
                "kind": "text",
                "text": "\n\nReturns a reference to the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`EventEmitter`",
                "target": null
              },
              {
                "kind": "text",
                "text": ", so that calls can be chained.\n\nBy default, event listeners are invoked in the order they are added. The\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "`emitter.prependListener()`",
                "target": null
              },
              {
                "kind": "text",
                "text": " method can be used as an alternative to add the\nevent listener to the beginning of the listeners array.\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nimport { EventEmitter } from 'node:events';\nconst myEE = new EventEmitter();\nmyEE.on('foo', () => console.log('a'));\nmyEE.prependListener('foo', () => console.log('b'));\nmyEE.emit('foo');\n// Prints:\n//   b\n//   a\n```",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v0.1.101",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [
            {
              "id": 115,
              "name": "E",
              "type": {
                "kind": "union",
                "text": "string | symbol",
                "name": null,
                "target": null,
                "children": []
              },
              "default": null,
              "comment": null
            }
          ],
          "parameters": [
            {
              "id": 116,
              "name": "eventName",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The name of the event.",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            },
            {
              "id": 117,
              "name": "listener",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "reflection",
                "text": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The callback function",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            }
          ],
          "returnType": {
            "kind": "intrinsic",
            "text": "this",
            "name": "this",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 225,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.on",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 121,
      "name": "once",
      "anchor": "once",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 256,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.once",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 122,
          "name": "once",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Adds a **one-time** ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`listener`",
                "target": null
              },
              {
                "kind": "text",
                "text": " function for the event named ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": ". The\nnext time ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": " is triggered, this listener is removed and then invoked.\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nserver.once('connection', (stream) => {\n  console.log('Ah, we have our first user!');\n});\n```",
                "target": null
              },
              {
                "kind": "text",
                "text": "\n\nReturns a reference to the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`EventEmitter`",
                "target": null
              },
              {
                "kind": "text",
                "text": ", so that calls can be chained.\n\nBy default, event listeners are invoked in the order they are added. The\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "`emitter.prependOnceListener()`",
                "target": null
              },
              {
                "kind": "text",
                "text": " method can be used as an alternative to add the\nevent listener to the beginning of the listeners array.\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nimport { EventEmitter } from 'node:events';\nconst myEE = new EventEmitter();\nmyEE.once('foo', () => console.log('a'));\nmyEE.prependOnceListener('foo', () => console.log('b'));\nmyEE.emit('foo');\n// Prints:\n//   b\n//   a\n```",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v0.3.0",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [
            {
              "id": 123,
              "name": "E",
              "type": {
                "kind": "union",
                "text": "string | symbol",
                "name": null,
                "target": null,
                "children": []
              },
              "default": null,
              "comment": null
            }
          ],
          "parameters": [
            {
              "id": 124,
              "name": "eventName",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The name of the event.",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            },
            {
              "id": 125,
              "name": "listener",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "reflection",
                "text": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The callback function",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            }
          ],
          "returnType": {
            "kind": "intrinsic",
            "text": "this",
            "name": "this",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 256,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.once",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 54,
      "name": "ping",
      "anchor": "ping",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/client.d.ts",
          "line": 155,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 55,
          "name": "ping",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Sends a ping to the server and measures the round trip.",
                "target": null
              }
            ],
            "blockTags": []
          },
          "typeParameters": [],
          "parameters": [],
          "returnType": {
            "kind": "reference",
            "text": "Promise<SinterPingResult>",
            "name": "Promise",
            "target": null,
            "children": [
              {
                "kind": "reference",
                "text": "SinterPingResult",
                "name": "SinterPingResult",
                "target": {
                  "id": 189,
                  "name": "SinterPingResult",
                  "route": "interfaces/SinterPingResult"
                },
                "children": []
              }
            ]
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/client.d.ts",
              "line": 155,
              "character": 4,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": null,
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 129,
      "name": "prependListener",
      "anchor": "prepend-listener",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 275,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.prependListener",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 130,
          "name": "prependListener",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Adds the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`listener`",
                "target": null
              },
              {
                "kind": "text",
                "text": " function to the _beginning_ of the listeners array for the\nevent named ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": ". No checks are made to see if the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`listener`",
                "target": null
              },
              {
                "kind": "text",
                "text": " has\nalready been added. Multiple calls passing the same combination of ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": "\nand ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`listener`",
                "target": null
              },
              {
                "kind": "text",
                "text": " will result in the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`listener`",
                "target": null
              },
              {
                "kind": "text",
                "text": " being added, and called, multiple\ntimes.\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nserver.prependListener('connection', (stream) => {\n  console.log('someone connected!');\n});\n```",
                "target": null
              },
              {
                "kind": "text",
                "text": "\n\nReturns a reference to the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`EventEmitter`",
                "target": null
              },
              {
                "kind": "text",
                "text": ", so that calls can be chained.",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v6.0.0",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [
            {
              "id": 131,
              "name": "E",
              "type": {
                "kind": "union",
                "text": "string | symbol",
                "name": null,
                "target": null,
                "children": []
              },
              "default": null,
              "comment": null
            }
          ],
          "parameters": [
            {
              "id": 132,
              "name": "eventName",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The name of the event.",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            },
            {
              "id": 133,
              "name": "listener",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "reflection",
                "text": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The callback function",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            }
          ],
          "returnType": {
            "kind": "intrinsic",
            "text": "this",
            "name": "this",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 275,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.prependListener",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 137,
      "name": "prependOnceListener",
      "anchor": "prepend-once-listener",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 292,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.prependOnceListener",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 138,
          "name": "prependOnceListener",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Adds a **one-time** ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`listener`",
                "target": null
              },
              {
                "kind": "text",
                "text": " function for the event named ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": " to the\n_beginning_ of the listeners array. The next time ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": " is triggered, this\nlistener is removed, and then invoked.\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nserver.prependOnceListener('connection', (stream) => {\n  console.log('Ah, we have our first user!');\n});\n```",
                "target": null
              },
              {
                "kind": "text",
                "text": "\n\nReturns a reference to the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`EventEmitter`",
                "target": null
              },
              {
                "kind": "text",
                "text": ", so that calls can be chained.",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v6.0.0",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [
            {
              "id": 139,
              "name": "E",
              "type": {
                "kind": "union",
                "text": "string | symbol",
                "name": null,
                "target": null,
                "children": []
              },
              "default": null,
              "comment": null
            }
          ],
          "parameters": [
            {
              "id": 140,
              "name": "eventName",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The name of the event.",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            },
            {
              "id": 141,
              "name": "listener",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "reflection",
                "text": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": {
                "summary": [
                  {
                    "kind": "text",
                    "text": "The callback function",
                    "target": null
                  }
                ],
                "blockTags": []
              }
            }
          ],
          "returnType": {
            "kind": "intrinsic",
            "text": "this",
            "name": "this",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 292,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.prependOnceListener",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 145,
      "name": "rawListeners",
      "anchor": "raw-listeners",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 326,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.rawListeners",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 146,
          "name": "rawListeners",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Returns a copy of the array of listeners for the event named ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": ",\nincluding any wrappers (such as those created by ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`.once()`",
                "target": null
              },
              {
                "kind": "text",
                "text": ").\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nimport { EventEmitter } from 'node:events';\nconst emitter = new EventEmitter();\nemitter.once('log', () => console.log('log once'));\n\n// Returns a new Array with a function `onceWrapper` which has a property\n// `listener` which contains the original listener bound above\nconst listeners = emitter.rawListeners('log');\nconst logFnWrapper = listeners[0];\n\n// Logs \"log once\" to the console and does not unbind the `once` event\nlogFnWrapper.listener();\n\n// Logs \"log once\" to the console and removes the listener\nlogFnWrapper();\n\nemitter.on('log', () => console.log('log persistently'));\n// Will return a new Array with a single function bound by `.on()` above\nconst newListeners = emitter.rawListeners('log');\n\n// Logs \"log persistently\" twice\nnewListeners[0]();\nemitter.emit('log');\n```",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v9.4.0",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [
            {
              "id": 147,
              "name": "E",
              "type": {
                "kind": "union",
                "text": "string | symbol",
                "name": null,
                "target": null,
                "children": []
              },
              "default": null,
              "comment": null
            }
          ],
          "parameters": [
            {
              "id": 148,
              "name": "eventName",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            }
          ],
          "returnType": {
            "kind": "array",
            "text": "((args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void)[]",
            "name": null,
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 326,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.rawListeners",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 152,
      "name": "removeAllListeners",
      "anchor": "remove-all-listeners",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 338,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.removeAllListeners",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 153,
          "name": "removeAllListeners",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Removes all listeners, or those of the specified ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": ".\n\nIt is bad practice to remove listeners added elsewhere in the code,\nparticularly when the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`EventEmitter`",
                "target": null
              },
              {
                "kind": "text",
                "text": " instance was created by some other\ncomponent or module (e.g. sockets or file streams).\n\nReturns a reference to the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`EventEmitter`",
                "target": null
              },
              {
                "kind": "text",
                "text": ", so that calls can be chained.",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v0.1.26",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [
            {
              "id": 154,
              "name": "E",
              "type": {
                "kind": "union",
                "text": "string | symbol",
                "name": null,
                "target": null,
                "children": []
              },
              "default": null,
              "comment": null
            }
          ],
          "parameters": [
            {
              "id": 155,
              "name": "eventName",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": true,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            }
          ],
          "returnType": {
            "kind": "intrinsic",
            "text": "this",
            "name": "this",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 338,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.removeAllListeners",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 156,
      "name": "removeListener",
      "anchor": "remove-listener",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 425,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.removeListener",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 157,
          "name": "removeListener",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Removes the specified ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`listener`",
                "target": null
              },
              {
                "kind": "text",
                "text": " from the listener array for the event named\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": ".\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nconst callback = (stream) => {\n  console.log('someone connected!');\n};\nserver.on('connection', callback);\n// ...\nserver.removeListener('connection', callback);\n```",
                "target": null
              },
              {
                "kind": "text",
                "text": "\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "`removeListener()`",
                "target": null
              },
              {
                "kind": "text",
                "text": " will remove, at most, one instance of a listener from the\nlistener array. If any single listener has been added multiple times to the\nlistener array for the specified ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`eventName`",
                "target": null
              },
              {
                "kind": "text",
                "text": ", then ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`removeListener()`",
                "target": null
              },
              {
                "kind": "text",
                "text": " must be\ncalled multiple times to remove each instance.\n\nOnce an event is emitted, all listeners attached to it at the\ntime of emitting are called in order. This implies that any\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "`removeListener()`",
                "target": null
              },
              {
                "kind": "text",
                "text": " or ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`removeAllListeners()`",
                "target": null
              },
              {
                "kind": "text",
                "text": " calls _after_ emitting and\n_before_ the last listener finishes execution will not remove them from\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "`emit()`",
                "target": null
              },
              {
                "kind": "text",
                "text": " in progress. Subsequent events behave as expected.\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nimport { EventEmitter } from 'node:events';\nclass MyEmitter extends EventEmitter {}\nconst myEmitter = new MyEmitter();\n\nconst callbackA = () => {\n  console.log('A');\n  myEmitter.removeListener('event', callbackB);\n};\n\nconst callbackB = () => {\n  console.log('B');\n};\n\nmyEmitter.on('event', callbackA);\n\nmyEmitter.on('event', callbackB);\n\n// callbackA removes listener callbackB but it will still be called.\n// Internal listener array at time of emit [callbackA, callbackB]\nmyEmitter.emit('event');\n// Prints:\n//   A\n//   B\n\n// callbackB is now removed.\n// Internal listener array [callbackA]\nmyEmitter.emit('event');\n// Prints:\n//   A\n```",
                "target": null
              },
              {
                "kind": "text",
                "text": "\n\nBecause listeners are managed using an internal array, calling this will\nchange the position indexes of any listener registered _after_ the listener\nbeing removed. This will not impact the order in which listeners are called,\nbut it means that any copies of the listener array as returned by\nthe ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`emitter.listeners()`",
                "target": null
              },
              {
                "kind": "text",
                "text": " method will need to be recreated.\n\nWhen a single function has been added as a handler multiple times for a single\nevent (as in the example below), ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`removeListener()`",
                "target": null
              },
              {
                "kind": "text",
                "text": " will remove the most\nrecently added instance. In the example the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`once('ping')`",
                "target": null
              },
              {
                "kind": "text",
                "text": "\nlistener is removed:\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nimport { EventEmitter } from 'node:events';\nconst ee = new EventEmitter();\n\nfunction pong() {\n  console.log('pong');\n}\n\nee.on('ping', pong);\nee.once('ping', pong);\nee.removeListener('ping', pong);\n\nee.emit('ping');\nee.emit('ping');\n```",
                "target": null
              },
              {
                "kind": "text",
                "text": "\n\nReturns a reference to the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`EventEmitter`",
                "target": null
              },
              {
                "kind": "text",
                "text": ", so that calls can be chained.",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v0.1.26",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [
            {
              "id": 158,
              "name": "E",
              "type": {
                "kind": "union",
                "text": "string | symbol",
                "name": null,
                "target": null,
                "children": []
              },
              "default": null,
              "comment": null
            }
          ],
          "parameters": [
            {
              "id": 159,
              "name": "eventName",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "union",
                "text": "\"connecting\" | \"connected\" | \"closed\" | (keyof EventEmitterEventMap) | \"error\" | E",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            },
            {
              "id": 160,
              "name": "listener",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "reflection",
                "text": "(args: E extends keyof SinterClientEvents ? SinterClientEvents[E] : E extends keyof EventEmitterEventMap ? EventEmitterEventMap[E] : any[]) => void",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            }
          ],
          "returnType": {
            "kind": "intrinsic",
            "text": "this",
            "name": "this",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 425,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.removeListener",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 164,
      "name": "setMaxListeners",
      "anchor": "set-max-listeners",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": false,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": null,
      "type": null,
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
          "line": 436,
          "character": 16,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "EventEmitter.setMaxListeners",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 165,
          "name": "setMaxListeners",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "By default ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`EventEmitter`",
                "target": null
              },
              {
                "kind": "text",
                "text": "s will print a warning if more than ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`10`",
                "target": null
              },
              {
                "kind": "text",
                "text": " listeners are\nadded for a particular event. This is a useful default that helps finding\nmemory leaks. The ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`emitter.setMaxListeners()`",
                "target": null
              },
              {
                "kind": "text",
                "text": " method allows the limit to be\nmodified for this specific ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`EventEmitter`",
                "target": null
              },
              {
                "kind": "text",
                "text": " instance. The value can be set to\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "`Infinity`",
                "target": null
              },
              {
                "kind": "text",
                "text": " (or ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`0`",
                "target": null
              },
              {
                "kind": "text",
                "text": ") to indicate an unlimited number of listeners.\n\nReturns a reference to the ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`EventEmitter`",
                "target": null
              },
              {
                "kind": "text",
                "text": ", so that calls can be chained.",
                "target": null
              }
            ],
            "blockTags": [
              {
                "tag": "@since",
                "content": [
                  {
                    "kind": "text",
                    "text": "v0.3.5",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [],
          "parameters": [
            {
              "id": 166,
              "name": "n",
              "flags": {
                "static": false,
                "readonly": false,
                "optional": false,
                "abstract": false,
                "protected": false,
                "private": false,
                "external": true,
                "const": false
              },
              "type": {
                "kind": "intrinsic",
                "text": "number",
                "name": "number",
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            }
          ],
          "returnType": {
            "kind": "intrinsic",
            "text": "this",
            "name": "this",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/events.d.ts",
              "line": 436,
              "character": 16,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "EventEmitter.setMaxListeners",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    }
  ],
  "typeDeclaration": []
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
    <ApiReflectionPage
      projectName="SinterDB driver API"
      api={api}
      navigation={navigation}
    />
  );
}
