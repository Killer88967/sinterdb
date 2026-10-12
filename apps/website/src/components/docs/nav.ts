/**
 * Guide navigation: the sidebar, the section label above each page title and
 * the previous/next links all come from this list. Adding a page is
 * `src/app/docs/(guides)/<slug>/page.mdx` plus an entry here.
 *
 * `soon: true` keeps a planned page visible in the sidebar without linking
 * to a 404.
 */
export interface DocsNavItem {
  readonly label: string;
  readonly href: string;
  readonly soon?: boolean;
}

export interface DocsNavSection {
  readonly title: string;
  readonly items: readonly DocsNavItem[];
}

export const docsNav: readonly DocsNavSection[] = [
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
      { label: "Databases", href: "/docs/databases", soon: true },
      { label: "Collections", href: "/docs/collections", soon: true },
      { label: "Documents", href: "/docs/documents", soon: true },
    ],
  },
  {
    title: "Queries",
    items: [
      { label: "Filters", href: "/docs/filters", soon: true },
      { label: "Sorting", href: "/docs/sorting", soon: true },
      { label: "Cursors", href: "/docs/cursors", soon: true },
    ],
  },
  {
    title: "Writing Data",
    items: [
      { label: "Inserts", href: "/docs/inserts", soon: true },
      { label: "Updates", href: "/docs/updates", soon: true },
      { label: "Replacements", href: "/docs/replacements", soon: true },
      { label: "Deletes", href: "/docs/deletes", soon: true },
    ],
  },
];

export const docsPages = docsNav.flatMap((section) =>
  section.items
    .filter((item) => !item.soon)
    .map((item) => ({ ...item, section: section.title })),
);

export function findDocsPage(pathname: string) {
  const index = docsPages.findIndex((page) => page.href === pathname);

  return {
    page: docsPages[index] ?? null,
    previous: index > 0 ? docsPages[index - 1] : null,
    next: index >= 0 ? (docsPages[index + 1] ?? null) : null,
  };
}
