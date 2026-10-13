import type { ReactNode } from "react";

import {
  DocsEyebrow,
  DocsMobileNav,
  DocsPager,
  DocsSidebar,
} from "@/components/docs/sidebar";
import "./docs.css";

/** Layout for the hand-written guides (`page.mdx` or `page.tsx`). */
export default function GuidesLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <div className="relative">
      <div className="site-grid fixed inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex max-w-368">
        <DocsSidebar />

        <main className="min-w-0 flex-1 px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <DocsMobileNav />

          <article className="docs-prose max-w-4xl">
            <DocsEyebrow />
            {children}
          </article>

          <DocsPager />
        </main>
      </div>
    </div>
  );
}
