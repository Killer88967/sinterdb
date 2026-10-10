import { ApiHierarchyPage } from "../_components/api-shell";

const classes = [
  {
    "id": 1,
    "name": "CustomId",
    "slug": "CustomId",
    "route": "classes/CustomId",
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
    "comment": null,
    "type": null,
    "hierarchy": {
      "extends": [],
      "extendedBy": []
    },
    "sources": [
      {
        "fileName": "packages/protocol/dist/custom-id.d.ts",
        "line": 3,
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
        "id": 13,
        "name": "timestamp",
        "anchor": "timestamp",
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
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 9,
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
        "id": 15,
        "name": "equals",
        "anchor": "equals",
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
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 10,
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
            "id": 16,
            "name": "equals",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 17,
                "name": "other",
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
                  "text": "CustomId",
                  "name": "CustomId",
                  "target": {
                    "id": 1,
                    "name": "CustomId",
                    "route": "classes/CustomId"
                  },
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
                "fileName": "packages/protocol/dist/custom-id.d.ts",
                "line": 10,
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
        "id": 18,
        "name": "toBytes",
        "anchor": "to-bytes",
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
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 11,
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
            "id": 19,
            "name": "toBytes",
            "comment": null,
            "typeParameters": [],
            "parameters": [],
            "returnType": {
              "kind": "reference",
              "text": "Uint8Array",
              "name": "Uint8Array",
              "target": null,
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/protocol/dist/custom-id.d.ts",
                "line": 11,
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
        "id": 20,
        "name": "toHexString",
        "anchor": "to-hex-string",
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
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 12,
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
            "id": 21,
            "name": "toHexString",
            "comment": null,
            "typeParameters": [],
            "parameters": [],
            "returnType": {
              "kind": "intrinsic",
              "text": "string",
              "name": "string",
              "target": null,
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/protocol/dist/custom-id.d.ts",
                "line": 12,
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
        "id": 24,
        "name": "toJSON",
        "anchor": "to-json",
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
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 14,
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
            "id": 25,
            "name": "toJSON",
            "comment": null,
            "typeParameters": [],
            "parameters": [],
            "returnType": {
              "kind": "intrinsic",
              "text": "string",
              "name": "string",
              "target": null,
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/protocol/dist/custom-id.d.ts",
                "line": 14,
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
        "id": 22,
        "name": "toString",
        "anchor": "to-string",
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
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 13,
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
            "id": 23,
            "name": "toString",
            "comment": null,
            "typeParameters": [],
            "parameters": [],
            "returnType": {
              "kind": "intrinsic",
              "text": "string",
              "name": "string",
              "target": null,
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/protocol/dist/custom-id.d.ts",
                "line": 13,
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
        "id": 4,
        "name": "fromBytes",
        "anchor": "from-bytes",
        "kind": "Method",
        "kindId": 2048,
        "flags": {
          "static": true,
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
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 7,
            "character": 11,
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
            "id": 5,
            "name": "fromBytes",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 6,
                "name": "value",
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
                  "text": "Uint8Array",
                  "name": "Uint8Array",
                  "target": null,
                  "children": []
                },
                "defaultValue": null,
                "comment": null
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "CustomId",
              "name": "CustomId",
              "target": {
                "id": 1,
                "name": "CustomId",
                "route": "classes/CustomId"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/protocol/dist/custom-id.d.ts",
                "line": 7,
                "character": 11,
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
        "id": 7,
        "name": "fromHexString",
        "anchor": "from-hex-string",
        "kind": "Method",
        "kindId": 2048,
        "flags": {
          "static": true,
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
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 8,
            "character": 11,
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
            "id": 8,
            "name": "fromHexString",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 9,
                "name": "value",
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
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "CustomId",
              "name": "CustomId",
              "target": {
                "id": 1,
                "name": "CustomId",
                "route": "classes/CustomId"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/protocol/dist/custom-id.d.ts",
                "line": 8,
                "character": 11,
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
        "id": 2,
        "name": "generate",
        "anchor": "generate",
        "kind": "Method",
        "kindId": 2048,
        "flags": {
          "static": true,
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
            "fileName": "packages/protocol/dist/custom-id.d.ts",
            "line": 6,
            "character": 11,
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
            "id": 3,
            "name": "generate",
            "comment": null,
            "typeParameters": [],
            "parameters": [],
            "returnType": {
              "kind": "reference",
              "text": "CustomId",
              "name": "CustomId",
              "target": {
                "id": 1,
                "name": "CustomId",
                "route": "classes/CustomId"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/protocol/dist/custom-id.d.ts",
                "line": 6,
                "character": 11,
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
  },
  {
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
  },
  {
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
  },
  {
    "id": 338,
    "name": "SinterClientOptionsError",
    "slug": "SinterClientOptionsError",
    "route": "classes/SinterClientOptionsError",
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
          "text": "A client option or a database or collection name is invalid. Code\n",
          "target": null
        },
        {
          "kind": "code",
          "text": "`INVALID_CLIENT_OPTIONS`",
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
        "SinterError"
      ],
      "extendedBy": [
        "SinterNamespaceError"
      ]
    },
    "sources": [
      {
        "fileName": "packages/driver/dist/errors.d.ts",
        "line": 64,
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
        "id": 348,
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
            "line": 65,
            "character": 4,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": null,
          "overwrites": "constructor",
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [
          {
            "id": 349,
            "name": "SinterClientOptionsError",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 350,
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
                "id": 351,
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
              "text": "SinterClientOptionsError",
              "name": "SinterClientOptionsError",
              "target": {
                "id": 338,
                "name": "SinterClientOptionsError",
                "route": "classes/SinterClientOptionsError"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/errors.d.ts",
                "line": 65,
                "character": 4,
                "url": null
              }
            ],
            "relationships": {
              "inheritedFrom": null,
              "overwrites": "SinterError",
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      },
      {
        "id": 356,
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
        "id": 352,
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
              "text": "A stable identifier for the kind of failure; see ",
              "target": null
            },
            {
              "kind": "inline-tag",
              "text": "SinterErrorCode",
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
          "kind": "reference",
          "text": "SinterErrorCode",
          "name": "SinterErrorCode",
          "target": {
            "id": 510,
            "name": "SinterErrorCode",
            "route": "types/SinterErrorCode"
          },
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 53,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "code",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 354,
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
        "id": 353,
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
        "id": 355,
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
        "id": 347,
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
        "id": 339,
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
            "id": 340,
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
                "id": 341,
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
                "id": 342,
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
        "id": 343,
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
            "id": 344,
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
                "id": 345,
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
                "id": 346,
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
  },
  {
    "id": 357,
    "name": "SinterClientStateError",
    "slug": "SinterClientStateError",
    "route": "classes/SinterClientStateError",
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
          "text": "A command was used in the wrong client state: ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`CLIENT_NOT_CONNECTED`",
          "target": null
        },
        {
          "kind": "text",
          "text": " before\n",
          "target": null
        },
        {
          "kind": "code",
          "text": "`connect()`",
          "target": null
        },
        {
          "kind": "text",
          "text": ", or ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`CLIENT_CLOSED`",
          "target": null
        },
        {
          "kind": "text",
          "text": " after ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`close()`",
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
        "SinterError"
      ],
      "extendedBy": []
    },
    "sources": [
      {
        "fileName": "packages/driver/dist/errors.d.ts",
        "line": 81,
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
        "id": 367,
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
            "line": 82,
            "character": 4,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": null,
          "overwrites": "constructor",
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [
          {
            "id": 368,
            "name": "SinterClientStateError",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 369,
                "name": "code",
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
                  "text": "\"CLIENT_CLOSED\" | \"CLIENT_NOT_CONNECTED\"",
                  "name": null,
                  "target": null,
                  "children": []
                },
                "defaultValue": null,
                "comment": null
              },
              {
                "id": 370,
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
                "id": 371,
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
              "text": "SinterClientStateError",
              "name": "SinterClientStateError",
              "target": {
                "id": 357,
                "name": "SinterClientStateError",
                "route": "classes/SinterClientStateError"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/errors.d.ts",
                "line": 82,
                "character": 4,
                "url": null
              }
            ],
            "relationships": {
              "inheritedFrom": null,
              "overwrites": "SinterError",
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      },
      {
        "id": 376,
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
        "id": 372,
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
              "text": "A stable identifier for the kind of failure; see ",
              "target": null
            },
            {
              "kind": "inline-tag",
              "text": "SinterErrorCode",
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
          "kind": "reference",
          "text": "SinterErrorCode",
          "name": "SinterErrorCode",
          "target": {
            "id": 510,
            "name": "SinterErrorCode",
            "route": "types/SinterErrorCode"
          },
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 53,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "code",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 374,
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
        "id": 373,
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
        "id": 375,
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
        "id": 366,
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
        "id": 358,
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
            "id": 359,
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
                "id": 360,
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
                "id": 361,
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
        "id": 362,
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
            "id": 363,
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
                "id": 364,
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
                "id": 365,
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
  },
  {
    "id": 199,
    "name": "SinterCollection",
    "slug": "SinterCollection",
    "route": "classes/SinterCollection",
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
          "text": "A collection of documents, typed by ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`TDocument`",
          "target": null
        },
        {
          "kind": "text",
          "text": ".\n\nGet one from ",
          "target": null
        },
        {
          "kind": "inline-tag",
          "text": "SinterDatabase.collection",
          "target": null
        },
        {
          "kind": "text",
          "text": ". The type parameter makes\nfilters, updates and results type-checked against your document shape; it\nis not enforced by the server.",
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
        "fileName": "packages/driver/dist/collection.d.ts",
        "line": 63,
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
        "id": 200,
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
        "id": 201,
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 70,
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
            "id": 202,
            "name": "SinterCollection",
            "comment": null,
            "typeParameters": [
              {
                "id": 203,
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
                "id": 204,
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
                "defaultValue": null,
                "comment": {
                  "summary": [
                    {
                      "kind": "text",
                      "text": "The database this collection belongs to.",
                      "target": null
                    }
                  ],
                  "blockTags": []
                }
              },
              {
                "id": 205,
                "name": "name",
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
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "SinterCollection<TDocument>",
              "name": "SinterCollection",
              "target": {
                "id": 199,
                "name": "SinterCollection",
                "route": "classes/SinterCollection"
              },
              "children": [
                {
                  "kind": "reference",
                  "text": "TDocument",
                  "name": "TDocument",
                  "target": {
                    "id": 200,
                    "name": "TDocument",
                    "route": "other/TDocument"
                  },
                  "children": []
                }
              ]
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/collection.d.ts",
                "line": 70,
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
        "id": 206,
        "name": "database",
        "anchor": "database",
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
              "text": "The database this collection belongs to.",
              "target": null
            }
          ],
          "blockTags": []
        },
        "type": {
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
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 65,
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
        "id": 208,
        "name": "name",
        "anchor": "name",
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
              "text": "The collection name.",
              "target": null
            }
          ],
          "blockTags": []
        },
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 69,
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
        "id": 209,
        "name": "namespace",
        "anchor": "namespace",
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 76,
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
        "id": 241,
        "name": "createIndex",
        "anchor": "create-index",
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 140,
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
            "id": 242,
            "name": "createIndex",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Creates an index, or confirms that an identical one exists. The collection\nis created if it does not exist. A unique index fails with a\n",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`DuplicateKey`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": " server error when existing documents already violate it.",
                  "target": null
                }
              ],
              "blockTags": []
            },
            "typeParameters": [],
            "parameters": [
              {
                "id": 243,
                "name": "definition",
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
                  "text": "IndexDefinition<TDocument>",
                  "name": "IndexDefinition",
                  "target": {
                    "id": 678,
                    "name": "IndexDefinition",
                    "route": "interfaces/IndexDefinition"
                  },
                  "children": [
                    {
                      "kind": "reference",
                      "text": "TDocument",
                      "name": "TDocument",
                      "target": {
                        "id": 200,
                        "name": "TDocument",
                        "route": "other/TDocument"
                      },
                      "children": []
                    }
                  ]
                },
                "defaultValue": null,
                "comment": null
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "Promise<CreateIndexResult>",
              "name": "Promise",
              "target": null,
              "children": [
                {
                  "kind": "reference",
                  "text": "CreateIndexResult",
                  "name": "CreateIndexResult",
                  "target": {
                    "id": 660,
                    "name": "CreateIndexResult",
                    "route": "interfaces/CreateIndexResult"
                  },
                  "children": []
                }
              ]
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/collection.d.ts",
                "line": 140,
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
        "id": 223,
        "name": "deleteMany",
        "anchor": "delete-many",
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 106,
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
            "id": 224,
            "name": "deleteMany",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Deletes every document that matches the filter.",
                  "target": null
                }
              ],
              "blockTags": []
            },
            "typeParameters": [],
            "parameters": [
              {
                "id": 225,
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
                  "text": "Filter<TDocument>",
                  "name": "Filter",
                  "target": {
                    "id": 634,
                    "name": "Filter",
                    "route": "types/Filter"
                  },
                  "children": [
                    {
                      "kind": "reference",
                      "text": "TDocument",
                      "name": "TDocument",
                      "target": {
                        "id": 200,
                        "name": "TDocument",
                        "route": "other/TDocument"
                      },
                      "children": []
                    }
                  ]
                },
                "defaultValue": null,
                "comment": null
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "Promise<DeleteResult>",
              "name": "Promise",
              "target": null,
              "children": [
                {
                  "kind": "reference",
                  "text": "DeleteResult",
                  "name": "DeleteResult",
                  "target": {
                    "id": 723,
                    "name": "DeleteResult",
                    "route": "interfaces/DeleteResult"
                  },
                  "children": []
                }
              ]
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/collection.d.ts",
                "line": 106,
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
        "id": 220,
        "name": "deleteOne",
        "anchor": "delete-one",
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 104,
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
            "id": 221,
            "name": "deleteOne",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Deletes the first document that matches the filter.",
                  "target": null
                }
              ],
              "blockTags": []
            },
            "typeParameters": [],
            "parameters": [
              {
                "id": 222,
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
                  "text": "Filter<TDocument>",
                  "name": "Filter",
                  "target": {
                    "id": 634,
                    "name": "Filter",
                    "route": "types/Filter"
                  },
                  "children": [
                    {
                      "kind": "reference",
                      "text": "TDocument",
                      "name": "TDocument",
                      "target": {
                        "id": 200,
                        "name": "TDocument",
                        "route": "other/TDocument"
                      },
                      "children": []
                    }
                  ]
                },
                "defaultValue": null,
                "comment": null
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "Promise<DeleteResult>",
              "name": "Promise",
              "target": null,
              "children": [
                {
                  "kind": "reference",
                  "text": "DeleteResult",
                  "name": "DeleteResult",
                  "target": {
                    "id": 723,
                    "name": "DeleteResult",
                    "route": "interfaces/DeleteResult"
                  },
                  "children": []
                }
              ]
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/collection.d.ts",
                "line": 104,
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
        "id": 244,
        "name": "dropIndex",
        "anchor": "drop-index",
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 142,
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
            "id": 245,
            "name": "dropIndex",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Drops an index by name. The ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`_id`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": " index cannot be dropped.",
                  "target": null
                }
              ],
              "blockTags": []
            },
            "typeParameters": [],
            "parameters": [
              {
                "id": 246,
                "name": "name",
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
              }
            ],
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
                "fileName": "packages/driver/dist/collection.d.ts",
                "line": 142,
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
        "id": 251,
        "name": "find",
        "anchor": "find",
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
            "fileName": "packages/driver/dist/collection.d.ts",
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
            "id": 252,
            "name": "find",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Starts a query and returns a cursor. No request is sent until the cursor\nis read.\n\nThe cursor can be read with ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`next()`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": ", collected with ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`toArray()`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": ", or\niterated with ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`for await`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": ". Always finish or ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`close()`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": " it so the server\ncan release it.",
                  "target": null
                }
              ],
              "blockTags": []
            },
            "typeParameters": [],
            "parameters": [
              {
                "id": 253,
                "name": "filter",
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
                  "text": "Filter<TDocument>",
                  "name": "Filter",
                  "target": {
                    "id": 634,
                    "name": "Filter",
                    "route": "types/Filter"
                  },
                  "children": [
                    {
                      "kind": "reference",
                      "text": "TDocument",
                      "name": "TDocument",
                      "target": {
                        "id": 200,
                        "name": "TDocument",
                        "route": "other/TDocument"
                      },
                      "children": []
                    }
                  ]
                },
                "defaultValue": null,
                "comment": null
              },
              {
                "id": 254,
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
                  "text": "FindOptions<TDocument>",
                  "name": "FindOptions",
                  "target": {
                    "id": 259,
                    "name": "FindOptions",
                    "route": "interfaces/FindOptions"
                  },
                  "children": [
                    {
                      "kind": "reference",
                      "text": "TDocument",
                      "name": "TDocument",
                      "target": {
                        "id": 200,
                        "name": "TDocument",
                        "route": "other/TDocument"
                      },
                      "children": []
                    }
                  ]
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
                    "id": 200,
                    "name": "TDocument",
                    "route": "other/TDocument"
                  },
                  "children": []
                }
              ]
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/collection.d.ts",
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
        "id": 217,
        "name": "findOne",
        "anchor": "find-one",
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 102,
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
            "id": 218,
            "name": "findOne",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Finds the first document that matches the filter, or ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`null`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": ". Without a\nfilter, it returns the first document in the collection.",
                  "target": null
                }
              ],
              "blockTags": []
            },
            "typeParameters": [],
            "parameters": [
              {
                "id": 219,
                "name": "filter",
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
                  "text": "Filter<TDocument>",
                  "name": "Filter",
                  "target": {
                    "id": 634,
                    "name": "Filter",
                    "route": "types/Filter"
                  },
                  "children": [
                    {
                      "kind": "reference",
                      "text": "TDocument",
                      "name": "TDocument",
                      "target": {
                        "id": 200,
                        "name": "TDocument",
                        "route": "other/TDocument"
                      },
                      "children": []
                    }
                  ]
                },
                "defaultValue": null,
                "comment": null
              }
            ],
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
                "fileName": "packages/driver/dist/collection.d.ts",
                "line": 102,
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
        "id": 247,
        "name": "indexes",
        "anchor": "indexes",
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 144,
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
            "id": 248,
            "name": "indexes",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "The ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`_id`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": " index first, then the others in creation order.",
                  "target": null
                }
              ],
              "blockTags": []
            },
            "typeParameters": [],
            "parameters": [],
            "returnType": {
              "kind": "reference",
              "text": "Promise<IndexInfo[]>",
              "name": "Promise",
              "target": null,
              "children": [
                {
                  "kind": "array",
                  "text": "IndexInfo[]",
                  "name": null,
                  "target": null,
                  "children": []
                }
              ]
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/collection.d.ts",
                "line": 144,
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
        "id": 214,
        "name": "insertMany",
        "anchor": "insert-many",
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 97,
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
            "id": 215,
            "name": "insertMany",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Inserts several documents in order.\n\nAn empty array is rejected. If one document fails, the documents before\nit stay inserted, and the thrown ",
                  "target": null
                },
                {
                  "kind": "inline-tag",
                  "text": "SinterInsertManyError",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": " reports\n",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`failedIndex`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": " and the ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`insertedIds`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": " that were committed.",
                  "target": null
                }
              ],
              "blockTags": [
                {
                  "tag": "@returns",
                  "content": [
                    {
                      "kind": "text",
                      "text": "The number of documents inserted and their ",
                      "target": null
                    },
                    {
                      "kind": "code",
                      "text": "`_id`",
                      "target": null
                    },
                    {
                      "kind": "text",
                      "text": " values.",
                      "target": null
                    }
                  ]
                }
              ]
            },
            "typeParameters": [],
            "parameters": [
              {
                "id": 216,
                "name": "documents",
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
                  "kind": "typeOperator",
                  "text": "readonly OptionalId<TDocument>[]",
                  "name": null,
                  "target": null,
                  "children": []
                },
                "defaultValue": null,
                "comment": null
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "Promise<InsertManyResult>",
              "name": "Promise",
              "target": null,
              "children": [
                {
                  "kind": "reference",
                  "text": "InsertManyResult",
                  "name": "InsertManyResult",
                  "target": {
                    "id": 265,
                    "name": "InsertManyResult",
                    "route": "interfaces/InsertManyResult"
                  },
                  "children": []
                }
              ]
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/collection.d.ts",
                "line": 97,
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
        "id": 211,
        "name": "insertOne",
        "anchor": "insert-one",
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 87,
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
            "id": 212,
            "name": "insertOne",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Inserts one document.\n\nThe collection is created if it does not exist. A missing ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`_id`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": " is\ngenerated.",
                  "target": null
                }
              ],
              "blockTags": [
                {
                  "tag": "@returns",
                  "content": [
                    {
                      "kind": "text",
                      "text": "The ",
                      "target": null
                    },
                    {
                      "kind": "code",
                      "text": "`_id`",
                      "target": null
                    },
                    {
                      "kind": "text",
                      "text": " of the inserted document.",
                      "target": null
                    }
                  ]
                },
                {
                  "tag": "@throws",
                  "content": [
                    {
                      "kind": "inline-tag",
                      "text": "SinterServerError",
                      "target": null
                    },
                    {
                      "kind": "text",
                      "text": " with a ",
                      "target": null
                    },
                    {
                      "kind": "code",
                      "text": "`DuplicateKey`",
                      "target": null
                    },
                    {
                      "kind": "text",
                      "text": " name when ",
                      "target": null
                    },
                    {
                      "kind": "code",
                      "text": "`_id`",
                      "target": null
                    },
                    {
                      "kind": "text",
                      "text": "\n  or a unique index value already exists.",
                      "target": null
                    }
                  ]
                }
              ]
            },
            "typeParameters": [],
            "parameters": [
              {
                "id": 213,
                "name": "document",
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
                  "text": "OptionalId<TDocument>",
                  "name": "OptionalId",
                  "target": {
                    "id": 272,
                    "name": "OptionalId",
                    "route": "types/OptionalId"
                  },
                  "children": [
                    {
                      "kind": "reference",
                      "text": "TDocument",
                      "name": "TDocument",
                      "target": {
                        "id": 200,
                        "name": "TDocument",
                        "route": "other/TDocument"
                      },
                      "children": []
                    }
                  ]
                },
                "defaultValue": null,
                "comment": null
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "Promise<InsertOneResult>",
              "name": "Promise",
              "target": null,
              "children": [
                {
                  "kind": "reference",
                  "text": "InsertOneResult",
                  "name": "InsertOneResult",
                  "target": {
                    "id": 269,
                    "name": "InsertOneResult",
                    "route": "interfaces/InsertOneResult"
                  },
                  "children": []
                }
              ]
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/collection.d.ts",
                "line": 87,
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
        "id": 226,
        "name": "replaceOne",
        "anchor": "replace-one",
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 114,
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
            "id": 227,
            "name": "replaceOne",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Replaces the first matching document with ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`replacement`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": ".\n\nThe document keeps its ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`_id`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": ". Giving the replacement a different ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`_id`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": "\nfails with an ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`ImmutableId`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": " server error. With ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`upsert`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": ", a replacement is\ninserted when nothing matches.",
                  "target": null
                }
              ],
              "blockTags": []
            },
            "typeParameters": [],
            "parameters": [
              {
                "id": 228,
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
                  "text": "Filter<TDocument>",
                  "name": "Filter",
                  "target": {
                    "id": 634,
                    "name": "Filter",
                    "route": "types/Filter"
                  },
                  "children": [
                    {
                      "kind": "reference",
                      "text": "TDocument",
                      "name": "TDocument",
                      "target": {
                        "id": 200,
                        "name": "TDocument",
                        "route": "other/TDocument"
                      },
                      "children": []
                    }
                  ]
                },
                "defaultValue": null,
                "comment": null
              },
              {
                "id": 229,
                "name": "replacement",
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
                  "text": "OptionalId<TDocument>",
                  "name": "OptionalId",
                  "target": {
                    "id": 272,
                    "name": "OptionalId",
                    "route": "types/OptionalId"
                  },
                  "children": [
                    {
                      "kind": "reference",
                      "text": "TDocument",
                      "name": "TDocument",
                      "target": {
                        "id": 200,
                        "name": "TDocument",
                        "route": "other/TDocument"
                      },
                      "children": []
                    }
                  ]
                },
                "defaultValue": null,
                "comment": null
              },
              {
                "id": 230,
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
                  "text": "UpdateOptions",
                  "name": "UpdateOptions",
                  "target": {
                    "id": 742,
                    "name": "UpdateOptions",
                    "route": "interfaces/UpdateOptions"
                  },
                  "children": []
                },
                "defaultValue": null,
                "comment": null
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "Promise<UpdateResult>",
              "name": "Promise",
              "target": null,
              "children": [
                {
                  "kind": "reference",
                  "text": "UpdateResult",
                  "name": "UpdateResult",
                  "target": {
                    "id": 746,
                    "name": "UpdateResult",
                    "route": "interfaces/UpdateResult"
                  },
                  "children": []
                }
              ]
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/collection.d.ts",
                "line": 114,
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
        "id": 236,
        "name": "updateMany",
        "anchor": "update-many",
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 134,
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
            "id": 237,
            "name": "updateMany",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Applies an update to every matching document.\n\nWith ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`upsert`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": ", a document seeded from the equality terms of the filter is\ninserted, updated, and reported in ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`upsertedId`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": " when nothing matches.",
                  "target": null
                }
              ],
              "blockTags": [
                {
                  "tag": "@returns",
                  "content": [
                    {
                      "kind": "code",
                      "text": "`modifiedCount`",
                      "target": null
                    },
                    {
                      "kind": "text",
                      "text": " counts only documents whose stored bytes\n  actually changed.",
                      "target": null
                    }
                  ]
                }
              ]
            },
            "typeParameters": [],
            "parameters": [
              {
                "id": 238,
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
                  "text": "Filter<TDocument>",
                  "name": "Filter",
                  "target": {
                    "id": 634,
                    "name": "Filter",
                    "route": "types/Filter"
                  },
                  "children": [
                    {
                      "kind": "reference",
                      "text": "TDocument",
                      "name": "TDocument",
                      "target": {
                        "id": 200,
                        "name": "TDocument",
                        "route": "other/TDocument"
                      },
                      "children": []
                    }
                  ]
                },
                "defaultValue": null,
                "comment": null
              },
              {
                "id": 239,
                "name": "update",
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
                  "text": "UpdateFilter<TDocument>",
                  "name": "UpdateFilter",
                  "target": {
                    "id": 731,
                    "name": "UpdateFilter",
                    "route": "types/UpdateFilter"
                  },
                  "children": [
                    {
                      "kind": "reference",
                      "text": "TDocument",
                      "name": "TDocument",
                      "target": {
                        "id": 200,
                        "name": "TDocument",
                        "route": "other/TDocument"
                      },
                      "children": []
                    }
                  ]
                },
                "defaultValue": null,
                "comment": null
              },
              {
                "id": 240,
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
                  "text": "UpdateOptions",
                  "name": "UpdateOptions",
                  "target": {
                    "id": 742,
                    "name": "UpdateOptions",
                    "route": "interfaces/UpdateOptions"
                  },
                  "children": []
                },
                "defaultValue": null,
                "comment": null
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "Promise<UpdateResult>",
              "name": "Promise",
              "target": null,
              "children": [
                {
                  "kind": "reference",
                  "text": "UpdateResult",
                  "name": "UpdateResult",
                  "target": {
                    "id": 746,
                    "name": "UpdateResult",
                    "route": "interfaces/UpdateResult"
                  },
                  "children": []
                }
              ]
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/collection.d.ts",
                "line": 134,
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
        "id": 231,
        "name": "updateOne",
        "anchor": "update-one",
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 124,
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
            "id": 232,
            "name": "updateOne",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Applies an update to the first matching document.\n\nWith ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`upsert`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": ", a document seeded from the equality terms of the filter is\ninserted, updated, and reported in ",
                  "target": null
                },
                {
                  "kind": "code",
                  "text": "`upsertedId`",
                  "target": null
                },
                {
                  "kind": "text",
                  "text": " when nothing matches.",
                  "target": null
                }
              ],
              "blockTags": [
                {
                  "tag": "@returns",
                  "content": [
                    {
                      "kind": "code",
                      "text": "`modifiedCount`",
                      "target": null
                    },
                    {
                      "kind": "text",
                      "text": " counts only documents whose stored bytes\n  actually changed.",
                      "target": null
                    }
                  ]
                }
              ]
            },
            "typeParameters": [],
            "parameters": [
              {
                "id": 233,
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
                  "text": "Filter<TDocument>",
                  "name": "Filter",
                  "target": {
                    "id": 634,
                    "name": "Filter",
                    "route": "types/Filter"
                  },
                  "children": [
                    {
                      "kind": "reference",
                      "text": "TDocument",
                      "name": "TDocument",
                      "target": {
                        "id": 200,
                        "name": "TDocument",
                        "route": "other/TDocument"
                      },
                      "children": []
                    }
                  ]
                },
                "defaultValue": null,
                "comment": null
              },
              {
                "id": 234,
                "name": "update",
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
                  "text": "UpdateFilter<TDocument>",
                  "name": "UpdateFilter",
                  "target": {
                    "id": 731,
                    "name": "UpdateFilter",
                    "route": "types/UpdateFilter"
                  },
                  "children": [
                    {
                      "kind": "reference",
                      "text": "TDocument",
                      "name": "TDocument",
                      "target": {
                        "id": 200,
                        "name": "TDocument",
                        "route": "other/TDocument"
                      },
                      "children": []
                    }
                  ]
                },
                "defaultValue": null,
                "comment": null
              },
              {
                "id": 235,
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
                  "text": "UpdateOptions",
                  "name": "UpdateOptions",
                  "target": {
                    "id": 742,
                    "name": "UpdateOptions",
                    "route": "interfaces/UpdateOptions"
                  },
                  "children": []
                },
                "defaultValue": null,
                "comment": null
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "Promise<UpdateResult>",
              "name": "Promise",
              "target": null,
              "children": [
                {
                  "kind": "reference",
                  "text": "UpdateResult",
                  "name": "UpdateResult",
                  "target": {
                    "id": 746,
                    "name": "UpdateResult",
                    "route": "interfaces/UpdateResult"
                  },
                  "children": []
                }
              ]
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/collection.d.ts",
                "line": 124,
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
        "id": 249,
        "name": "validateIndexes",
        "anchor": "validate-indexes",
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
            "fileName": "packages/driver/dist/collection.d.ts",
            "line": 146,
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
            "id": 250,
            "name": "validateIndexes",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Asks the server to rebuild every index and report any difference.",
                  "target": null
                }
              ],
              "blockTags": []
            },
            "typeParameters": [],
            "parameters": [],
            "returnType": {
              "kind": "reference",
              "text": "Promise<IndexValidationResult>",
              "name": "Promise",
              "target": null,
              "children": [
                {
                  "kind": "reference",
                  "text": "IndexValidationResult",
                  "name": "IndexValidationResult",
                  "target": {
                    "id": 695,
                    "name": "IndexValidationResult",
                    "route": "interfaces/IndexValidationResult"
                  },
                  "children": []
                }
              ]
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/collection.d.ts",
                "line": 146,
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
  },
  {
    "id": 377,
    "name": "SinterCompatibilityError",
    "slug": "SinterCompatibilityError",
    "route": "classes/SinterCompatibilityError",
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
          "text": "The server does not speak a compatible protocol version. Code\n",
          "target": null
        },
        {
          "kind": "code",
          "text": "`INCOMPATIBLE_PROTOCOL`",
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
        "SinterServerError"
      ],
      "extendedBy": []
    },
    "sources": [
      {
        "fileName": "packages/driver/dist/errors.d.ts",
        "line": 151,
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
        "id": 387,
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
            "line": 134,
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
            "id": 388,
            "name": "SinterCompatibilityError",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 389,
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
                "id": 390,
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
                  "text": "SinterServerErrorOptions",
                  "name": "SinterServerErrorOptions",
                  "target": {
                    "id": 617,
                    "name": "SinterServerErrorOptions",
                    "route": "interfaces/SinterServerErrorOptions"
                  },
                  "children": []
                },
                "defaultValue": null,
                "comment": null
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "SinterCompatibilityError",
              "name": "SinterCompatibilityError",
              "target": {
                "id": 377,
                "name": "SinterCompatibilityError",
                "route": "classes/SinterCompatibilityError"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/errors.d.ts",
                "line": 134,
                "character": 4,
                "url": null
              }
            ],
            "relationships": {
              "inheritedFrom": "SinterServerError",
              "overwrites": null,
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      },
      {
        "id": 399,
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
        "id": 391,
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
              "text": "`INCOMPATIBLE_PROTOCOL`",
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
          "text": "\"INCOMPATIBLE_PROTOCOL\"",
          "name": null,
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 153,
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
        "id": 395,
        "name": "details",
        "anchor": "details",
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
              "text": "Extra structured information from the server, if any.",
              "target": null
            }
          ],
          "blockTags": []
        },
        "type": {
          "kind": "union",
          "text": "Document | undefined",
          "name": null,
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 133,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "details",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 397,
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
        "id": 396,
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
        "id": 394,
        "name": "retryable",
        "anchor": "retryable",
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
              "text": "Whether the server says the same request may succeed if retried. ",
              "target": null
            },
            {
              "kind": "code",
              "text": "`false`",
              "target": null
            },
            {
              "kind": "text",
              "text": "\nunless stated.",
              "target": null
            }
          ],
          "blockTags": []
        },
        "type": {
          "kind": "intrinsic",
          "text": "boolean",
          "name": "boolean",
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 131,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "retryable",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 393,
        "name": "serverErrorName",
        "anchor": "server-error-name",
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
              "text": "The server's name for the error, such as ",
              "target": null
            },
            {
              "kind": "code",
              "text": "`DuplicateKey`",
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
          "kind": "union",
          "text": "string | undefined",
          "name": null,
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 126,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "serverErrorName",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 398,
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
        "id": 392,
        "name": "wireCode",
        "anchor": "wire-code",
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
              "text": "The numeric error code from the wire protocol, if the server sent one.",
              "target": null
            }
          ],
          "blockTags": []
        },
        "type": {
          "kind": "union",
          "text": "number | undefined",
          "name": null,
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 124,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "wireCode",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 386,
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
        "id": 378,
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
            "id": 379,
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
                "id": 380,
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
                "id": 381,
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
        "id": 382,
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
            "id": 383,
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
                "id": 384,
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
                "id": 385,
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
  },
  {
    "id": 400,
    "name": "SinterConnectionError",
    "slug": "SinterConnectionError",
    "route": "classes/SinterConnectionError",
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
          "text": "The connection could not be established or was lost. Code\n",
          "target": null
        },
        {
          "kind": "code",
          "text": "`CONNECTION_FAILED`",
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
        "SinterError"
      ],
      "extendedBy": [
        "SinterConnectionTimeoutError",
        "SinterSocketTimeoutError"
      ]
    },
    "sources": [
      {
        "fileName": "packages/driver/dist/errors.d.ts",
        "line": 88,
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
        "id": 410,
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
          "inheritedFrom": null,
          "overwrites": "constructor",
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [
          {
            "id": 411,
            "name": "SinterConnectionError",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 412,
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
                "id": 413,
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
              "text": "SinterConnectionError",
              "name": "SinterConnectionError",
              "target": {
                "id": 400,
                "name": "SinterConnectionError",
                "route": "classes/SinterConnectionError"
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
              "inheritedFrom": null,
              "overwrites": "SinterError",
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      },
      {
        "id": 418,
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
        "id": 414,
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
              "text": "A stable identifier for the kind of failure; see ",
              "target": null
            },
            {
              "kind": "inline-tag",
              "text": "SinterErrorCode",
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
          "kind": "reference",
          "text": "SinterErrorCode",
          "name": "SinterErrorCode",
          "target": {
            "id": 510,
            "name": "SinterErrorCode",
            "route": "types/SinterErrorCode"
          },
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 53,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "code",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 416,
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
        "id": 415,
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
        "id": 417,
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
        "id": 409,
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
        "id": 401,
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
            "id": 402,
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
                "id": 403,
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
                "id": 404,
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
        "id": 405,
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
            "id": 406,
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
                "id": 407,
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
                "id": 408,
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
  },
  {
    "id": 419,
    "name": "SinterConnectionStringError",
    "slug": "SinterConnectionStringError",
    "route": "classes/SinterConnectionStringError",
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
          "text": "The connection string is malformed. Code ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`INVALID_CONNECTION_STRING`",
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
        "SinterError"
      ],
      "extendedBy": []
    },
    "sources": [
      {
        "fileName": "packages/driver/dist/errors.d.ts",
        "line": 57,
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
        "id": 429,
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
            "line": 58,
            "character": 4,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": null,
          "overwrites": "constructor",
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [
          {
            "id": 430,
            "name": "SinterConnectionStringError",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 431,
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
                "id": 432,
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
              "text": "SinterConnectionStringError",
              "name": "SinterConnectionStringError",
              "target": {
                "id": 419,
                "name": "SinterConnectionStringError",
                "route": "classes/SinterConnectionStringError"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/errors.d.ts",
                "line": 58,
                "character": 4,
                "url": null
              }
            ],
            "relationships": {
              "inheritedFrom": null,
              "overwrites": "SinterError",
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      },
      {
        "id": 437,
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
        "id": 433,
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
              "text": "A stable identifier for the kind of failure; see ",
              "target": null
            },
            {
              "kind": "inline-tag",
              "text": "SinterErrorCode",
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
          "kind": "reference",
          "text": "SinterErrorCode",
          "name": "SinterErrorCode",
          "target": {
            "id": 510,
            "name": "SinterErrorCode",
            "route": "types/SinterErrorCode"
          },
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 53,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "code",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 435,
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
        "id": 434,
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
        "id": 436,
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
        "id": 428,
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
        "id": 420,
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
            "id": 421,
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
                "id": 422,
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
                "id": 423,
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
        "id": 424,
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
            "id": 425,
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
                "id": 426,
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
                "id": 427,
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
  },
  {
    "id": 438,
    "name": "SinterConnectionTimeoutError",
    "slug": "SinterConnectionTimeoutError",
    "route": "classes/SinterConnectionTimeoutError",
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
          "text": "Connecting took longer than ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`connectTimeoutMS`",
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
        "line": 92,
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
        "id": 448,
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
            "id": 449,
            "name": "SinterConnectionTimeoutError",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 450,
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
                "id": 451,
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
              "text": "SinterConnectionTimeoutError",
              "name": "SinterConnectionTimeoutError",
              "target": {
                "id": 438,
                "name": "SinterConnectionTimeoutError",
                "route": "classes/SinterConnectionTimeoutError"
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
        "id": 456,
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
        "id": 452,
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
              "text": "`CONNECTION_TIMEOUT`",
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
          "text": "\"CONNECTION_TIMEOUT\"",
          "name": null,
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 94,
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
        "id": 454,
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
        "id": 453,
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
        "id": 455,
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
        "id": 447,
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
        "id": 439,
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
            "id": 440,
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
                "id": 441,
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
                "id": 442,
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
        "id": 443,
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
            "id": 444,
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
                "id": 445,
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
                "id": 446,
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
  },
  {
    "id": 325,
    "name": "SinterDatabase",
    "slug": "SinterDatabase",
    "route": "classes/SinterDatabase",
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
          "text": "A handle to a database on a server.\n\nGet one from ",
          "target": null
        },
        {
          "kind": "inline-tag",
          "text": "SinterClient.db",
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
      "extends": [],
      "extendedBy": []
    },
    "sources": [
      {
        "fileName": "packages/driver/dist/database.d.ts",
        "line": 9,
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
        "id": 326,
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
            "fileName": "packages/driver/dist/database.d.ts",
            "line": 14,
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
            "id": 327,
            "name": "SinterDatabase",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 328,
                "name": "client",
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
                  "text": "SinterClient",
                  "name": "SinterClient",
                  "target": {
                    "id": 32,
                    "name": "SinterClient",
                    "route": "classes/SinterClient"
                  },
                  "children": []
                },
                "defaultValue": null,
                "comment": {
                  "summary": [
                    {
                      "kind": "text",
                      "text": "The client this database belongs to.",
                      "target": null
                    }
                  ],
                  "blockTags": []
                }
              },
              {
                "id": 329,
                "name": "name",
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
                "fileName": "packages/driver/dist/database.d.ts",
                "line": 14,
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
        "id": 330,
        "name": "client",
        "anchor": "client",
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
              "text": "The client this database belongs to.",
              "target": null
            }
          ],
          "blockTags": []
        },
        "type": {
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
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/database.d.ts",
            "line": 11,
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
        "id": 331,
        "name": "name",
        "anchor": "name",
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
              "text": "The database name.",
              "target": null
            }
          ],
          "blockTags": []
        },
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
            "fileName": "packages/driver/dist/database.d.ts",
            "line": 13,
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
        "id": 332,
        "name": "collection",
        "anchor": "collection",
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
            "fileName": "packages/driver/dist/database.d.ts",
            "line": 25,
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
            "id": 333,
            "name": "collection",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Returns a handle to a collection. No request is sent; the collection is\ncreated by the first write.",
                  "target": null
                }
              ],
              "blockTags": []
            },
            "typeParameters": [
              {
                "id": 334,
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
                "comment": {
                  "summary": [
                    {
                      "kind": "text",
                      "text": "The shape of the documents, used for\n  type-checking.",
                      "target": null
                    }
                  ],
                  "blockTags": []
                }
              }
            ],
            "parameters": [
              {
                "id": 335,
                "name": "name",
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
                      "text": "The collection name.",
                      "target": null
                    }
                  ],
                  "blockTags": []
                }
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "SinterCollection<TDocument>",
              "name": "SinterCollection",
              "target": {
                "id": 199,
                "name": "SinterCollection",
                "route": "classes/SinterCollection"
              },
              "children": [
                {
                  "kind": "reference",
                  "text": "TDocument",
                  "name": "TDocument",
                  "target": {
                    "id": 334,
                    "name": "TDocument",
                    "route": "other/TDocument"
                  },
                  "children": []
                }
              ]
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/database.d.ts",
                "line": 25,
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
        "id": 336,
        "name": "listCollections",
        "anchor": "list-collections",
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
            "fileName": "packages/driver/dist/database.d.ts",
            "line": 27,
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
            "id": 337,
            "name": "listCollections",
            "comment": {
              "summary": [
                {
                  "kind": "text",
                  "text": "Lists the names of the collections in this database.",
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
                "fileName": "packages/driver/dist/database.d.ts",
                "line": 27,
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
  },
  {
    "id": 457,
    "name": "SinterDocumentError",
    "slug": "SinterDocumentError",
    "route": "classes/SinterDocumentError",
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
          "text": "A request could not be encoded, so nothing was sent and the connection is\nunaffected. The usual causes are a value the database cannot store (such as\n",
          "target": null
        },
        {
          "kind": "code",
          "text": "`undefined`",
          "target": null
        },
        {
          "kind": "text",
          "text": ", a function, or a class instance like ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`Map`",
          "target": null
        },
        {
          "kind": "text",
          "text": "), a document nested\nmore than 100 levels deep, or a request larger than 16 MiB. The ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`cause`",
          "target": null
        },
        {
          "kind": "text",
          "text": " says\nwhich. Code ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`INVALID_DOCUMENT`",
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
        "SinterError"
      ],
      "extendedBy": []
    },
    "sources": [
      {
        "fileName": "packages/driver/dist/errors.d.ts",
        "line": 74,
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
        "id": 467,
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
            "line": 75,
            "character": 4,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": null,
          "overwrites": "constructor",
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [
          {
            "id": 468,
            "name": "SinterDocumentError",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 469,
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
                "id": 470,
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
              "text": "SinterDocumentError",
              "name": "SinterDocumentError",
              "target": {
                "id": 457,
                "name": "SinterDocumentError",
                "route": "classes/SinterDocumentError"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/errors.d.ts",
                "line": 75,
                "character": 4,
                "url": null
              }
            ],
            "relationships": {
              "inheritedFrom": null,
              "overwrites": "SinterError",
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      },
      {
        "id": 475,
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
        "id": 471,
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
              "text": "A stable identifier for the kind of failure; see ",
              "target": null
            },
            {
              "kind": "inline-tag",
              "text": "SinterErrorCode",
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
          "kind": "reference",
          "text": "SinterErrorCode",
          "name": "SinterErrorCode",
          "target": {
            "id": 510,
            "name": "SinterErrorCode",
            "route": "types/SinterErrorCode"
          },
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 53,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "code",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 473,
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
        "id": 472,
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
        "id": 474,
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
        "id": 466,
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
        "id": 458,
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
            "id": 459,
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
                "id": 460,
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
                "id": 461,
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
        "id": 462,
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
            "id": 463,
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
                "id": 464,
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
                "id": 465,
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
  },
  {
    "id": 476,
    "name": "SinterError",
    "slug": "SinterError",
    "route": "classes/SinterError",
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
          "text": "The base class of every error the driver throws on its own. Check ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`code`",
          "target": null
        },
        {
          "kind": "text",
          "text": " to\ntell them apart.",
          "target": null
        }
      ],
      "blockTags": []
    },
    "type": null,
    "hierarchy": {
      "extends": [
        "Error"
      ],
      "extendedBy": [
        "SinterClientOptionsError",
        "SinterClientStateError",
        "SinterConnectionError",
        "SinterConnectionStringError",
        "SinterDocumentError",
        "SinterProtocolError",
        "SinterRequestTimeoutError",
        "SinterServerError"
      ]
    },
    "sources": [
      {
        "fileName": "packages/driver/dist/errors.d.ts",
        "line": 49,
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
        "id": 486,
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
            "line": 54,
            "character": 4,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": null,
          "overwrites": "Error.constructor",
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [
          {
            "id": 487,
            "name": "SinterError",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 488,
                "name": "code",
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
                  "text": "SinterErrorCode",
                  "name": "SinterErrorCode",
                  "target": {
                    "id": 510,
                    "name": "SinterErrorCode",
                    "route": "types/SinterErrorCode"
                  },
                  "children": []
                },
                "defaultValue": null,
                "comment": null
              },
              {
                "id": 489,
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
                "id": 490,
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
              "text": "SinterError",
              "name": "SinterError",
              "target": {
                "id": 476,
                "name": "SinterError",
                "route": "classes/SinterError"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/errors.d.ts",
                "line": 54,
                "character": 4,
                "url": null
              }
            ],
            "relationships": {
              "inheritedFrom": null,
              "overwrites": "Error.constructor",
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      },
      {
        "id": 495,
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
          "inheritedFrom": "Error.cause",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 491,
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
              "text": "A stable identifier for the kind of failure; see ",
              "target": null
            },
            {
              "kind": "inline-tag",
              "text": "SinterErrorCode",
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
          "kind": "reference",
          "text": "SinterErrorCode",
          "name": "SinterErrorCode",
          "target": {
            "id": 510,
            "name": "SinterErrorCode",
            "route": "types/SinterErrorCode"
          },
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 53,
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
        "id": 493,
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
          "inheritedFrom": "Error.message",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 492,
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
          "inheritedFrom": "Error.name",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 494,
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
          "inheritedFrom": "Error.stack",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 485,
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
          "inheritedFrom": "Error.stackTraceLimit",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 477,
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
          "inheritedFrom": "Error.captureStackTrace",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [
          {
            "id": 478,
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
                "id": 479,
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
                "id": 480,
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
              "inheritedFrom": "Error.captureStackTrace",
              "overwrites": null,
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      },
      {
        "id": 481,
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
          "inheritedFrom": "Error.prepareStackTrace",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [
          {
            "id": 482,
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
                "id": 483,
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
                "id": 484,
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
              "inheritedFrom": "Error.prepareStackTrace",
              "overwrites": null,
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      }
    ],
    "typeDeclaration": []
  },
  {
    "id": 511,
    "name": "SinterInsertManyError",
    "slug": "SinterInsertManyError",
    "route": "classes/SinterInsertManyError",
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
          "kind": "code",
          "text": "`insertMany`",
          "target": null
        },
        {
          "kind": "text",
          "text": " failed partway. The documents before ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`failedIndex`",
          "target": null
        },
        {
          "kind": "text",
          "text": " were\ninserted and stay committed.",
          "target": null
        }
      ],
      "blockTags": []
    },
    "type": null,
    "hierarchy": {
      "extends": [
        "SinterServerError"
      ],
      "extendedBy": []
    },
    "sources": [
      {
        "fileName": "packages/driver/dist/errors.d.ts",
        "line": 140,
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
        "id": 521,
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
            "line": 145,
            "character": 4,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": null,
          "overwrites": "constructor",
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [
          {
            "id": 522,
            "name": "SinterInsertManyError",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 523,
                "name": "serverError",
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
                  "text": "SinterServerError",
                  "name": "SinterServerError",
                  "target": {
                    "id": 575,
                    "name": "SinterServerError",
                    "route": "classes/SinterServerError"
                  },
                  "children": []
                },
                "defaultValue": null,
                "comment": null
              },
              {
                "id": 524,
                "name": "failedIndex",
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
                  "text": "number",
                  "name": "number",
                  "target": null,
                  "children": []
                },
                "defaultValue": null,
                "comment": null
              },
              {
                "id": 525,
                "name": "insertedIds",
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
                  "kind": "typeOperator",
                  "text": "readonly CustomId[]",
                  "name": null,
                  "target": null,
                  "children": []
                },
                "defaultValue": null,
                "comment": null
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "SinterInsertManyError",
              "name": "SinterInsertManyError",
              "target": {
                "id": 511,
                "name": "SinterInsertManyError",
                "route": "classes/SinterInsertManyError"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/errors.d.ts",
                "line": 145,
                "character": 4,
                "url": null
              }
            ],
            "relationships": {
              "inheritedFrom": null,
              "overwrites": "SinterServerError",
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      },
      {
        "id": 536,
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
        "id": 532,
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
              "text": "A stable identifier for the kind of failure; see ",
              "target": null
            },
            {
              "kind": "inline-tag",
              "text": "SinterErrorCode",
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
          "kind": "reference",
          "text": "SinterErrorCode",
          "name": "SinterErrorCode",
          "target": {
            "id": 510,
            "name": "SinterErrorCode",
            "route": "types/SinterErrorCode"
          },
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 53,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "code",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 531,
        "name": "details",
        "anchor": "details",
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
              "text": "Extra structured information from the server, if any.",
              "target": null
            }
          ],
          "blockTags": []
        },
        "type": {
          "kind": "union",
          "text": "Document | undefined",
          "name": null,
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 133,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "details",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 526,
        "name": "failedIndex",
        "anchor": "failed-index",
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
              "text": "The position, in the input array, of the document that failed.",
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
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 142,
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
        "id": 527,
        "name": "insertedIds",
        "anchor": "inserted-ids",
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
              "text": "The ",
              "target": null
            },
            {
              "kind": "code",
              "text": "`_id`",
              "target": null
            },
            {
              "kind": "text",
              "text": " of every document that was inserted before the failure.",
              "target": null
            }
          ],
          "blockTags": []
        },
        "type": {
          "kind": "typeOperator",
          "text": "readonly CustomId[]",
          "name": null,
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 144,
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
        "id": 534,
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
        "id": 533,
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
        "id": 530,
        "name": "retryable",
        "anchor": "retryable",
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
              "text": "Whether the server says the same request may succeed if retried. ",
              "target": null
            },
            {
              "kind": "code",
              "text": "`false`",
              "target": null
            },
            {
              "kind": "text",
              "text": "\nunless stated.",
              "target": null
            }
          ],
          "blockTags": []
        },
        "type": {
          "kind": "intrinsic",
          "text": "boolean",
          "name": "boolean",
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 131,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "retryable",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 529,
        "name": "serverErrorName",
        "anchor": "server-error-name",
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
              "text": "The server's name for the error, such as ",
              "target": null
            },
            {
              "kind": "code",
              "text": "`DuplicateKey`",
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
          "kind": "union",
          "text": "string | undefined",
          "name": null,
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 126,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "serverErrorName",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 535,
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
        "id": 528,
        "name": "wireCode",
        "anchor": "wire-code",
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
              "text": "The numeric error code from the wire protocol, if the server sent one.",
              "target": null
            }
          ],
          "blockTags": []
        },
        "type": {
          "kind": "union",
          "text": "number | undefined",
          "name": null,
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 124,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "wireCode",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 520,
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
        "id": 512,
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
            "id": 513,
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
                "id": 514,
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
                "id": 515,
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
        "id": 516,
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
            "id": 517,
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
                "id": 518,
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
                "id": 519,
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
  },
  {
    "id": 700,
    "name": "SinterNamespaceError",
    "slug": "SinterNamespaceError",
    "route": "classes/SinterNamespaceError",
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
          "text": "A database or collection name is invalid: empty, or containing forbidden\ncharacters. Code ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`INVALID_CLIENT_OPTIONS`",
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
        "SinterClientOptionsError"
      ],
      "extendedBy": []
    },
    "sources": [
      {
        "fileName": "packages/driver/dist/namespace.d.ts",
        "line": 6,
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
        "id": 710,
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
            "line": 65,
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
            "id": 711,
            "name": "SinterNamespaceError",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 712,
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
                "id": 713,
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
              "text": "SinterNamespaceError",
              "name": "SinterNamespaceError",
              "target": {
                "id": 700,
                "name": "SinterNamespaceError",
                "route": "classes/SinterNamespaceError"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/errors.d.ts",
                "line": 65,
                "character": 4,
                "url": null
              }
            ],
            "relationships": {
              "inheritedFrom": "SinterClientOptionsError",
              "overwrites": null,
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      },
      {
        "id": 718,
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
        "id": 714,
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
              "text": "A stable identifier for the kind of failure; see ",
              "target": null
            },
            {
              "kind": "inline-tag",
              "text": "SinterErrorCode",
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
          "kind": "reference",
          "text": "SinterErrorCode",
          "name": "SinterErrorCode",
          "target": {
            "id": 510,
            "name": "SinterErrorCode",
            "route": "types/SinterErrorCode"
          },
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 53,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "code",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 716,
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
        "id": 715,
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
        "id": 717,
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
        "id": 709,
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
        "id": 701,
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
            "id": 702,
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
                "id": 703,
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
                "id": 704,
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
        "id": 705,
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
            "id": 706,
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
                "id": 707,
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
                "id": 708,
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
  },
  {
    "id": 537,
    "name": "SinterProtocolError",
    "slug": "SinterProtocolError",
    "route": "classes/SinterProtocolError",
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
          "text": "The server sent something the driver cannot interpret. Code\n",
          "target": null
        },
        {
          "kind": "code",
          "text": "`PROTOCOL_VIOLATION`",
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
        "SinterError"
      ],
      "extendedBy": []
    },
    "sources": [
      {
        "fileName": "packages/driver/dist/errors.d.ts",
        "line": 112,
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
        "id": 547,
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
            "line": 113,
            "character": 4,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": null,
          "overwrites": "constructor",
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [
          {
            "id": 548,
            "name": "SinterProtocolError",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 549,
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
                "id": 550,
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
              "text": "SinterProtocolError",
              "name": "SinterProtocolError",
              "target": {
                "id": 537,
                "name": "SinterProtocolError",
                "route": "classes/SinterProtocolError"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/errors.d.ts",
                "line": 113,
                "character": 4,
                "url": null
              }
            ],
            "relationships": {
              "inheritedFrom": null,
              "overwrites": "SinterError",
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      },
      {
        "id": 555,
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
        "id": 551,
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
              "text": "A stable identifier for the kind of failure; see ",
              "target": null
            },
            {
              "kind": "inline-tag",
              "text": "SinterErrorCode",
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
          "kind": "reference",
          "text": "SinterErrorCode",
          "name": "SinterErrorCode",
          "target": {
            "id": 510,
            "name": "SinterErrorCode",
            "route": "types/SinterErrorCode"
          },
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 53,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "code",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 553,
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
        "id": 552,
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
        "id": 554,
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
        "id": 546,
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
        "id": 538,
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
            "id": 539,
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
                "id": 540,
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
                "id": 541,
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
        "id": 542,
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
            "id": 543,
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
                "id": 544,
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
                "id": 545,
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
  },
  {
    "id": 556,
    "name": "SinterRequestTimeoutError",
    "slug": "SinterRequestTimeoutError",
    "route": "classes/SinterRequestTimeoutError",
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
          "text": "A request got no response within ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`requestTimeoutMS`",
          "target": null
        },
        {
          "kind": "text",
          "text": ". The request may still\nhave run on the server. Code ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`REQUEST_TIMEOUT`",
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
        "SinterError"
      ],
      "extendedBy": []
    },
    "sources": [
      {
        "fileName": "packages/driver/dist/errors.d.ts",
        "line": 105,
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
        "id": 566,
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
            "line": 106,
            "character": 4,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": null,
          "overwrites": "constructor",
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [
          {
            "id": 567,
            "name": "SinterRequestTimeoutError",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 568,
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
                "id": 569,
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
              "text": "SinterRequestTimeoutError",
              "name": "SinterRequestTimeoutError",
              "target": {
                "id": 556,
                "name": "SinterRequestTimeoutError",
                "route": "classes/SinterRequestTimeoutError"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/errors.d.ts",
                "line": 106,
                "character": 4,
                "url": null
              }
            ],
            "relationships": {
              "inheritedFrom": null,
              "overwrites": "SinterError",
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      },
      {
        "id": 574,
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
        "id": 570,
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
              "text": "A stable identifier for the kind of failure; see ",
              "target": null
            },
            {
              "kind": "inline-tag",
              "text": "SinterErrorCode",
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
          "kind": "reference",
          "text": "SinterErrorCode",
          "name": "SinterErrorCode",
          "target": {
            "id": 510,
            "name": "SinterErrorCode",
            "route": "types/SinterErrorCode"
          },
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 53,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "code",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 572,
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
        "id": 571,
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
        "id": 573,
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
        "id": 565,
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
        "id": 557,
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
            "id": 558,
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
                "id": 559,
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
                "id": 560,
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
        "id": 561,
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
            "id": 562,
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
                "id": 563,
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
                "id": 564,
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
  },
  {
    "id": 575,
    "name": "SinterServerError",
    "slug": "SinterServerError",
    "route": "classes/SinterServerError",
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
          "text": "The server rejected a request. Code ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`SERVER_ERROR`",
          "target": null
        },
        {
          "kind": "text",
          "text": ".\n\nUse ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`serverErrorName`",
          "target": null
        },
        {
          "kind": "text",
          "text": " to tell failures apart, such as ",
          "target": null
        },
        {
          "kind": "code",
          "text": "`DuplicateKey`",
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
        "SinterError"
      ],
      "extendedBy": [
        "SinterCompatibilityError",
        "SinterInsertManyError"
      ]
    },
    "sources": [
      {
        "fileName": "packages/driver/dist/errors.d.ts",
        "line": 120,
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
        "id": 585,
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
            "line": 134,
            "character": 4,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": null,
          "overwrites": "constructor",
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [
          {
            "id": 586,
            "name": "SinterServerError",
            "comment": null,
            "typeParameters": [],
            "parameters": [
              {
                "id": 587,
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
                "id": 588,
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
                  "text": "SinterServerErrorOptions",
                  "name": "SinterServerErrorOptions",
                  "target": {
                    "id": 617,
                    "name": "SinterServerErrorOptions",
                    "route": "interfaces/SinterServerErrorOptions"
                  },
                  "children": []
                },
                "defaultValue": null,
                "comment": null
              }
            ],
            "returnType": {
              "kind": "reference",
              "text": "SinterServerError",
              "name": "SinterServerError",
              "target": {
                "id": 575,
                "name": "SinterServerError",
                "route": "classes/SinterServerError"
              },
              "children": []
            },
            "sources": [
              {
                "fileName": "packages/driver/dist/errors.d.ts",
                "line": 134,
                "character": 4,
                "url": null
              }
            ],
            "relationships": {
              "inheritedFrom": null,
              "overwrites": "SinterError",
              "implementationOf": null
            }
          }
        ],
        "typeDeclaration": []
      },
      {
        "id": 597,
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
        "id": 593,
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
              "text": "A stable identifier for the kind of failure; see ",
              "target": null
            },
            {
              "kind": "inline-tag",
              "text": "SinterErrorCode",
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
          "kind": "reference",
          "text": "SinterErrorCode",
          "name": "SinterErrorCode",
          "target": {
            "id": 510,
            "name": "SinterErrorCode",
            "route": "types/SinterErrorCode"
          },
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 53,
            "character": 13,
            "url": null
          }
        ],
        "relationships": {
          "inheritedFrom": "code",
          "overwrites": null,
          "implementationOf": null
        },
        "typeParameters": [],
        "signatures": [],
        "typeDeclaration": []
      },
      {
        "id": 592,
        "name": "details",
        "anchor": "details",
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
              "text": "Extra structured information from the server, if any.",
              "target": null
            }
          ],
          "blockTags": []
        },
        "type": {
          "kind": "union",
          "text": "Document | undefined",
          "name": null,
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 133,
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
        "id": 595,
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
        "id": 594,
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
        "id": 591,
        "name": "retryable",
        "anchor": "retryable",
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
              "text": "Whether the server says the same request may succeed if retried. ",
              "target": null
            },
            {
              "kind": "code",
              "text": "`false`",
              "target": null
            },
            {
              "kind": "text",
              "text": "\nunless stated.",
              "target": null
            }
          ],
          "blockTags": []
        },
        "type": {
          "kind": "intrinsic",
          "text": "boolean",
          "name": "boolean",
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 131,
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
        "id": 590,
        "name": "serverErrorName",
        "anchor": "server-error-name",
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
              "text": "The server's name for the error, such as ",
              "target": null
            },
            {
              "kind": "code",
              "text": "`DuplicateKey`",
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
          "kind": "union",
          "text": "string | undefined",
          "name": null,
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 126,
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
        "id": 596,
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
        "id": 589,
        "name": "wireCode",
        "anchor": "wire-code",
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
              "text": "The numeric error code from the wire protocol, if the server sent one.",
              "target": null
            }
          ],
          "blockTags": []
        },
        "type": {
          "kind": "union",
          "text": "number | undefined",
          "name": null,
          "target": null,
          "children": []
        },
        "defaultValue": null,
        "sources": [
          {
            "fileName": "packages/driver/dist/errors.d.ts",
            "line": 124,
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
        "id": 584,
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
        "id": 576,
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
            "id": 577,
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
                "id": 578,
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
                "id": 579,
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
        "id": 580,
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
            "id": 581,
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
                "id": 582,
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
                "id": 583,
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
  },
  {
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
  }
] as const;
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
    <ApiHierarchyPage
      projectName="SinterDB driver API"
      classes={classes}
      navigation={navigation}
    />
  );
}
