import { ApiReflectionPage } from "../../_components/api-shell";

const api = {
  "id": 598,
  "name": "SinterSocketTimeoutError",
  "slug": "SinterSocketTimeoutError",
  "route": "classes/SinterSocketTimeoutError",
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
        "text": "The connection was idle for longer than ",
        "target": null
      },
      {
        "kind": "code",
        "text": "`socketTimeoutMS`",
        "target": null
      },
      {
        "kind": "text",
        "text": ".",
        "target": null
      }
    ],
    "blockTags": []
  },
  "type": null,
  "hierarchy": {
    "extends": [
      "SinterConnectionError"
    ],
    "extendedBy": []
  },
  "sources": [
    {
      "fileName": "packages/driver/dist/errors.d.ts",
      "line": 97,
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
      "id": 608,
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
          "fileName": "packages/driver/dist/errors.d.ts",
          "line": 89,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "constructor",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 609,
          "name": "SinterSocketTimeoutError",
          "comment": null,
          "typeParameters": [],
          "parameters": [
            {
              "id": 610,
              "name": "message",
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
              "id": 611,
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
                "text": "ErrorOptions",
                "name": "ErrorOptions",
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            }
          ],
          "returnType": {
            "kind": "reference",
            "text": "SinterSocketTimeoutError",
            "name": "SinterSocketTimeoutError",
            "target": {
              "id": 598,
              "name": "SinterSocketTimeoutError",
              "route": "classes/SinterSocketTimeoutError"
            },
            "children": []
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/errors.d.ts",
              "line": 89,
              "character": 4,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "SinterConnectionError",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 616,
      "name": "cause",
      "anchor": "cause",
      "kind": "Property",
      "kindId": 1024,
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
      "type": {
        "kind": "intrinsic",
        "text": "unknown",
        "name": "unknown",
        "target": null,
        "children": []
      },
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/typescript@6.0.3/node_modules/typescript/lib/lib.es2022.error.d.ts",
          "line": 24,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "cause",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [],
      "typeDeclaration": []
    },
    {
      "id": 612,
      "name": "code",
      "anchor": "code",
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
            "text": "Always ",
            "target": null
          },
          {
            "kind": "code",
            "text": "`SOCKET_TIMEOUT`",
            "target": null
          },
          {
            "kind": "text",
            "text": ".",
            "target": null
          }
        ],
        "blockTags": []
      },
      "type": {
        "kind": "literal",
        "text": "\"SOCKET_TIMEOUT\"",
        "name": null,
        "target": null,
        "children": []
      },
      "defaultValue": null,
      "sources": [
        {
          "fileName": "packages/driver/dist/errors.d.ts",
          "line": 99,
          "character": 13,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": "code",
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [],
      "typeDeclaration": []
    },
    {
      "id": 614,
      "name": "message",
      "anchor": "message",
      "kind": "Property",
      "kindId": 1024,
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
      "type": {
        "kind": "intrinsic",
        "text": "string",
        "name": "string",
        "target": null,
        "children": []
      },
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/typescript@6.0.3/node_modules/typescript/lib/lib.es5.d.ts",
          "line": 1075,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "message",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [],
      "typeDeclaration": []
    },
    {
      "id": 613,
      "name": "name",
      "anchor": "name",
      "kind": "Property",
      "kindId": 1024,
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
      "type": {
        "kind": "intrinsic",
        "text": "string",
        "name": "string",
        "target": null,
        "children": []
      },
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/typescript@6.0.3/node_modules/typescript/lib/lib.es5.d.ts",
          "line": 1074,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "name",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [],
      "typeDeclaration": []
    },
    {
      "id": 615,
      "name": "stack",
      "anchor": "stack",
      "kind": "Property",
      "kindId": 1024,
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
      "type": {
        "kind": "intrinsic",
        "text": "string",
        "name": "string",
        "target": null,
        "children": []
      },
      "defaultValue": null,
      "sources": [
        {
          "fileName": "node_modules/.pnpm/typescript@6.0.3/node_modules/typescript/lib/lib.es5.d.ts",
          "line": 1076,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "stack",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [],
      "typeDeclaration": []
    },
    {
      "id": 607,
      "name": "stackTraceLimit",
      "anchor": "stack-trace-limit",
      "kind": "Property",
      "kindId": 1024,
      "flags": {
        "static": true,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true,
        "const": false
      },
      "comment": {
        "summary": [
          {
            "kind": "text",
            "text": "The ",
            "target": null
          },
          {
            "kind": "code",
            "text": "`Error.stackTraceLimit`",
            "target": null
          },
          {
            "kind": "text",
            "text": " property specifies the number of stack frames\ncollected by a stack trace (whether generated by ",
            "target": null
          },
          {
            "kind": "code",
            "text": "`new Error().stack`",
            "target": null
          },
          {
            "kind": "text",
            "text": " or\n",
            "target": null
          },
          {
            "kind": "code",
            "text": "`Error.captureStackTrace(obj)`",
            "target": null
          },
          {
            "kind": "text",
            "text": ").\n\nThe default value is ",
            "target": null
          },
          {
            "kind": "code",
            "text": "`10`",
            "target": null
          },
          {
            "kind": "text",
            "text": " but may be set to any valid JavaScript number. Changes\nwill affect any stack trace captured _after_ the value has been changed.\n\nIf set to a non-number value, or set to a negative number, stack traces will\nnot capture any frames.",
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
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/globals.d.ts",
          "line": 67,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "stackTraceLimit",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [],
      "typeDeclaration": []
    },
    {
      "id": 599,
      "name": "captureStackTrace",
      "anchor": "capture-stack-trace",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": true,
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
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/globals.d.ts",
          "line": 51,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "captureStackTrace",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 600,
          "name": "captureStackTrace",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Creates a ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`.stack`",
                "target": null
              },
              {
                "kind": "text",
                "text": " property on ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`targetObject`",
                "target": null
              },
              {
                "kind": "text",
                "text": ", which when accessed returns\na string representing the location in the code at which\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "`Error.captureStackTrace()`",
                "target": null
              },
              {
                "kind": "text",
                "text": " was called.\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nconst myObject = {};\nError.captureStackTrace(myObject);\nmyObject.stack;  // Similar to `new Error().stack`\n```",
                "target": null
              },
              {
                "kind": "text",
                "text": "\n\nThe first line of the trace will be prefixed with\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "`${myObject.name}: ${myObject.message}`",
                "target": null
              },
              {
                "kind": "text",
                "text": ".\n\nThe optional ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`constructorOpt`",
                "target": null
              },
              {
                "kind": "text",
                "text": " argument accepts a function. If given, all frames\nabove ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`constructorOpt`",
                "target": null
              },
              {
                "kind": "text",
                "text": ", including ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`constructorOpt`",
                "target": null
              },
              {
                "kind": "text",
                "text": ", will be omitted from the\ngenerated stack trace.\n\nThe ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`constructorOpt`",
                "target": null
              },
              {
                "kind": "text",
                "text": " argument is useful for hiding implementation\ndetails of error generation from the user. For instance:\n\n",
                "target": null
              },
              {
                "kind": "code",
                "text": "```js\nfunction a() {\n  b();\n}\n\nfunction b() {\n  c();\n}\n\nfunction c() {\n  // Create an error without stack trace to avoid calculating the stack trace twice.\n  const { stackTraceLimit } = Error;\n  Error.stackTraceLimit = 0;\n  const error = new Error();\n  Error.stackTraceLimit = stackTraceLimit;\n\n  // Capture the stack trace above function b\n  Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace\n  throw error;\n}\n\na();\n```",
                "target": null
              }
            ],
            "blockTags": []
          },
          "typeParameters": [],
          "parameters": [
            {
              "id": 601,
              "name": "targetObject",
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
                "text": "object",
                "name": "object",
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            },
            {
              "id": 602,
              "name": "constructorOpt",
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
                "kind": "reference",
                "text": "Function",
                "name": "Function",
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
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/globals.d.ts",
              "line": 51,
              "character": 4,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "captureStackTrace",
            "overwrites": null,
            "implementationOf": null
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 603,
      "name": "prepareStackTrace",
      "anchor": "prepare-stack-trace",
      "kind": "Method",
      "kindId": 2048,
      "flags": {
        "static": true,
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
          "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/globals.d.ts",
          "line": 55,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": "prepareStackTrace",
        "overwrites": null,
        "implementationOf": null
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 604,
          "name": "prepareStackTrace",
          "comment": {
            "summary": [],
            "blockTags": [
              {
                "tag": "@see",
                "content": [
                  {
                    "kind": "text",
                    "text": "https://v8.dev/docs/stack-trace-api#customizing-stack-traces",
                    "target": null
                  }
                ]
              }
            ]
          },
          "typeParameters": [],
          "parameters": [
            {
              "id": 605,
              "name": "err",
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
              "id": 606,
              "name": "stackTraces",
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
                "text": "CallSite[]",
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
            "text": "any",
            "name": "any",
            "target": null,
            "children": []
          },
          "sources": [
            {
              "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/globals.d.ts",
              "line": 55,
              "character": 4,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": "prepareStackTrace",
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
