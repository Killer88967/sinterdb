import type { Metadata } from "next";

import { ApiReflectionPage } from "../../_components/pages";
import type { ApiPage } from "../../_generated/model";

const page = {
  id: 26,
  name: "Document",
  kind: "interface",
  label: "Interface",
  href: "/docs/api/interfaces/Document",
  description: "",
  badges: [],
  declaration: [
    ["interface ", "kw"],
    ["Document", "name"],
  ],
  comment: null,
  typeParameters: [],
  hierarchy: null,
  signatureSection: null,
  signatures: [],
  sections: [
    {
      id: "index-signatures",
      title: "Index signature",
      members: [
        {
          id: 27,
          name: "[key]",
          anchor: "index-signature",
          kind: "index-signature",
          label: "Index Signature",
          badges: [],
          code: [
            ["[", "pn"],
            ["key", "param"],
            [": ", "pn"],
            ["string", "prim"],
            ["]: ", "pn"],
            ["DocumentValue", "ref"],
          ],
          comment: null,
          signatures: [],
          members: [],
          relations: [],
          sources: [
            {
              path: "packages/protocol/src/document.ts",
              line: 4,
              url: "https://github.com/SinterDB/sinterdb/blob/5fba92e03c736a2383c997b699469c460c425f64/packages/protocol/src/document.ts#L4",
            },
          ],
        },
      ],
    },
  ],
  toc: [
    {
      id: "index-signatures",
      title: "Index signature",
      items: [
        {
          anchor: "index-signature",
          name: "[key]",
          kind: "index-signature",
        },
      ],
    },
  ],
  sources: [
    {
      path: "packages/protocol/src/document.ts",
      line: 3,
      url: "https://github.com/SinterDB/sinterdb/blob/5fba92e03c736a2383c997b699469c460c425f64/packages/protocol/src/document.ts#L3",
    },
  ],
} satisfies ApiPage;

export const metadata: Metadata = {
  title: page.name,
  description: page.description || undefined,
};

export default function Page() {
  return <ApiReflectionPage page={page} />;
}
