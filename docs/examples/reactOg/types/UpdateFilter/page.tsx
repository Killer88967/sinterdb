import { ApiReferencePage } from "../../_components/api-reference-page";

const api = {
  "id": 731,
  "name": "UpdateFilter",
  "slug": "UpdateFilter",
  "kind": "TypeAlias",
  "kindId": 2097152,
  "route": "types/UpdateFilter",
  "description": "An update document built from operators: `$set`, `$unset`, `$inc`, `$min`,\n`$max`, `$push`, `$addToSet` and `$pull`. Each operator accepts only paths\nof a matching type.",
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
    "fileName": "packages/driver/dist/update.d.ts",
    "line": 38,
    "character": 12,
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
      "default": null,
      "description": ""
    }
  ],
  "signatures": [],
  "children": [
    {
      "id": 739,
      "name": "$addToSet",
      "anchor": "-add-to-set",
      "kind": "Property",
      "kindId": 1024,
      "description": "Appends a value to an array unless an equal element is already present. A missing field becomes a new array.",
      "type": "{ readonly [Path in ArrayPaths<TDocument>]?: ElementOf<NonNullable<FilterPathValue<TDocument, Path>>> }",
      "flags": {
        "static": false,
        "readonly": true,
        "optional": true,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/update.d.ts",
        "line": 64,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 735,
      "name": "$inc",
      "anchor": "-inc",
      "kind": "Property",
      "kindId": 1024,
      "description": "Adds a number to numeric fields. A missing field is set to the number.",
      "type": "{ readonly [Path in NumericPaths<TDocument>]?: NonNullable<FilterPathValue<TDocument, Path>> }",
      "flags": {
        "static": false,
        "readonly": true,
        "optional": true,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/update.d.ts",
        "line": 48,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 737,
      "name": "$max",
      "anchor": "-max",
      "kind": "Property",
      "kindId": 1024,
      "description": "Raises a field to the given value when the value is larger. A missing field is set to the value.",
      "type": "{ readonly [Path in ComparablePaths<TDocument>]?: NonNullable<FilterPathValue<TDocument, Path>> }",
      "flags": {
        "static": false,
        "readonly": true,
        "optional": true,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/update.d.ts",
        "line": 56,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 736,
      "name": "$min",
      "anchor": "-min",
      "kind": "Property",
      "kindId": 1024,
      "description": "Lowers a field to the given value when the value is smaller. A missing field is set to the value.",
      "type": "{ readonly [Path in ComparablePaths<TDocument>]?: NonNullable<FilterPathValue<TDocument, Path>> }",
      "flags": {
        "static": false,
        "readonly": true,
        "optional": true,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/update.d.ts",
        "line": 52,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 740,
      "name": "$pull",
      "anchor": "-pull",
      "kind": "Property",
      "kindId": 1024,
      "description": "Removes every matching element from an array.",
      "type": "{ readonly [Path in ArrayPaths<TDocument>]?: ElementOf<NonNullable<FilterPathValue<TDocument, Path>>> }",
      "flags": {
        "static": false,
        "readonly": true,
        "optional": true,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/update.d.ts",
        "line": 68,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 738,
      "name": "$push",
      "anchor": "-push",
      "kind": "Property",
      "kindId": 1024,
      "description": "Appends a value to an array, creating the array when the field is missing.",
      "type": "{ readonly [Path in ArrayPaths<TDocument>]?: ElementOf<NonNullable<FilterPathValue<TDocument, Path>>> }",
      "flags": {
        "static": false,
        "readonly": true,
        "optional": true,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/update.d.ts",
        "line": 60,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 733,
      "name": "$set",
      "anchor": "-set",
      "kind": "Property",
      "kindId": 1024,
      "description": "Sets fields to values, creating them when missing.",
      "type": "{ readonly [Path in UpdatePaths<TDocument>]?: FilterPathValue<TDocument, Path> }",
      "flags": {
        "static": false,
        "readonly": true,
        "optional": true,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/update.d.ts",
        "line": 40,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 734,
      "name": "$unset",
      "anchor": "-unset",
      "kind": "Property",
      "kindId": 1024,
      "description": "Removes fields.",
      "type": "{ readonly [Path in UpdatePaths<TDocument>]?: true | 1 }",
      "flags": {
        "static": false,
        "readonly": true,
        "optional": true,
        "abstract": false,
        "protected": false,
        "private": false,
        "external": false
      },
      "source": {
        "fileName": "packages/driver/dist/update.d.ts",
        "line": 44,
        "character": 13,
        "url": null
      },
      "signatures": []
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
