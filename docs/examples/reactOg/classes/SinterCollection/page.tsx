import { ApiReferencePage } from "../../_components/api-reference-page";

const api = {
  "id": 199,
  "name": "SinterCollection",
  "slug": "SinterCollection",
  "kind": "Class",
  "kindId": 128,
  "route": "classes/SinterCollection",
  "description": "A collection of documents, typed by `TDocument`.\n\nGet one from SinterDatabase.collection. The type parameter makes\nfilters, updates and results type-checked against your document shape; it\nis not enforced by the server.",
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
    "fileName": "packages/driver/dist/collection.d.ts",
    "line": 63,
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
      "id": 201,
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 70,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 202,
          "name": "SinterCollection",
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
              "name": "database",
              "type": "SinterDatabase",
              "optional": false,
              "defaultValue": null,
              "description": "The database this collection belongs to."
            },
            {
              "name": "name",
              "type": "string",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "SinterCollection<TDocument>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 70,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 206,
      "name": "database",
      "anchor": "database",
      "kind": "Property",
      "kindId": 1024,
      "description": "The database this collection belongs to.",
      "type": "SinterDatabase",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 65,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 208,
      "name": "name",
      "anchor": "name",
      "kind": "Property",
      "kindId": 1024,
      "description": "The collection name.",
      "type": "string",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 69,
        "character": 13,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 209,
      "name": "namespace",
      "anchor": "namespace",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 76,
        "character": 8,
        "url": null
      },
      "signatures": []
    },
    {
      "id": 241,
      "name": "createIndex",
      "anchor": "create-index",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 140,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 242,
          "name": "createIndex",
          "description": "Creates an index, or confirms that an identical one exists. The collection\nis created if it does not exist. A unique index fails with a\n`DuplicateKey` server error when existing documents already violate it.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "definition",
              "type": "IndexDefinition<TDocument>",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "Promise<CreateIndexResult>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 140,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 223,
      "name": "deleteMany",
      "anchor": "delete-many",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 106,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 224,
          "name": "deleteMany",
          "description": "Deletes every document that matches the filter.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "filter",
              "type": "Filter<TDocument>",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "Promise<DeleteResult>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 106,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 220,
      "name": "deleteOne",
      "anchor": "delete-one",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 104,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 221,
          "name": "deleteOne",
          "description": "Deletes the first document that matches the filter.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "filter",
              "type": "Filter<TDocument>",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "Promise<DeleteResult>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 104,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 244,
      "name": "dropIndex",
      "anchor": "drop-index",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 142,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 245,
          "name": "dropIndex",
          "description": "Drops an index by name. The `_id` index cannot be dropped.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "name",
              "type": "string",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "Promise<void>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 142,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 251,
      "name": "find",
      "anchor": "find",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 155,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 252,
          "name": "find",
          "description": "Starts a query and returns a cursor. No request is sent until the cursor\nis read.\n\nThe cursor can be read with `next()`, collected with `toArray()`, or\niterated with `for await`. Always finish or `close()` it so the server\ncan release it.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "filter",
              "type": "Filter<TDocument>",
              "optional": true,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "options",
              "type": "FindOptions<TDocument>",
              "optional": true,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "FindCursor<TDocument>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 155,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 217,
      "name": "findOne",
      "anchor": "find-one",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 102,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 218,
          "name": "findOne",
          "description": "Finds the first document that matches the filter, or `null`. Without a\nfilter, it returns the first document in the collection.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "filter",
              "type": "Filter<TDocument>",
              "optional": true,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "Promise<WithId<TDocument> | null>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 102,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 247,
      "name": "indexes",
      "anchor": "indexes",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 144,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 248,
          "name": "indexes",
          "description": "The `_id` index first, then the others in creation order.",
          "typeParameters": [],
          "parameters": [],
          "returns": "Promise<IndexInfo[]>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 144,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 214,
      "name": "insertMany",
      "anchor": "insert-many",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 97,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 215,
          "name": "insertMany",
          "description": "Inserts several documents in order.\n\nAn empty array is rejected. If one document fails, the documents before\nit stay inserted, and the thrown SinterInsertManyError reports\n`failedIndex` and the `insertedIds` that were committed.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "documents",
              "type": "readonly OptionalId<TDocument>[]",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "Promise<InsertManyResult>",
          "returnsDescription": "The number of documents inserted and their `_id` values.",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 97,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 211,
      "name": "insertOne",
      "anchor": "insert-one",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 87,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 212,
          "name": "insertOne",
          "description": "Inserts one document.\n\nThe collection is created if it does not exist. A missing `_id` is\ngenerated.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "document",
              "type": "OptionalId<TDocument>",
              "optional": false,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "Promise<InsertOneResult>",
          "returnsDescription": "The `_id` of the inserted document.",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 87,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 226,
      "name": "replaceOne",
      "anchor": "replace-one",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 114,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 227,
          "name": "replaceOne",
          "description": "Replaces the first matching document with `replacement`.\n\nThe document keeps its `_id`. Giving the replacement a different `_id`\nfails with an `ImmutableId` server error. With `upsert`, a replacement is\ninserted when nothing matches.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "filter",
              "type": "Filter<TDocument>",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "replacement",
              "type": "OptionalId<TDocument>",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "options",
              "type": "UpdateOptions",
              "optional": true,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "Promise<UpdateResult>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 114,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 236,
      "name": "updateMany",
      "anchor": "update-many",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 134,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 237,
          "name": "updateMany",
          "description": "Applies an update to every matching document.\n\nWith `upsert`, a document seeded from the equality terms of the filter is\ninserted, updated, and reported in `upsertedId` when nothing matches.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "filter",
              "type": "Filter<TDocument>",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "update",
              "type": "UpdateFilter<TDocument>",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "options",
              "type": "UpdateOptions",
              "optional": true,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "Promise<UpdateResult>",
          "returnsDescription": "`modifiedCount` counts only documents whose stored bytes\n  actually changed.",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 134,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 231,
      "name": "updateOne",
      "anchor": "update-one",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 124,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 232,
          "name": "updateOne",
          "description": "Applies an update to the first matching document.\n\nWith `upsert`, a document seeded from the equality terms of the filter is\ninserted, updated, and reported in `upsertedId` when nothing matches.",
          "typeParameters": [],
          "parameters": [
            {
              "name": "filter",
              "type": "Filter<TDocument>",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "update",
              "type": "UpdateFilter<TDocument>",
              "optional": false,
              "defaultValue": null,
              "description": ""
            },
            {
              "name": "options",
              "type": "UpdateOptions",
              "optional": true,
              "defaultValue": null,
              "description": ""
            }
          ],
          "returns": "Promise<UpdateResult>",
          "returnsDescription": "`modifiedCount` counts only documents whose stored bytes\n  actually changed.",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 124,
            "character": 4,
            "url": null
          }
        }
      ]
    },
    {
      "id": 249,
      "name": "validateIndexes",
      "anchor": "validate-indexes",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 146,
        "character": 4,
        "url": null
      },
      "signatures": [
        {
          "id": 250,
          "name": "validateIndexes",
          "description": "Asks the server to rebuild every index and report any difference.",
          "typeParameters": [],
          "parameters": [],
          "returns": "Promise<IndexValidationResult>",
          "returnsDescription": "",
          "source": {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 146,
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
