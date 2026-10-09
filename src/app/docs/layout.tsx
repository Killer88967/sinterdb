import Link from "next/link";

const sections = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Connecting", href: "/docs/connecting" },
    ],
  },
  {
    title: "Core",
    items: [
      { label: "Databases", href: "/docs/databases" },
      { label: "Collections", href: "/docs/collections" },
      { label: "Documents", href: "/docs/documents" },
    ],
  },
  {
    title: "Queries",
    items: [
      { label: "Filters", href: "/docs/filters" },
      { label: "Sorting", href: "/docs/sorting" },
      { label: "Cursors", href: "/docs/cursors" },
    ],
  },
  {
    title: "Writing Data",
    items: [
      { label: "Inserts", href: "/docs/inserts" },
      { label: "Updates", href: "/docs/updates" },
      { label: "Replacements", href: "/docs/replacements" },
      { label: "Deletes", href: "/docs/deletes" },
    ],
  },
];

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <div className="site-grid fixed inset-0 z-0" aria-hidden="true" />

      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#090909]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-lg border border-orange-500/25 bg-orange-500/10 font-mono text-sm font-bold text-orange-400">
              S
            </span>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">SinterDB</span>
              <span className="text-sm text-zinc-600">/</span>
              <span className="text-sm text-zinc-400">Docs</span>
            </div>
          </Link>

          <div className="flex items-center gap-5 text-sm text-zinc-400">
            <a
              href="/docs/api/index.html"
              className="transition hover:text-white"
            >
              API Reference
            </a>

            <a
              href="https://github.com/SinterDB/sinterdb"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex max-w-7xl">
        <aside className="hidden w-64 shrink-0 border-r border-white/[0.07] px-6 py-10 lg:block">
          <nav className="space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-600">
                  {section.title}
                </h2>

                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/4 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-600">
                Reference
              </h2>

              <a
                href="/docs/api/index.html"
                className="block rounded-md px-3 py-2 text-sm text-orange-400 transition hover:bg-orange-500/6 hover:text-orange-300"
              >
                API Reference ↗
              </a>
            </div>
          </nav>
        </aside>

        <div className="min-w-0 flex-1 px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          {children}
        </div>
      </div>
    </main>
  );
}
