import type { Metadata } from "next";

import { ApiReflectionPage } from "../../_components/pages";
import type { ApiPage } from "../../_generated/model";

const page = {
  "id": 742,
  "name": "UpdateOptions",
  "kind": "interface",
  "label": "Interface",
  "href": "/docs/api/interfaces/UpdateOptions",
  "description": "Options for updates and replacements.",
  "badges": [],
  "declaration": [
    [
      "interface ",
      "kw"
    ],
    [
      "UpdateOptions",
      "name"
    ]
  ],
  "comment": {
    "summary": "<p>Options for updates and replacements.</p>",
    "short": "Options for updates and replacements.",
    "deprecated": null,
    "modifiers": [],
    "blocks": []
  },
  "typeParameters": [],
  "hierarchy": null,
  "signatureSection": null,
  "signatures": [],
  "sections": [
    {
      "id": "properties",
      "title": "Properties",
      "members": [
        {
          "id": 743,
          "name": "upsert",
          "anchor": "upsert",
          "kind": "property",
          "label": "Property",
          "badges": [],
          "code": [
            [
              "readonly ",
              "kw"
            ],
            [
              "upsert",
              "name"
            ],
            [
              "?: ",
              "pn"
            ],
            [
              "boolean",
              "prim"
            ]
          ],
          "comment": {
            "summary": "<p>Insert a new document when nothing matches the filter.</p>",
            "short": "Insert a new document when nothing matches the filter.",
            "deprecated": null,
            "modifiers": [],
            "blocks": []
          },
          "signatures": [],
          "members": [],
          "relations": [],
          "sources": [
            {
              "path": "packages/driver/src/update.ts",
              "line": 57,
              "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/update.ts#L57"
            }
          ]
        }
      ]
    }
  ],
  "toc": [
    {
      "id": "properties",
      "title": "Properties",
      "items": [
        {
          "anchor": "upsert",
          "name": "upsert",
          "kind": "property"
        }
      ]
    }
  ],
  "sources": [
    {
      "path": "packages/driver/src/update.ts",
      "line": 53,
      "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/update.ts#L53"
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
