import { join } from "node:path";

import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

// Turbopack needs plugins as strings (package names or absolute paths).
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-gfm",
      join(process.cwd(), "src/lib/mdx/remark-code-meta.mjs"),
    ],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
