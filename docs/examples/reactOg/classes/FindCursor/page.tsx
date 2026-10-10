import { ApiReferencePage } from "../../_components/api-reference-page";

const api = {
  "id": 285,
  "name": "FindCursor",
  "slug": "FindCursor",
  "kind": "Class",
  "kindId": 128,
  "route": "classes/FindCursor",
  "description": "A lazy, batched cursor over the results of a find.\n\nNothing is sent until the first read. Documents arrive in batches, and the\ncursor releases its server-side state when it is exhausted or closed.\n`toArray()` and `for await` close the cursor for you, even when the loop\nexits early or throws.",
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
    "fileName": "packages/driver/dist/cursor.d.ts",
    "line": 27,
    "character": 21,
    "url": null
  },
  "hierarchy": {
    "extends": [],
    "extendedBy": []
  },
  "typeParameters": [
    {
      "name": "TDocument",
      "type": "object",
      "default": "Document",
      "description": ""
    }
  ],
  "signatures": [],
  "children": [
    {
      "id": 287,
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
        "fileName": "packages/driver/dist/cursor.d.ts",
        "line": 36,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 288,
          "name": "FindCursor",
          "description": "",
          "typeParameters": [
            {
              "name": "TDocument",
              "type": "object",
              "default": "Document"
            }
          ],
          "parameters": [
            {
              "name": "execute",
              "type": "CursorExecutor",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "collection",
              "type": "string",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "filter",
              "type": "Document",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "batchSize",
              "type": "number | undefined",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "query",
              "type": "FindQueryOptions",
              "optional": true,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "FindCursor<TDocument>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/cursor.d.ts",
            "line": 36,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 314,
      "name": "[asyncIterator]",
      "anchor": "-async-iterator-",
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
        "fileName": "packages/driver/dist/cursor.d.ts",
        "line": 66,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 315,
          "name": "[asyncIterator]",
          "description": "Iterates the remaining documents, closing the cursor when the loop ends.",
          "typeParameters": [],
          "parameters": [],
          "returns": "AsyncGenerator<WithId<TDocument>, void, undefined>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/cursor.d.ts",
            "line": 66,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 311,
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
        "fileName": "packages/driver/dist/cursor.d.ts",
        "line": 62,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 312,
          "name": "close",
          "description": "Closes the cursor and releases it on the server. Closing twice does\nnothing.",
          "typeParameters": [],
          "parameters": [],
          "returns": "Promise<void>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/cursor.d.ts",
            "line": 62,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 303,
      "name": "explain",
      "anchor": "explain",
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
        "fileName": "packages/driver/dist/cursor.d.ts",
        "line": 43,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 304,
          "name": "explain",
          "description": "Asks the server how it would run this query, without running it. The\nsort, skip, limit, and batch size do not change the plan.",
          "typeParameters": [],
          "parameters": [],
          "returns": "Promise<ExplainResult>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/cursor.d.ts",
            "line": 43,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 305,
      "name": "hasNext",
      "anchor": "has-next",
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
        "fileName": "packages/driver/dist/cursor.d.ts",
        "line": 47,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 306,
          "name": "hasNext",
          "description": "Whether another document is available. This may fetch the next batch.",
          "typeParameters": [],
          "parameters": [],
          "returns": "Promise<boolean>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/cursor.d.ts",
            "line": 47,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 307,
      "name": "next",
      "anchor": "next",
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
        "fileName": "packages/driver/dist/cursor.d.ts",
        "line": 52,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 308,
          "name": "next",
          "description": "Returns the next document, or `null` when the results are exhausted or\nthe cursor is closed.",
          "typeParameters": [],
          "parameters": [],
          "returns": "Promise<WithId<TDocument> | null>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/cursor.d.ts",
            "line": 52,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 309,
      "name": "toArray",
      "anchor": "to-array",
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
        "fileName": "packages/driver/dist/cursor.d.ts",
        "line": 57,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 310,
          "name": "toArray",
          "description": "Reads all remaining documents into an array and closes the cursor. Large\nresult sets are held in memory; iterate instead when they may be large.",
          "typeParameters": [],
          "parameters": [],
          "returns": "Promise<WithId<TDocument>[]>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/cursor.d.ts",
            "line": 57,
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
