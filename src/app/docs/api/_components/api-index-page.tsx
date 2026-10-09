import Link from "next/link";

import { ApiShell } from "./api-shell";

import { TypeDocIcon } from "./typedoc-icon";

import type {
  ApiIndexReflection,
} from "./types";

interface ApiIndexPageProps {
  readonly projectName: string;

  readonly reflections:
    readonly ApiIndexReflection[];
}

export function ApiIndexPage({
  projectName,
  reflections,
}: ApiIndexPageProps) {
  const groups = Map.groupBy(
    reflections,
    (reflection) =>
      reflection.kind,
  );

  return (
    <ApiShell
      projectName={projectName}
      navigation={reflections}
    >
      <div className="typedoc-page-title">
        <h1>
          {projectName}
        </h1>
      </div>

      {[
        ...groups.entries(),
      ].map(([kind, items]) => (
        <details
          key={kind}
          open
          className="typedoc-member-group"
        >
          <summary className="typedoc-group-summary">
            <h2>
              {formatKind(kind)}
            </h2>
          </summary>

          <dl className="typedoc-member-summaries">
            {items.map(
              (item) => (
                <div
                  key={item.id}
                  className="typedoc-summary-row"
                >
                  <dt>
                    <TypeDocIcon
                      kind={
                        item.kindId
                      }
                      label={
                        item.kind
                      }
                      className="size-5"
                    />

                    <Link
                      href={
                        "/docs/api/" +
                        item.route
                      }
                    >
                      {item.name}
                    </Link>
                  </dt>

                  <dd>
                    {
                      item.description
                    }
                  </dd>
                </div>
              ),
            )}
          </dl>
        </details>
      ))}
    </ApiShell>
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
