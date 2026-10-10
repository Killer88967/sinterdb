import type { Metadata } from "next";

import { ApiReflectionPage } from "../../_components/pages";
import type { ApiPage } from "../../_generated/model";

const page = {
  "id": 476,
  "name": "SinterError",
  "kind": "class",
  "label": "Class",
  "href": "/docs/api/classes/SinterError",
  "description": "The base class of every error the driver throws on its own. Check code to tell them apart.",
  "badges": [],
  "declaration": [
    [
      "class ",
      "kw"
    ],
    [
      "SinterError",
      "name"
    ],
    [
      " extends ",
      "kw"
    ],
    [
      "Error",
      "ref"
    ]
  ],
  "comment": {
    "summary": "<p>The base class of every error the driver throws on its own. Check <code>code</code> to\ntell them apart.</p>",
    "short": "The base class of every error the driver throws on its own. Check <code>code</code> to tell them apart.",
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
        "href": null,
        "kind": "class",
        "current": true,
        "children": [
          {
            "name": "SinterClientOptionsError",
            "href": "/docs/api/classes/SinterClientOptionsError",
            "kind": "class",
            "current": false,
            "children": []
          },
          {
            "name": "SinterClientStateError",
            "href": "/docs/api/classes/SinterClientStateError",
            "kind": "class",
            "current": false,
            "children": []
          },
          {
            "name": "SinterConnectionError",
            "href": "/docs/api/classes/SinterConnectionError",
            "kind": "class",
            "current": false,
            "children": []
          },
          {
            "name": "SinterConnectionStringError",
            "href": "/docs/api/classes/SinterConnectionStringError",
            "kind": "class",
            "current": false,
            "children": []
          },
          {
            "name": "SinterDocumentError",
            "href": "/docs/api/classes/SinterDocumentError",
            "kind": "class",
            "current": false,
            "children": []
          },
          {
            "name": "SinterProtocolError",
            "href": "/docs/api/classes/SinterProtocolError",
            "kind": "class",
            "current": false,
            "children": []
          },
          {
            "name": "SinterRequestTimeoutError",
            "href": "/docs/api/classes/SinterRequestTimeoutError",
            "kind": "class",
            "current": false,
            "children": []
          },
          {
            "name": "SinterServerError",
            "href": "/docs/api/classes/SinterServerError",
            "kind": "class",
            "current": false,
            "children": []
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
          "id": 486,
          "name": "constructor",
          "anchor": "constructor",
          "kind": "constructor",
          "label": "Constructor",
          "badges": [],
          "code": null,
          "comment": null,
          "signatures": [
            {
              "id": 487,
              "code": [
                [
                  "new ",
                  "kw"
                ],
                [
                  "SinterError",
                  "name"
                ],
                [
                  "(",
                  "pn"
                ],
                [
                  "code",
                  "param"
                ],
                [
                  ": ",
                  "pn"
                ],
                [
                  "SinterErrorCode",
                  "ref",
                  "/docs/api/types/SinterErrorCode"
                ],
                [
                  ", ",
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
                  "ErrorOptions",
                  "ref"
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
                  "name": "code",
                  "code": [
                    [
                      "code",
                      "param"
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
                  "comment": null,
                  "members": []
                },
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
                      "ErrorOptions",
                      "ref"
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
                  "line": 60,
                  "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L60"
                }
              ]
            }
          ],
          "members": [],
          "relations": [],
          "sources": [
            {
              "path": "packages/driver/src/errors.ts",
              "line": 60,
              "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L60"
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
          "id": 491,
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
          "relations": [],
          "sources": [
            {
              "path": "packages/driver/src/errors.ts",
              "line": 58,
              "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L58"
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
        }
      ]
    }
  ],
  "sources": [
    {
      "path": "packages/driver/src/errors.ts",
      "line": 54,
      "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L54"
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
