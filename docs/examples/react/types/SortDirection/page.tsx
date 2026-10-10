import type { Metadata } from "next";

import { ApiReflectionPage } from "../../_components/pages";
import type { ApiPage } from "../../_generated/model";

const page = {
  "id": 659,
  "name": "SortDirection",
  "kind": "type-alias",
  "label": "Type Alias",
  "href": "/docs/api/types/SortDirection",
  "description": "1 for ascending or -1 for descending.",
  "badges": [],
  "declaration": [
    [
      "type ",
      "kw"
    ],
    [
      "SortDirection",
      "name"
    ],
    [
      " = ",
      "pn"
    ],
    [
      "1",
      "lit"
    ],
    [
      " | ",
      "pn"
    ],
    [
      "-1",
      "lit"
    ]
  ],
  "comment": {
    "summary": "<p><code>1</code> for ascending or <code>-1</code> for descending.</p>",
    "short": "<code>1</code> for ascending or <code>-1</code> for descending.",
    "deprecated": null,
    "modifiers": [],
    "blocks": []
  },
  "typeParameters": [],
  "hierarchy": null,
  "signatureSection": null,
  "signatures": [],
  "sections": [],
  "toc": [],
  "sources": [
    {
      "path": "packages/driver/src/filter.ts",
      "line": 119,
      "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/filter.ts#L119"
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
