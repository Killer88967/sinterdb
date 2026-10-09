import Link from "next/link";

import { TypeDocIcon } from "./typedoc-icon";

import type {
  ApiNavigationItem,
} from "./types";

interface ApiShellProps {
  readonly projectName: string;

  readonly navigation:
    readonly ApiNavigationItem[];

  readonly activeId?: number;

  readonly pageNavigation?: React.ReactNode;

  readonly children: React.ReactNode;
}

export function ApiShell({
  projectName,
  navigation,
  activeId,
  pageNavigation,
  children,
}: ApiShellProps) {
  const grouped =
    Map.groupBy(
      navigation,
      (item) => item.kind,
    );

  return (
    <div className="typedoc-shell">
      <header className="typedoc-toolbar">
        <div className="typedoc-toolbar-inner">
          <Link
            href="/docs/api"
            className="typedoc-toolbar-title"
          >
            {projectName}
          </Link>

          <div className="typedoc-toolbar-actions">
            <Link
              href="/docs/api/hierarchy"
              className="typedoc-toolbar-link"
            >
              Hierarchy
            </Link>
          </div>
        </div>
      </header>

      <div className="typedoc-layout">
        <main className="typedoc-content">
          {children}
        </main>

        <aside className="typedoc-sidebar">
          <div className="typedoc-page-menu">
            {pageNavigation}
          </div>

          <div className="typedoc-site-menu">
            <Link
              href="/docs/api"
              className="typedoc-site-title"
            >
              {projectName}
            </Link>

            <nav className="typedoc-site-navigation">
              {[
                ...grouped.entries(),
              ].map(
                ([kind, items]) => (
                  <details
                    key={kind}
                    open
                    className="typedoc-nav-group"
                  >
                    <summary>
                      {formatKind(kind)}
                    </summary>

                    <div>
                      {items.map(
                        (item) => (
                          <Link
                            key={
                              item.id
                            }
                            href={
                              "/docs/api/" +
                              item.route
                            }
                            className={
                              "typedoc-nav-link " +
                              (
                                activeId ===
                                item.id
                                  ? "typedoc-nav-link-active"
                                  : ""
                              )
                            }
                          >
                            <TypeDocIcon
                              kind={
                                item.kindId
                              }
                              label={
                                item.kind
                              }
                              className="size-4"
                            />

                            <span>
                              {item.name}
                            </span>
                          </Link>
                        ),
                      )}
                    </div>
                  </details>
                ),
              )}
            </nav>
          </div>
        </aside>
      </div>

      <footer className="typedoc-footer">
        Generated from the SinterDB
        TypeScript API.
      </footer>
    </div>
  );
}

function formatKind(kind: string) {
  if (kind === "TypeAlias") {
    return "Type Aliases";
  }

  return (
    kind
      .replace(
        /([a-z])([A-Z])/g,
        "$1 $2",
      ) + "s"
  );
}
