import type { Metadata } from "next";

import { ApiReflectionPage } from "../../_components/pages";
import type { ApiPage } from "../../_generated/model";

const page = {
  "id": 575,
  "name": "SinterServerError",
  "kind": "class",
  "label": "Class",
  "href": "/docs/api/classes/SinterServerError",
  "description": "The server rejected a request. Code SERVER_ERROR.",
  "badges": [],
  "declaration": [
    [
      "class ",
      "kw"
    ],
    [
      "SinterServerError",
      "name"
    ],
    [
      " extends ",
      "kw"
    ],
    [
      "SinterError",
      "ref",
      "/docs/api/classes/SinterError"
    ]
  ],
  "comment": {
    "summary": "<p>The server rejected a request. Code <code>SERVER_ERROR</code>.</p>\n<p>Use <code>serverErrorName</code> to tell failures apart, such as <code>DuplicateKey</code>.</p>",
    "short": "The server rejected a request. Code <code>SERVER_ERROR</code>.",
    "deprecated": null,
    "modifiers": [],
    "blocks": []
  },
  "typeParameters": [],
  "hierarchy": {
    "name": "Error",
    "href": null,
    "kind": null,
    "current": false,
    "children": [
      {
        "name": "SinterError",
        "href": "/docs/api/classes/SinterError",
        "kind": "class",
        "current": false,
        "children": [
          {
            "name": "SinterServerError",
            "href": null,
            "kind": "class",
            "current": true,
            "children": [
              {
                "name": "SinterCompatibilityError",
                "href": "/docs/api/classes/SinterCompatibilityError",
                "kind": "class",
                "current": false,
                "children": []
              },
              {
                "name": "SinterInsertManyError",
                "href": "/docs/api/classes/SinterInsertManyError",
                "kind": "class",
                "current": false,
                "children": []
              }
            ]
          }
        ]
      }
    ]
  },
  "signatureSection": null,
  "signatures": [],
  "sections": [
    {
      "id": "constructors",
      "title": "Constructors",
      "members": [
        {
          "id": 585,
          "name": "constructor",
          "anchor": "constructor",
          "kind": "constructor",
          "label": "Constructor",
          "badges": [],
          "code": null,
          "comment": null,
          "signatures": [
            {
              "id": 586,
              "code": [
                [
                  "new ",
                  "kw"
                ],
                [
                  "SinterServerError",
                  "name"
                ],
                [
                  "(",
                  "pn"
                ],
                [
                  "message",
                  "param"
                ],
                [
                  ": ",
                  "pn"
                ],
                [
                  "string",
                  "prim"
                ],
                [
                  ", ",
                  "pn"
                ],
                [
                  "options",
                  "param"
                ],
                [
                  "?: ",
                  "pn"
                ],
                [
                  "SinterServerErrorOptions",
                  "ref",
                  "/docs/api/interfaces/SinterServerErrorOptions"
                ],
                [
                  ")",
                  "pn"
                ]
              ],
              "comment": null,
              "typeParameters": [],
              "parameters": [
                {
                  "name": "message",
                  "code": [
                    [
                      "message",
                      "param"
                    ],
                    [
                      ": ",
                      "pn"
                    ],
                    [
                      "string",
                      "prim"
                    ]
                  ],
                  "comment": null,
                  "members": []
                },
                {
                  "name": "options",
                  "code": [
                    [
                      "options",
                      "param"
                    ],
                    [
                      "?: ",
                      "pn"
                    ],
                    [
                      "SinterServerErrorOptions",
                      "ref",
                      "/docs/api/interfaces/SinterServerErrorOptions"
                    ]
                  ],
                  "comment": null,
                  "members": []
                }
              ],
              "returns": null,
              "sources": [
                {
                  "path": "packages/driver/src/errors.ts",
                  "line": 185,
                  "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L185"
                }
              ]
            }
          ],
          "members": [],
          "relations": [
            {
              "label": "Overrides",
              "name": "SinterError.constructor",
              "href": "/docs/api/classes/SinterError#constructor"
            }
          ],
          "sources": [
            {
              "path": "packages/driver/src/errors.ts",
              "line": 185,
              "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L185"
            }
          ]
        }
      ]
    },
    {
      "id": "properties",
      "title": "Properties",
      "members": [
        {
          "id": 593,
          "name": "code",
          "anchor": "code",
          "kind": "property",
          "label": "Property",
          "badges": [],
          "code": [
            [
              "readonly ",
              "kw"
            ],
            [
              "code",
              "name"
            ],
            [
              ": ",
              "pn"
            ],
            [
              "SinterErrorCode",
              "ref",
              "/docs/api/types/SinterErrorCode"
            ]
          ],
          "comment": {
            "summary": "<p>A stable identifier for the kind of failure; see <a href=\"/docs/api/variables/SinterErrorCode\">SinterErrorCode</a>.</p>",
            "short": "A stable identifier for the kind of failure; see <a href=\"/docs/api/variables/SinterErrorCode\">SinterErrorCode</a>.",
            "deprecated": null,
            "modifiers": [],
            "blocks": []
          },
          "signatures": [],
          "members": [],
          "relations": [
            {
              "label": "Inherited from",
              "name": "SinterError.code",
              "href": "/docs/api/classes/SinterError#code"
            }
          ],
          "sources": [
            {
              "path": "packages/driver/src/errors.ts",
              "line": 58,
              "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L58"
            }
          ]
        },
        {
          "id": 592,
          "name": "details",
          "anchor": "details",
          "kind": "property",
          "label": "Property",
          "badges": [],
          "code": [
            [
              "readonly ",
              "kw"
            ],
            [
              "details",
              "name"
            ],
            [
              ": ",
              "pn"
            ],
            [
              "Document",
              "ref",
              "/docs/api/interfaces/Document"
            ],
            [
              " | ",
              "pn"
            ],
            [
              "undefined",
              "prim"
            ]
          ],
          "comment": {
            "summary": "<p>Extra structured information from the server, if any.</p>",
            "short": "Extra structured information from the server, if any.",
            "deprecated": null,
            "modifiers": [],
            "blocks": []
          },
          "signatures": [],
          "members": [],
          "relations": [],
          "sources": [
            {
              "path": "packages/driver/src/errors.ts",
              "line": 183,
              "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L183"
            }
          ]
        },
        {
          "id": 591,
          "name": "retryable",
          "anchor": "retryable",
          "kind": "property",
          "label": "Property",
          "badges": [],
          "code": [
            [
              "readonly ",
              "kw"
            ],
            [
              "retryable",
              "name"
            ],
            [
              ": ",
              "pn"
            ],
            [
              "boolean",
              "prim"
            ]
          ],
          "comment": {
            "summary": "<p>Whether the server says the same request may succeed if retried. <code>false</code>\nunless stated.</p>",
            "short": "Whether the server says the same request may succeed if retried. <code>false</code> unless stated.",
            "deprecated": null,
            "modifiers": [],
            "blocks": []
          },
          "signatures": [],
          "members": [],
          "relations": [],
          "sources": [
            {
              "path": "packages/driver/src/errors.ts",
              "line": 181,
              "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L181"
            }
          ]
        },
        {
          "id": 590,
          "name": "serverErrorName",
          "anchor": "server-error-name",
          "kind": "property",
          "label": "Property",
          "badges": [],
          "code": [
            [
              "readonly ",
              "kw"
            ],
            [
              "serverErrorName",
              "name"
            ],
            [
              ": ",
              "pn"
            ],
            [
              "string",
              "prim"
            ],
            [
              " | ",
              "pn"
            ],
            [
              "undefined",
              "prim"
            ]
          ],
          "comment": {
            "summary": "<p>The server's name for the error, such as <code>DuplicateKey</code>.</p>",
            "short": "The server's name for the error, such as <code>DuplicateKey</code>.",
            "deprecated": null,
            "modifiers": [],
            "blocks": []
          },
          "signatures": [],
          "members": [],
          "relations": [],
          "sources": [
            {
              "path": "packages/driver/src/errors.ts",
              "line": 176,
              "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L176"
            }
          ]
        },
        {
          "id": 589,
          "name": "wireCode",
          "anchor": "wire-code",
          "kind": "property",
          "label": "Property",
          "badges": [],
          "code": [
            [
              "readonly ",
              "kw"
            ],
            [
              "wireCode",
              "name"
            ],
            [
              ": ",
              "pn"
            ],
            [
              "number",
              "prim"
            ],
            [
              " | ",
              "pn"
            ],
            [
              "undefined",
              "prim"
            ]
          ],
          "comment": {
            "summary": "<p>The numeric error code from the wire protocol, if the server sent one.</p>",
            "short": "The numeric error code from the wire protocol, if the server sent one.",
            "deprecated": null,
            "modifiers": [],
            "blocks": []
          },
          "signatures": [],
          "members": [],
          "relations": [],
          "sources": [
            {
              "path": "packages/driver/src/errors.ts",
              "line": 174,
              "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L174"
            }
          ]
        }
      ]
    }
  ],
  "toc": [
    {
      "id": "constructors",
      "title": "Constructors",
      "items": [
        {
          "anchor": "constructor",
          "name": "constructor",
          "kind": "constructor"
        }
      ]
    },
    {
      "id": "properties",
      "title": "Properties",
      "items": [
        {
          "anchor": "code",
          "name": "code",
          "kind": "property"
        },
        {
          "anchor": "details",
          "name": "details",
          "kind": "property"
        },
        {
          "anchor": "retryable",
          "name": "retryable",
          "kind": "property"
        },
        {
          "anchor": "server-error-name",
          "name": "serverErrorName",
          "kind": "property"
        },
        {
          "anchor": "wire-code",
          "name": "wireCode",
          "kind": "property"
        }
      ]
    }
  ],
  "sources": [
    {
      "path": "packages/driver/src/errors.ts",
      "line": 170,
      "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L170"
    }
  ]
} satisfies ApiPage;

export const metadata: Metadata = {
  title: page.name,
  description: page.description || undefined,
};

export default function Page() {
  return <ApiReflectionPage page={page} />;
}
