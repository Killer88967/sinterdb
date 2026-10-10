import { ApiReflectionPage } from "../../_components/api-shell";

const api = {
  "id": 285,
  "name": "FindCursor",
  "slug": "FindCursor",
  "route": "classes/FindCursor",
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
        "text": "A lazy, batched cursor over the results of a find.\n\nNothing is sent until the first read. Documents arrive in batches, and the\ncursor releases its server-side state when it is exhausted or closed.\n",
        "target": null
      },
      {
        "kind": "code",
        "text": "`toArray()`",
        "target": null
      },
      {
        "kind": "text",
        "text": " and ",
        "target": null
      },
      {
        "kind": "code",
        "text": "`for await`",
        "target": null
      },
      {
        "kind": "text",
        "text": " close the cursor for you, even when the loop\nexits early or throws.",
        "target": null
      }
    ],
    "blockTags": []
  },
  "type": null,
  "hierarchy": {
    "extends": [],
    "extendedBy": []
  },
  "sources": [
    {
      "fileName": "packages/driver/dist/cursor.d.ts",
      "line": 27,
      "character": 21,
      "url": null
    }
  ],
  "relationships": {
    "inheritedFrom": null,
    "overwrites": null,
    "implementationOf": null
  },
  "typeParameters": [
    {
      "id": 286,
      "name": "TDocument",
      "type": {
        "kind": "intrinsic",
        "text": "object",
        "name": "object",
        "target": null,
        "children": []
      },
      "default": {
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
      "comment": null
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
          "fileName": "packages/driver/dist/cursor.d.ts",
          "line": 36,
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
          "id": 288,
          "name": "FindCursor",
          "comment": null,
          "typeParameters": [
            {
              "id": 289,
              "name": "TDocument",
              "type": {
                "kind": "intrinsic",
                "text": "object",
                "name": "object",
                "target": null,
                "children": []
              },
              "default": {
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
              "comment": null
            }
          ],
          "parameters": [
            {
              "id": 290,
              "name": "execute",
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
                "text": "CursorExecutor",
                "name": "CursorExecutor",
                "target": {
                  "id": 316,
                  "name": "CursorExecutor",
                  "route": "types/CursorExecutor"
                },
                "children": []
              },
              "defaultValue": null,
              "comment": null
            },
            {
              "id": 291,
              "name": "collection",
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
              "id": 292,
              "name": "filter",
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
              "comment": null
            },
            {
              "id": 293,
              "name": "batchSize",
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
                "text": "number | undefined",
                "name": null,
                "target": null,
                "children": []
              },
              "defaultValue": null,
              "comment": null
            },
            {
              "id": 294,
              "name": "query",
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
                "text": "FindQueryOptions",
                "name": "FindQueryOptions",
                "target": {
                  "id": 321,
                  "name": "FindQueryOptions",
                  "route": "interfaces/FindQueryOptions"
                },
                "children": []
              },
              "defaultValue": null,
              "comment": null
            }
          ],
          "returnType": {
            "kind": "reference",
            "text": "FindCursor<TDocument>",
            "name": "FindCursor",
            "target": {
              "id": 285,
              "name": "FindCursor",
              "route": "classes/FindCursor"
            },
            "children": [
              {
                "kind": "reference",
                "text": "TDocument",
                "name": "TDocument",
                "target": {
                  "id": 286,
                  "name": "TDocument",
                  "route": "other/TDocument"
                },
                "children": []
              }
            ]
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/cursor.d.ts",
              "line": 36,
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
      "id": 314,
      "name": "[asyncIterator]",
      "anchor": "-async-iterator-",
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
          "fileName": "packages/driver/dist/cursor.d.ts",
          "line": 66,
          "character": 4,
          "url": null
        }
      ],
      "relationships": {
        "inheritedFrom": null,
        "overwrites": null,
        "implementationOf": "AsyncIterable.[asyncIterator]"
      },
      "typeParameters": [],
      "signatures": [
        {
          "id": 315,
          "name": "[asyncIterator]",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Iterates the remaining documents, closing the cursor when the loop ends.",
                "target": null
              }
            ],
            "blockTags": []
          },
          "typeParameters": [],
          "parameters": [],
          "returnType": {
            "kind": "reference",
            "text": "AsyncGenerator<WithId<TDocument>, void, undefined>",
            "name": "AsyncGenerator",
            "target": null,
            "children": [
              {
                "kind": "reference",
                "text": "WithId<TDocument>",
                "name": "WithId",
                "target": {
                  "id": 276,
                  "name": "WithId",
                  "route": "types/WithId"
                },
                "children": [
                  {
                    "kind": "reference",
                    "text": "TDocument",
                    "name": "TDocument",
                    "target": {
                      "id": 286,
                      "name": "TDocument",
                      "route": "other/TDocument"
                    },
                    "children": []
                  }
                ]
              },
              {
                "kind": "intrinsic",
                "text": "void",
                "name": "void",
                "target": null,
                "children": []
              },
              {
                "kind": "intrinsic",
                "text": "undefined",
                "name": "undefined",
                "target": null,
                "children": []
              }
            ]
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/cursor.d.ts",
              "line": 66,
              "character": 4,
              "url": null
            }
          ],
          "relationships": {
            "inheritedFrom": null,
            "overwrites": null,
            "implementationOf": "AsyncIterable.[asyncIterator]"
          }
        }
      ],
      "typeDeclaration": []
    },
    {
      "id": 311,
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
          "fileName": "packages/driver/dist/cursor.d.ts",
          "line": 62,
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
          "id": 312,
          "name": "close",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Closes the cursor and releases it on the server. Closing twice does\nnothing.",
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
              "fileName": "packages/driver/dist/cursor.d.ts",
              "line": 62,
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
      "id": 303,
      "name": "explain",
      "anchor": "explain",
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
          "fileName": "packages/driver/dist/cursor.d.ts",
          "line": 43,
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
          "id": 304,
          "name": "explain",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Asks the server how it would run this query, without running it. The\nsort, skip, limit, and batch size do not change the plan.",
                "target": null
              }
            ],
            "blockTags": []
          },
          "typeParameters": [],
          "parameters": [],
          "returnType": {
            "kind": "reference",
            "text": "Promise<ExplainResult>",
            "name": "Promise",
            "target": null,
            "children": [
              {
                "kind": "reference",
                "text": "ExplainResult",
                "name": "ExplainResult",
                "target": {
                  "id": 664,
                  "name": "ExplainResult",
                  "route": "interfaces/ExplainResult"
                },
                "children": []
              }
            ]
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/cursor.d.ts",
              "line": 43,
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
      "id": 305,
      "name": "hasNext",
      "anchor": "has-next",
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
          "fileName": "packages/driver/dist/cursor.d.ts",
          "line": 47,
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
          "id": 306,
          "name": "hasNext",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Whether another document is available. This may fetch the next batch.",
                "target": null
              }
            ],
            "blockTags": []
          },
          "typeParameters": [],
          "parameters": [],
          "returnType": {
            "kind": "reference",
            "text": "Promise<boolean>",
            "name": "Promise",
            "target": null,
            "children": [
              {
                "kind": "intrinsic",
                "text": "boolean",
                "name": "boolean",
                "target": null,
                "children": []
              }
            ]
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/cursor.d.ts",
              "line": 47,
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
      "id": 307,
      "name": "next",
      "anchor": "next",
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
          "fileName": "packages/driver/dist/cursor.d.ts",
          "line": 52,
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
          "id": 308,
          "name": "next",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Returns the next document, or ",
                "target": null
              },
              {
                "kind": "code",
                "text": "`null`",
                "target": null
              },
              {
                "kind": "text",
                "text": " when the results are exhausted or\nthe cursor is closed.",
                "target": null
              }
            ],
            "blockTags": []
          },
          "typeParameters": [],
          "parameters": [],
          "returnType": {
            "kind": "reference",
            "text": "Promise<WithId<TDocument> | null>",
            "name": "Promise",
            "target": null,
            "children": [
              {
                "kind": "union",
                "text": "WithId<TDocument> | null",
                "name": null,
                "target": null,
                "children": []
              }
            ]
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/cursor.d.ts",
              "line": 52,
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
      "id": 309,
      "name": "toArray",
      "anchor": "to-array",
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
          "fileName": "packages/driver/dist/cursor.d.ts",
          "line": 57,
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
          "id": 310,
          "name": "toArray",
          "comment": {
            "summary": [
              {
                "kind": "text",
                "text": "Reads all remaining documents into an array and closes the cursor. Large\nresult sets are held in memory; iterate instead when they may be large.",
                "target": null
              }
            ],
            "blockTags": []
          },
          "typeParameters": [],
          "parameters": [],
          "returnType": {
            "kind": "reference",
            "text": "Promise<WithId<TDocument>[]>",
            "name": "Promise",
            "target": null,
            "children": [
              {
                "kind": "array",
                "text": "WithId<TDocument>[]",
                "name": null,
                "target": null,
                "children": []
              }
            ]
          },
          "sources": [
            {
              "fileName": "packages/driver/dist/cursor.d.ts",
              "line": 57,
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
