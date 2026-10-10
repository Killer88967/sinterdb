import { ApiReferencePage } from "../../_components/api-reference-page";

const api = {
  "id": 419,
  "name": "SinterConnectionStringError",
  "slug": "SinterConnectionStringError",
  "kind": "Class",
  "kindId": 128,
  "route": "classes/SinterConnectionStringError",
  "description": "The connection string is malformed. Code `INVALID_CONNECTION_STRING`.",
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
    "fileName": "packages/driver/dist/errors.d.ts",
    "line": 57,
    "character": 21,
    "url": null
  },
  "hierarchy": {
    "extends": [
      "SinterError"
    ],
    "extendedBy": []
  },
  "typeParameters": [],
  "signatures": [],
  "children": [
    {
      "id": 429,
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
        "fileName": "packages/driver/dist/errors.d.ts",
        "line": 58,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 430,
          "name": "SinterConnectionStringError",
          "description": "",
          "typeParameters": [],
          "parameters": [
            {
              "name": "message",
              "type": "string",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "options",
              "type": "ErrorOptions",
              "optional": true,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "SinterConnectionStringError",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 58,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 437,
      "name": "cause",
      "anchor": "cause",
      "kind": "Property",
      "kindId": 1024,
      "description": "",
      "type": "unknown",
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
        "fileName": "node_modules/.pnpm/typescript@6.0.3/node_modules/typescript/lib/lib.es2022.error.d.ts",
        "line": 24,
        "character": 4,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 433,
      "name": "code",
      "anchor": "code",
      "kind": "Property",
      "kindId": 1024,
      "description": "A stable identifier for the kind of failure; see SinterErrorCode.",
      "type": "SinterErrorCode",
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
        "fileName": "packages/driver/dist/errors.d.ts",
        "line": 53,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 435,
      "name": "message",
      "anchor": "message",
      "kind": "Property",
      "kindId": 1024,
      "description": "",
      "type": "string",
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
        "fileName": "node_modules/.pnpm/typescript@6.0.3/node_modules/typescript/lib/lib.es5.d.ts",
        "line": 1075,
        "character": 4,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 434,
      "name": "name",
      "anchor": "name",
      "kind": "Property",
      "kindId": 1024,
      "description": "",
      "type": "string",
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
        "fileName": "node_modules/.pnpm/typescript@6.0.3/node_modules/typescript/lib/lib.es5.d.ts",
        "line": 1074,
        "character": 4,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 436,
      "name": "stack",
      "anchor": "stack",
      "kind": "Property",
      "kindId": 1024,
      "description": "",
      "type": "string",
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
        "fileName": "node_modules/.pnpm/typescript@6.0.3/node_modules/typescript/lib/lib.es5.d.ts",
        "line": 1076,
        "character": 4,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 428,
      "name": "stackTraceLimit",
      "anchor": "stack-trace-limit",
      "kind": "Property",
      "kindId": 1024,
      "description": "The `Error.stackTraceLimit` property specifies the number of stack frames\ncollected by a stack trace (whether generated by `new Error().stack` or\n`Error.captureStackTrace(obj)`).\n\nThe default value is `10` but may be set to any valid JavaScript number. Changes\nwill affect any stack trace captured _after_ the value has been changed.\n\nIf set to a non-number value, or set to a negative number, stack traces will\nnot capture any frames.",
      "type": "number",
      "flags": {
        "static": true,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/globals.d.ts",
        "line": 67,
        "character": 4,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 420,
      "name": "captureStackTrace",
      "anchor": "capture-stack-trace",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": true,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/globals.d.ts",
        "line": 51,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 421,
          "name": "captureStackTrace",
          "description": "Creates a `.stack` property on `targetObject`, which when accessed returns\na string representing the location in the code at which\n`Error.captureStackTrace()` was called.\n\n```js\nconst myObject = {};\nError.captureStackTrace(myObject);\nmyObject.stack;  // Similar to `new Error().stack`\n```\n\nThe first line of the trace will be prefixed with\n`${myObject.name}: ${myObject.message}`.\n\nThe optional `constructorOpt` argument accepts a function. If given, all frames\nabove `constructorOpt`, including `constructorOpt`, will be omitted from the\ngenerated stack trace.\n\nThe `constructorOpt` argument is useful for hiding implementation\ndetails of error generation from the user. For instance:\n\n```js\nfunction a() {\n  b();\n}\n\nfunction b() {\n  c();\n}\n\nfunction c() {\n  // Create an error without stack trace to avoid calculating the stack trace twice.\n  const { stackTraceLimit } = Error;\n  Error.stackTraceLimit = 0;\n  const error = new Error();\n  Error.stackTraceLimit = stackTraceLimit;\n\n  // Capture the stack trace above function b\n  Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace\n  throw error;\n}\n\na();\n```",
          "typeParameters": [],
          "parameters": [
            {
              "name": "targetObject",
              "type": "object",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "constructorOpt",
              "type": "Function",
              "optional": true,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "void",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/globals.d.ts",
            "line": 51,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 424,
      "name": "prepareStackTrace",
      "anchor": "prepare-stack-trace",
      "kind": "Method",
      "kindId": 2048,
      "description": "",
      "type": null,
      "flags": {
        "static": true,
        "readonly": false,
        "optional": false,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": true
      },
      "source": {
        "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/globals.d.ts",
        "line": 55,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 425,
          "name": "prepareStackTrace",
          "description": "",
          "typeParameters": [],
          "parameters": [
            {
              "name": "err",
              "type": "Error",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "stackTraces",
              "type": "CallSite[]",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "any",
          "returnsDescription": "",
          "source": {
            "fileName": "node_modules/.pnpm/@types+node@26.6.5/node_modules/@types/node/globals.d.ts",
            "line": 55,
            "character": 4,
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
