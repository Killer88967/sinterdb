"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { docsNav, findDocsPage } from "./nav";

function NavLinks({ pathname }: { readonly pathname: string }) {
  return (
    <nav className="space-y-8" aria-label="Guides">
      {docsNav.map((section) => (
        <div key={section.title}>
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-600">
            {section.title}
          </h2>

          <div className="space-y-1">
            {section.items.map((item) =>
              item.soon ? (
                <span
                  key={item.href}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-zinc-700"
                >
                  {item.label}
                  <span className="font-mono text-[10px] uppercase tracking-wider">
                    Soon
                  </span>
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="block rounded-md px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/4 hover:text-white aria-[current=page]:bg-orange-500/8 aria-[current=page]:text-orange-300"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </div>
      ))}

      <div>
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-600">
          Reference
        </h2>

        <div className="space-y-1">
          <Link
            href="/docs/api"
            className="block rounded-md px-3 py-2 text-sm text-orange-400 transition hover:bg-orange-500/6 hover:text-orange-300"
          >
            API Reference →
          </Link>
          <Link
            href="/docs/api/hierarchy"
            className="block rounded-md px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/4 hover:text-white"
          >
            Class hierarchy
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-white/[0.07] px-6 py-10 lg:block">
      <NavLinks pathname={pathname} />
    </aside>
  );
}

/** Collapsible copy of the sidebar for small screens. */
export function DocsMobileNav() {
  const pathname = usePathname();
  const { page } = findDocsPage(pathname);

  return (
    <details
      key={pathname}
      className="group mb-10 rounded-xl border border-white/8 bg-white/2 lg:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm text-zinc-300">
        <span>{page?.label ?? "Menu"}</span>
        <span className="text-zinc-600 group-open:rotate-45 transition">+</span>
      </summary>
      <div className="border-t border-white/[0.07] px-2 py-6">
        <NavLinks pathname={pathname} />
      </div>
    </details>
  );
}

export function DocsEyebrow() {
  const { page } = findDocsPage(usePathname());

  return page ? (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">
      {page.section}
    </p>
  ) : null;
}

export function DocsPager() {
  const { previous, next } = findDocsPage(usePathname());

  if (!previous && !next) {
    return null;
  }

  return (
    <div className="mt-14 flex max-w-4xl items-center justify-between gap-4 border-t border-white/[0.07] pt-8">
      {previous ? (
        <Link
          href={previous.href}
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          ← {previous.label}
        </Link>
      ) : (
        <span />
      )}

      {next && (
        <Link
          href={next.href}
          className="text-sm font-medium text-orange-400 transition hover:text-orange-300"
        >
          {next.label} →
        </Link>
      )}
    </div>
  );
}
