import { ApiReflectionPage } from "../../_components/api-shell";

const api = {
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
