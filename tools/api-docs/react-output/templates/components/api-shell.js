export function renderApiShellTemplate({ routeBase }) {
  return `import Link from "next/link";

import { MemberGroup } from "./member-group";
import { SourceList } from "./source";
import { TypeDocIcon } from "./typedoc-icon";
import { TypeExpression } from "./type-expression";
import type { ApiNavigationItem, ApiReflection } from "./types";

const ROUTE_BASE = ${JSON.stringify(routeBase)};

export function ApiIndexPage({
  projectName,
  reflections,
}: {
  readonly projectName: string;
  readonly reflections: readonly ApiNavigationItem[];
}) {
  return (
    <main className="typedoc-content">
      <h1>
        {projectName}
      </h1>

      <div className="typedoc-index">
        {reflections.map(
          (reflection) => (
            <Link
              key={reflection.id}
              href={
                ROUTE_BASE +
                "/" +
                reflection.route
              }
            >
              <TypeDocIcon
                kind={
                  reflection.kindId
                }
                label={
                  reflection.kind
                }
              />

              <span>
                {reflection.name}
              </span>
            </Link>
          ),
        )}
      </div>
    </main>
  );
}

export function ApiReflectionPage({
  projectName,
  api,
  navigation,
}: {
  readonly projectName: string;
  readonly api: ApiReflection;
  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  void projectName;
  void navigation;

  const constructors =
    api.children.filter(
      (member) =>
        member.kind ===
        "Constructor",
    );

  const properties =
    api.children.filter(
      (member) =>
        member.kind ===
        "Property",
    );

  const accessors =
    api.children.filter(
      (member) =>
        member.kind ===
        "Accessor",
    );

  const methods =
    api.children.filter(
      (member) =>
        member.kind ===
        "Method",
    );

  return (
    <main className="typedoc-content">
      <h1>
        {api.kind} {api.name}
      </h1>

      {api.type && (
        <div className="typedoc-signature">
          <TypeExpression
            type={api.type}
          />
        </div>
      )}

      <SourceList
        sources={
          api.sources
        }
      />

      <MemberGroup
        title="Constructors"
        members={
          constructors
        }
      />

      <MemberGroup
        title="Properties"
        members={
          properties
        }
      />

      <MemberGroup
        title="Accessors"
        members={
          accessors
        }
      />

      <MemberGroup
        title="Methods"
        members={
          methods
        }
      />
    </main>
  );
}

export function ApiHierarchyPage({
  projectName,
}: {
  readonly projectName: string;
  readonly classes: readonly ApiReflection[];
  readonly navigation: readonly ApiNavigationItem[];
}) {
  return (
    <main className="typedoc-content">
      <h1>
        {projectName}
      </h1>

      <h2>
        Hierarchy Summary
      </h2>
    </main>
  );
}
`;
}
