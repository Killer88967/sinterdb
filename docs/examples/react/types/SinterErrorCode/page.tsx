import type { Metadata } from "next";

import { ApiReflectionPage } from "../../_components/pages";
import type { ApiPage } from "../../_generated/model";

const page = {
  "id": 510,
  "name": "SinterErrorCode",
  "kind": "type-alias",
  "label": "Type Alias",
  "href": "/docs/api/types/SinterErrorCode",
  "description": "A value of SinterErrorCode.",
  "badges": [],
  "declaration": [
    [
      "type ",
      "kw"
    ],
    [
      "SinterErrorCode",
      "name"
    ],
    [
      " = ",
      "pn"
    ],
    [
      "typeof ",
      "kw"
    ],
    [
      "SinterErrorCode",
      "ref",
      "/docs/api/variables/SinterErrorCode"
    ],
    [
      "[",
      "pn"
    ],
    [
      "keyof typeof ",
      "kw"
    ],
    [
      "SinterErrorCode",
      "ref",
      "/docs/api/variables/SinterErrorCode"
    ],
    [
      "]",
      "pn"
    ]
  ],
  "comment": {
    "summary": "<p>A value of <a href=\"/docs/api/variables/SinterErrorCode\">SinterErrorCode</a>.</p>",
    "short": "A value of <a href=\"/docs/api/variables/SinterErrorCode\">SinterErrorCode</a>.",
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
      "path": "packages/driver/src/errors.ts",
      "line": 7,
      "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L7"
    },
    {
      "path": "packages/driver/src/errors.ts",
      "line": 35,
      "url": "https://github.com/SinterDB/sinterdb/blob/ecd947da3fe7f4dae22317777a4896e9c5fee115/packages/driver/src/errors.ts#L35"
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
