export function renderApiShellTemplate({ routeBase }) {
  return `import { Comment } from "./comment";
import { MemberGroup } from "./member-group";
import { MemberIndex } from "./member-index";
import { Navigation } from "./navigation";
import { PageNavigation } from "./page-navigation";
import { SourceList } from "./source";
import { TypeExpression } from "./type-expression";
import type { ApiNavigationItem, ApiReflection } from "../_generated/model";

const ROUTE_BASE = ${JSON.stringify(routeBase)};

export function ApiIndexPage({
  projectName,
  reflections,
}: {
  readonly projectName: string;
  readonly reflections: readonly ApiNavigationItem[];
}) {
  return (
    <div className="typedoc-layout">
      <Navigation
        projectName={projectName}
        navigation={reflections}
        routeBase={ROUTE_BASE}
      />

      <main className="typedoc-content">
        <header className="typedoc-page-header">
          <h1>{projectName}</h1>
        </header>

        <MemberIndex
          reflections={reflections}
          routeBase={ROUTE_BASE}
        />
      </main>
    </div>
  );
}

export function ApiReflectionPage({
  projectName,
  api,
  navigation,
}: {
  readonly projectName: string;
  readonly api: ApiReflection;
  readonly navigation: readonly ApiNavigationItem[];
}) {
  return (
    <div className="typedoc-layout">
      <Navigation
        projectName={projectName}
        navigation={navigation}
        routeBase={ROUTE_BASE}
      />

      <main className="typedoc-content">
        <header className="typedoc-page-header">
          <div className="typedoc-kind">
            {api.kind}
          </div>

          <h1>{api.name}</h1>

          {api.type && (
            <div className="typedoc-signature">
              <TypeExpression type={api.type} />
            </div>
          )}

          <Comment comment={api.comment} />

          <SourceList sources={api.sources} />
        </header>

        <MemberIndex
          reflection={api}
          routeBase={ROUTE_BASE}
        />

        <MemberGroup
          title="Constructors"
          members={api.children.filter(
            (member) => member.kind === "Constructor",
          )}
        />

        <MemberGroup
          title="Properties"
          members={api.children.filter(
            (member) => member.kind === "Property",
          )}
        />

        <MemberGroup
          title="Accessors"
          members={api.children.filter(
            (member) => member.kind === "Accessor",
          )}
        />

        <MemberGroup
          title="Methods"
          members={api.children.filter(
            (member) => member.kind === "Method",
          )}
        />
      </main>

      <PageNavigation reflection={api} />
    </div>
  );
}

export function ApiHierarchyPage({
  projectName,
  classes,
  navigation,
}: {
  readonly projectName: string;
  readonly classes: readonly ApiReflection[];
  readonly navigation: readonly ApiNavigationItem[];
}) {
  return (
    <div className="typedoc-layout">
      <Navigation
        projectName={projectName}
        navigation={navigation}
        routeBase={ROUTE_BASE}
      />

      <main className="typedoc-content">
        <header className="typedoc-page-header">
          <h1>Hierarchy</h1>
        </header>

        <div className="typedoc-hierarchy">
          {classes.map((reflection) => (
            <div
              key={reflection.id}
              className="typedoc-hierarchy-entry"
            >
              {reflection.name}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
`;
}
