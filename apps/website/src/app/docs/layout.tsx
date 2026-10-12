import Link from "next/link";
import type { ReactNode } from "react";

import { DocsHeaderTabs } from "@/components/docs/header-tabs";

/**
 * Shared header for guides and the API reference. Each section brings its own
 * sidebar: `(guides)/layout.tsx` for the hand-written pages and
 * `api/_components` for the generated reference. The header is 4rem tall,
 * which the API theme expects (`--tdk-top`).
 */
export default function DocsLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#090909]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-368 items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-lg border border-orange-500/25 bg-orange-500/10 font-mono text-sm font-bold text-orange-400">
              S
            </span>

            <span className="flex items-center gap-2">
              <span className="text-sm font-semibold">SinterDB</span>
              <span className="hidden text-sm text-zinc-600 sm:inline">/</span>
              <span className="hidden text-sm text-zinc-400 sm:inline">
                Docs
              </span>
            </span>
          </Link>

          <DocsHeaderTabs />
        </div>
      </header>

      {children}
    </div>
  );
}
