import { ApiReferencePage } from "../../_components/api-reference-page";

const api = {
  "id": 1,
  "name": "CustomId",
  "slug": "CustomId",
  "kind": "Class",
  "kindId": 128,
  "route": "classes/CustomId",
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
    "fileName": "packages/protocol/dist/custom-id.d.ts",
    "line": 3,
    "character": 21,
    "url": null
  },
  "hierarchy": {
    "extends": [],
    "extendedBy": []
  },
  "typeParameters": [],
  "signatures": [],
  "children": [
    {
      "id": 13,
      "name": "timestamp",
      "anchor": "timestamp",
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
        "fileName": "packages/protocol/dist/custom-id.d.ts",
        "line": 9,
        "character": 8,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 15,
      "name": "equals",
      "anchor": "equals",
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
        "fileName": "packages/protocol/dist/custom-id.d.ts",
        "line": 10,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 16,
          "name": "equals",
          "description": "",
          "typeParameters": [],
          "parameters": [
            {
              "name": "other",
              "type": "CustomId",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "boolean",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 10,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 18,
      "name": "toBytes",
      "anchor": "to-bytes",
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
        "fileName": "packages/protocol/dist/custom-id.d.ts",
        "line": 11,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 19,
          "name": "toBytes",
          "description": "",
          "typeParameters": [],
          "parameters": [],
          "returns": "Uint8Array",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 11,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 20,
      "name": "toHexString",
      "anchor": "to-hex-string",
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
        "fileName": "packages/protocol/dist/custom-id.d.ts",
        "line": 12,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 21,
          "name": "toHexString",
          "description": "",
          "typeParameters": [],
          "parameters": [],
          "returns": "string",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 12,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 24,
      "name": "toJSON",
      "anchor": "to-json",
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
        "fileName": "packages/protocol/dist/custom-id.d.ts",
        "line": 14,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 25,
          "name": "toJSON",
          "description": "",
          "typeParameters": [],
          "parameters": [],
          "returns": "string",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 14,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 22,
      "name": "toString",
      "anchor": "to-string",
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
        "fileName": "packages/protocol/dist/custom-id.d.ts",
        "line": 13,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 23,
          "name": "toString",
          "description": "",
          "typeParameters": [],
          "parameters": [],
          "returns": "string",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 13,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 4,
      "name": "fromBytes",
      "anchor": "from-bytes",
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
        "external": false
      },
      "source": {
        "fileName": "packages/protocol/dist/custom-id.d.ts",
        "line": 7,
        "character": 11,
        "url": null
      },
      "signatures": [
        {
          "id": 5,
          "name": "fromBytes",
          "description": "",
          "typeParameters": [],
          "parameters": [
            {
              "name": "value",
              "type": "Uint8Array",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "CustomId",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 7,
            "character": 11,
            "url": null
          }
        }
      ]
    },
    {
      "id": 7,
      "name": "fromHexString",
      "anchor": "from-hex-string",
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
        "external": false
      },
      "source": {
        "fileName": "packages/protocol/dist/custom-id.d.ts",
        "line": 8,
        "character": 11,
        "url": null
      },
      "signatures": [
        {
          "id": 8,
          "name": "fromHexString",
          "description": "",
          "typeParameters": [],
          "parameters": [
            {
              "name": "value",
              "type": "string",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "CustomId",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 8,
            "character": 11,
            "url": null
          }
        }
      ]
    },
    {
      "id": 2,
      "name": "generate",
      "anchor": "generate",
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
        "external": false
      },
      "source": {
        "fileName": "packages/protocol/dist/custom-id.d.ts",
        "line": 6,
        "character": 11,
        "url": null
      },
      "signatures": [
        {
          "id": 3,
          "name": "generate",
          "description": "",
          "typeParameters": [],
          "parameters": [],
          "returns": "CustomId",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 6,
            "character": 11,
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
