import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { ReflectionKind } from "typedoc";

/**
 * @param {import("typedoc").Application} app
 */
export function load(app) {
  app.outputs.addOutput("react", async (outputPath, project) => {
    await rm(outputPath, {
      recursive: true,
      force: true,
    });

    await mkdir(outputPath, {
      recursive: true,
    });

    const reflections = (project.children ?? []).map((reflection) =>
      createApiReflection(reflection),
    );

    const navigation = reflections.map((reflection) => ({
      id: reflection.id,
      name: reflection.name,
      route: reflection.route,
      kind: reflection.kind,
      kindId: reflection.kindId,
    }));

    await generateSharedFiles(outputPath);

    await generateLayout(outputPath);

    await generateIndexPage(outputPath, project.name, reflections);

    await generateHierarchyPage(
      outputPath,
      project.name,
      reflections,
      navigation,
    );

    for (const reflection of reflections) {
      await generateReflectionPage(
        outputPath,
        project.name,
        reflection,
        navigation,
      );
    }
  });
}

/**
 * @param {import("typedoc").DeclarationReflection} reflection
 */
function createApiReflection(reflection) {
  const typeDeclaration =
    reflection.type &&
    typeof reflection.type === "object" &&
    "declaration" in reflection.type
      ? reflection.type.declaration
      : undefined;

  return {
    id: reflection.id,

    name: reflection.name,

    slug: createSlug(reflection.name),

    route: `${getKindDirectory(reflection.kind)}/${createSlug(
      reflection.name,
    )}`,

    kind: getKindName(reflection.kind),

    kindId: reflection.kind,

    description: getCommentText(reflection.comment),

    type: reflection.type?.toString() ?? null,

    flags: createFlags(reflection),

    sources: getSources(reflection),

    hierarchy: {
      extends: reflection.extendedTypes?.map((type) => type.toString()) ?? [],

      extendedBy: reflection.extendedBy?.map((type) => type.toString()) ?? [],
    },

    inheritedFrom: reflection.inheritedFrom?.toString() ?? null,

    overwrites: reflection.overwrites?.toString() ?? null,

    implementationOf: reflection.implementationOf?.toString() ?? null,

    typeParameters: reflection.typeParameters?.map(createTypeParameter) ?? [],

    signatures: reflection.signatures?.map(createSignature) ?? [],

    children: reflection.children?.map(createMember) ?? [],

    typeDeclaration: typeDeclaration?.children?.map(createMember) ?? [],
  };
}

/**
 * @param {import("typedoc").DeclarationReflection} reflection
 */
function createMember(reflection) {
  const typeDeclaration =
    reflection.type &&
    typeof reflection.type === "object" &&
    "declaration" in reflection.type
      ? reflection.type.declaration
      : undefined;

  return {
    id: reflection.id,

    name: reflection.name,

    anchor: createAnchor(reflection.name),

    kind: getKindName(reflection.kind),

    kindId: reflection.kind,

    description: getCommentText(reflection.comment),

    type: reflection.type?.toString() ?? null,

    defaultValue: reflection.defaultValue ?? null,

    flags: createFlags(reflection),

    sources: getSources(reflection),

    inheritedFrom: reflection.inheritedFrom?.toString() ?? null,

    overwrites: reflection.overwrites?.toString() ?? null,

    implementationOf: reflection.implementationOf?.toString() ?? null,

    typeParameters: reflection.typeParameters?.map(createTypeParameter) ?? [],

    signatures: reflection.signatures?.map(createSignature) ?? [],

    typeDeclaration: typeDeclaration?.children?.map(createMember) ?? [],
  };
}

/**
 * @param {import("typedoc").SignatureReflection} signature
 */
function createSignature(signature) {
  return {
    id: signature.id,

    name: signature.name,

    description: getCommentText(signature.comment),

    typeParameters: signature.typeParameters?.map(createTypeParameter) ?? [],

    parameters:
      signature.parameters?.map((parameter) => ({
        id: parameter.id,

        name: parameter.name,

        type: parameter.type?.toString() ?? "unknown",

        optional: parameter.flags.isOptional,

        defaultValue: parameter.defaultValue ?? null,

        description: getCommentText(parameter.comment),
      })) ?? [],

    returns: signature.type?.toString() ?? "void",

    returnsDescription: getBlockTagText(signature.comment, "@returns"),

    sources: getSources(signature),

    inheritedFrom: signature.inheritedFrom?.toString() ?? null,

    overwrites: signature.overwrites?.toString() ?? null,

    implementationOf: signature.implementationOf?.toString() ?? null,
  };
}

function createTypeParameter(parameter) {
  return {
    name: parameter.name,

    type: parameter.type?.toString() ?? null,

    default: parameter.default?.toString() ?? null,

    description: getCommentText(parameter.comment),
  };
}

function createFlags(reflection) {
  return {
    static: reflection.flags.isStatic,
    readonly: reflection.flags.isReadonly,
    optional: reflection.flags.isOptional,
    abstract: reflection.flags.isAbstract,
    protected: reflection.flags.isProtected,
    private: reflection.flags.isPrivate,
    external: reflection.flags.isExternal,
    const: reflection.flags.isConst,
  };
}

/**
 * @param {import("typedoc").Reflection} reflection
 */
function getSources(reflection) {
  return (
    reflection.sources?.map((source) => ({
      fileName: source.fileName ?? null,
      line: source.line ?? null,
      character: source.character ?? null,
      url: source.url ?? null,
    })) ?? []
  );
}

/**
 * @param {import("typedoc").Comment | undefined} comment
 */
function getCommentText(comment) {
  if (!comment) {
    return "";
  }

  return comment.summary
    .map((part) => part.text)
    .join("")
    .trim();
}

/**
 * @param {import("typedoc").Comment | undefined} comment
 */
function getBlockTagText(comment, tagName) {
  if (!comment) {
    return "";
  }

  const tag = comment.blockTags.find((blockTag) => blockTag.tag === tagName);

  if (!tag) {
    return "";
  }

  return tag.content
    .map((part) => part.text)
    .join("")
    .trim();
}

function getKindName(kind) {
  return ReflectionKind[kind] ?? "Unknown";
}

function getKindDirectory(kind) {
  switch (kind) {
    case ReflectionKind.Class:
      return "classes";

    case ReflectionKind.Interface:
      return "interfaces";

    case ReflectionKind.TypeAlias:
      return "types";

    case ReflectionKind.Variable:
      return "variables";

    case ReflectionKind.Function:
      return "functions";

    case ReflectionKind.Enum:
      return "enums";

    case ReflectionKind.Namespace:
      return "namespaces";

    default:
      return "other";
  }
}

function createSlug(name) {
  return name.replaceAll(/[^a-zA-Z0-9._-]/g, "-");
}

function createAnchor(name) {
  return name
    .replaceAll(/([a-z])([A-Z])/g, "$1-$2")
    .replaceAll(/[^a-zA-Z0-9_-]/g, "-")
    .toLowerCase();
}

function serialize(value) {
  return JSON.stringify(value, null, 2);
}

async function generateLayout(outputPath) {
  const source = `import "./_components/api.css";

export default function ApiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
`;

  await writeFile(join(outputPath, "layout.tsx"), source, "utf8");
}

async function generateIndexPage(outputPath, projectName, reflections) {
  const indexData = reflections.map((reflection) => ({
    id: reflection.id,
    name: reflection.name,
    route: reflection.route,
    kind: reflection.kind,
    kindId: reflection.kindId,
    description: reflection.description,
  }));

  const source = `import { ApiIndexPage } from "./_components/api-index-page";

const reflections = ${serialize(indexData)} as const;

export default function Page() {
  return (
    <ApiIndexPage
      projectName=${JSON.stringify(projectName)}
      reflections={reflections}
    />
  );
}
`;

  await writeFile(join(outputPath, "page.tsx"), source, "utf8");
}

async function generateHierarchyPage(
  outputPath,
  projectName,
  reflections,
  navigation,
) {
  const classes = reflections
    .filter((reflection) => reflection.kind === "Class")
    .map((reflection) => ({
      id: reflection.id,
      name: reflection.name,
      route: reflection.route,
      kind: reflection.kind,
      kindId: reflection.kindId,
      extends: reflection.hierarchy.extends,
      extendedBy: reflection.hierarchy.extendedBy,
    }));

  const directory = join(outputPath, "hierarchy");

  await mkdir(directory, {
    recursive: true,
  });

  const source = `import { ApiHierarchyPage } from "../_components/api-hierarchy-page";

const classes = ${serialize(classes)} as const;

const navigation = ${serialize(navigation)} as const;

export default function Page() {
  return (
    <ApiHierarchyPage
      projectName=${JSON.stringify(projectName)}
      classes={classes}
      navigation={navigation}
    />
  );
}
`;

  await writeFile(join(directory, "page.tsx"), source, "utf8");
}

async function generateReflectionPage(
  outputPath,
  projectName,
  reflection,
  navigation,
) {
  const directory = join(outputPath, reflection.route);

  await mkdir(directory, {
    recursive: true,
  });

  const source = `import { ApiReflectionPage } from "../../_components/api-reflection-page";

const api = ${serialize(reflection)} as const;

const navigation = ${serialize(navigation)} as const;

export default function Page() {
  return (
    <ApiReflectionPage
      projectName=${JSON.stringify(projectName)}
      api={api}
      navigation={navigation}
    />
  );
}
`;

  await writeFile(join(directory, "page.tsx"), source, "utf8");
}

async function generateSharedFiles(outputPath) {
  const directory = join(outputPath, "_components");

  await mkdir(directory, {
    recursive: true,
  });

  await Promise.all([
    writeFile(join(directory, "types.ts"), TYPES_COMPONENT, "utf8"),

    writeFile(join(directory, "api.css"), API_CSS, "utf8"),

    writeFile(
      join(directory, "typedoc-icon.tsx"),
      TYPEDOC_ICON_COMPONENT,
      "utf8",
    ),

    writeFile(
      join(directory, "type-expression.tsx"),
      TYPE_EXPRESSION_COMPONENT,
      "utf8",
    ),

    writeFile(join(directory, "api-shell.tsx"), API_SHELL_COMPONENT, "utf8"),

    writeFile(
      join(directory, "api-index-page.tsx"),
      API_INDEX_PAGE_COMPONENT,
      "utf8",
    ),

    writeFile(
      join(directory, "api-hierarchy-page.tsx"),
      API_HIERARCHY_PAGE_COMPONENT,
      "utf8",
    ),

    writeFile(
      join(directory, "api-reflection-page.tsx"),
      API_REFLECTION_PAGE_COMPONENT,
      "utf8",
    ),
  ]);
}

const TYPES_COMPONENT = `export interface ApiNavigationItem {
  readonly id: number;
  readonly name: string;
  readonly route: string;
  readonly kind: string;
  readonly kindId: number;
}

export interface ApiIndexReflection
  extends ApiNavigationItem {
  readonly description: string;
}

export interface ApiSource {
  readonly fileName: string | null;
  readonly line: number | null;
  readonly character: number | null;
  readonly url: string | null;
}

export interface ApiFlags {
  readonly static: boolean;
  readonly readonly: boolean;
  readonly optional: boolean;
  readonly abstract: boolean;
  readonly protected: boolean;
  readonly private: boolean;
  readonly external: boolean;
  readonly const: boolean;
}

export interface ApiTypeParameter {
  readonly name: string;
  readonly type: string | null;
  readonly default: string | null;
  readonly description: string;
}

export interface ApiParameter {
  readonly id: number;
  readonly name: string;
  readonly type: string;
  readonly optional: boolean;
  readonly defaultValue: string | null;
  readonly description: string;
}

export interface ApiSignature {
  readonly id: number;
  readonly name: string;
  readonly description: string;

  readonly typeParameters:
    readonly ApiTypeParameter[];

  readonly parameters:
    readonly ApiParameter[];

  readonly returns: string;
  readonly returnsDescription: string;

  readonly sources:
    readonly ApiSource[];

  readonly inheritedFrom:
    string | null;

  readonly overwrites:
    string | null;

  readonly implementationOf:
    string | null;
}

export interface ApiMember {
  readonly id: number;
  readonly name: string;
  readonly anchor: string;

  readonly kind: string;
  readonly kindId: number;

  readonly description: string;
  readonly type: string | null;

  readonly defaultValue:
    string | null;

  readonly flags: ApiFlags;

  readonly sources:
    readonly ApiSource[];

  readonly inheritedFrom:
    string | null;

  readonly overwrites:
    string | null;

  readonly implementationOf:
    string | null;

  readonly typeParameters:
    readonly ApiTypeParameter[];

  readonly signatures:
    readonly ApiSignature[];

  readonly typeDeclaration:
    readonly ApiMember[];
}

export interface ApiReflection {
  readonly id: number;

  readonly name: string;
  readonly slug: string;
  readonly route: string;

  readonly kind: string;
  readonly kindId: number;

  readonly description: string;

  readonly type:
    string | null;

  readonly flags: ApiFlags;

  readonly sources:
    readonly ApiSource[];

  readonly hierarchy: {
    readonly extends:
      readonly string[];

    readonly extendedBy:
      readonly string[];
  };

  readonly inheritedFrom:
    string | null;

  readonly overwrites:
    string | null;

  readonly implementationOf:
    string | null;

  readonly typeParameters:
    readonly ApiTypeParameter[];

  readonly signatures:
    readonly ApiSignature[];

  readonly children:
    readonly ApiMember[];

  readonly typeDeclaration:
    readonly ApiMember[];
}
`;

const TYPEDOC_ICON_COMPONENT = `interface TypeDocIconProps {
  readonly kind:
    number | string;

  readonly label?: string;

  readonly className?: string;
}

export function TypeDocIcon({
  kind,
  label,
  className = "size-5",
}: TypeDocIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={
        "typedoc-kind-icon " +
        className
      }
      aria-label={label}
      aria-hidden={
        label ? undefined : true
      }
    >
      <use
        href={
          "/docs/api/assets/icons.svg#icon-" +
          kind
        }
      />
    </svg>
  );
}

export function TypeDocUtilityIcon({
  name,
  className = "size-4",
}: {
  readonly name:
    | "anchor"
    | "chevronDown"
    | "search"
    | "menu"
    | "folder";

  readonly className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <use
        href={
          "/docs/api/assets/icons.svg#icon-" +
          name
        }
      />
    </svg>
  );
}
`;

const TYPE_EXPRESSION_COMPONENT = `import Link from "next/link";

import type {
  ApiNavigationItem,
} from "./types";

const KEYWORDS = new Set([
  "abstract",
  "as",
  "boolean",
  "const",
  "extends",
  "false",
  "in",
  "keyof",
  "never",
  "null",
  "number",
  "object",
  "readonly",
  "string",
  "symbol",
  "true",
  "typeof",
  "undefined",
  "unknown",
  "void",
]);

interface TypeExpressionProps {
  readonly value: string;
  readonly navigation:
    readonly ApiNavigationItem[];
}

export function TypeExpression({
  value,
  navigation,
}: TypeExpressionProps) {
  const names = new Map(
    navigation.map((item) => [
      item.name,
      item,
    ]),
  );

  const pieces = value.split(
    /([A-Za-z_$][A-Za-z0-9_$]*|\\s+|=>|[{}()[\\]<>:;,?&|.=])/g,
  );

  return (
    <>
      {pieces.map(
        (piece, index) => {
          if (!piece) {
            return null;
          }

          const target =
            names.get(piece);

          if (target) {
            return (
              <Link
                key={index}
                href={
                  "/docs/api/" +
                  target.route
                }
                className={
                  "typedoc-type-link typedoc-kind-" +
                  kindClass(
                    target.kind,
                  )
                }
              >
                {piece}
              </Link>
            );
          }

          if (
            KEYWORDS.has(piece)
          ) {
            return (
              <span
                key={index}
                className="typedoc-keyword"
              >
                {piece}
              </span>
            );
          }

          if (
            /^[{}()[\\]<>:;,?&|.=]$/.test(
              piece,
            ) ||
            piece === "=>"
          ) {
            return (
              <span
                key={index}
                className="typedoc-symbol"
              >
                {piece}
              </span>
            );
          }

          if (
            /^["']/.test(piece) ||
            /^\\d/.test(piece)
          ) {
            return (
              <span
                key={index}
                className="typedoc-literal"
              >
                {piece}
              </span>
            );
          }

          return (
            <span key={index}>
              {piece}
            </span>
          );
        },
      )}
    </>
  );
}

function kindClass(kind: string) {
  return kind
    .replace(
      /([a-z])([A-Z])/g,
      "$1-$2",
    )
    .toLowerCase();
}
`;

const API_SHELL_COMPONENT = `import Link from "next/link";

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
`;

const API_INDEX_PAGE_COMPONENT = `import Link from "next/link";

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
`;

const API_HIERARCHY_PAGE_COMPONENT = `import Link from "next/link";

import { ApiShell } from "./api-shell";

import { TypeDocIcon } from "./typedoc-icon";

import type {
  ApiNavigationItem,
} from "./types";

interface HierarchyClass {
  readonly id: number;
  readonly name: string;
  readonly route: string;
  readonly kind: string;
  readonly kindId: number;

  readonly extends:
    readonly string[];

  readonly extendedBy:
    readonly string[];
}

interface ApiHierarchyPageProps {
  readonly projectName: string;

  readonly classes:
    readonly HierarchyClass[];

  readonly navigation:
    readonly ApiNavigationItem[];
}

export function ApiHierarchyPage({
  projectName,
  classes,
  navigation,
}: ApiHierarchyPageProps) {
  const names = new Map(
    classes.map((item) => [
      item.name,
      item,
    ]),
  );

  const roots = classes.filter(
    (item) =>
      !item.extends.some(
        (base) =>
          names.has(
            stripGeneric(base),
          ),
      ),
  );

  return (
    <ApiShell
      projectName={projectName}
      navigation={navigation}
    >
      <div className="typedoc-page-title">
        <h1>
          {projectName}
        </h1>
      </div>

      <h2>
        Hierarchy Summary
      </h2>

      <ul className="typedoc-hierarchy-tree">
        {roots.map((root) => (
          <HierarchyNode
            key={root.id}
            item={root}
            classes={classes}
          />
        ))}
      </ul>
    </ApiShell>
  );
}

function HierarchyNode({
  item,
  classes,
}: {
  readonly item:
    HierarchyClass;

  readonly classes:
    readonly HierarchyClass[];
}) {
  const children =
    classes.filter(
      (candidate) =>
        candidate.extends.some(
          (base) =>
            stripGeneric(base) ===
            item.name,
        ),
    );

  return (
    <li>
      <Link
        href={
          "/docs/api/" +
          item.route
        }
        className="typedoc-hierarchy-link"
      >
        <TypeDocIcon
          kind={item.kindId}
          label={item.kind}
          className="size-5"
        />

        {item.name}
      </Link>

      {children.length > 0 && (
        <ul>
          {children.map(
            (child) => (
              <HierarchyNode
                key={child.id}
                item={child}
                classes={
                  classes
                }
              />
            ),
          )}
        </ul>
      )}
    </li>
  );
}

function stripGeneric(value: string) {
  const index =
    value.indexOf("<");

  return (
    index === -1
      ? value
      : value.slice(0, index)
  );
}
`;

const API_REFLECTION_PAGE_COMPONENT = `import Link from "next/link";

import { ApiShell } from "./api-shell";

import {
  TypeDocIcon,
  TypeDocUtilityIcon,
} from "./typedoc-icon";

import { TypeExpression } from "./type-expression";

import type {
  ApiMember,
  ApiNavigationItem,
  ApiReflection,
  ApiSignature,
  ApiSource,
} from "./types";

interface ApiReflectionPageProps {
  readonly projectName: string;

  readonly api: ApiReflection;

  readonly navigation:
    readonly ApiNavigationItem[];
}

export function ApiReflectionPage({
  projectName,
  api,
  navigation,
}: ApiReflectionPageProps) {
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

  const remaining =
    api.children.filter(
      (member) =>
        !constructors.includes(
          member,
        ) &&
        !properties.includes(
          member,
        ) &&
        !accessors.includes(
          member,
        ) &&
        !methods.includes(
          member,
        ),
    );

  const topLevelMembers =
    api.typeDeclaration.length > 0
      ? api.typeDeclaration
      : properties;

  const pageNavigation = (
    <PageNavigation
      groups={[
        {
          title: "Constructors",
          members: constructors,
        },
        {
          title: "Properties",
          members:
            api.typeDeclaration
              .length > 0
              ? api.typeDeclaration
              : properties,
        },
        {
          title: "Accessors",
          members: accessors,
        },
        {
          title: "Methods",
          members: methods,
        },
        {
          title: "Members",
          members: remaining,
        },
      ]}
    />
  );

  return (
    <ApiShell
      projectName={projectName}
      navigation={navigation}
      activeId={api.id}
      pageNavigation={
        pageNavigation
      }
    >
      <div className="typedoc-page-title">
        <div className="typedoc-breadcrumb">
          <Link href="/docs/api">
            {projectName}
          </Link>

          <span>/</span>

          <span>
            {api.name}
          </span>
        </div>

        <h1>
          {pageTitle(api)}
          {api.flags.const && (
            <Tag>
              Const
            </Tag>
          )}
        </h1>
      </div>

      {api.description && (
        <section className="typedoc-comment">
          <p>
            {api.description}
          </p>
        </section>
      )}

      {api.kind ===
        "Interface" && (
        <InterfaceSignature
          api={api}
          navigation={
            navigation
          }
        />
      )}

      {api.kind ===
        "TypeAlias" && (
        <TypeAliasSignature
          api={api}
          navigation={
            navigation
          }
        />
      )}

      {api.kind ===
        "Variable" && (
        <VariableSignature
          api={api}
          navigation={
            navigation
          }
        />
      )}

      {api.kind ===
        "Class" && (
        <Hierarchy
          api={api}
          navigation={
            navigation
          }
        />
      )}

      <RelationshipInfo
        api={api}
      />

      <Sources
        sources={api.sources}
      />

      {(constructors.length >
        0 ||
        topLevelMembers.length >
          0 ||
        accessors.length >
          0 ||
        methods.length > 0 ||
        remaining.length >
          0) && (
        <MemberIndex
          groups={[
            {
              title:
                "Constructors",
              members:
                constructors,
            },
            {
              title:
                "Properties",
              members:
                topLevelMembers,
            },
            {
              title:
                "Accessors",
              members:
                accessors,
            },
            {
              title:
                "Methods",
              members:
                methods,
            },
            {
              title:
                "Members",
              members:
                remaining,
            },
          ]}
        />
      )}

      {api.kind ===
        "Variable" &&
        api.typeDeclaration
          .length > 0 && (
          <TypeDeclaration
            members={
              api.typeDeclaration
            }
            navigation={
              navigation
            }
          />
        )}

      <MemberGroup
        title="Constructors"
        members={constructors}
        navigation={navigation}
      />

      {api.kind !==
        "Interface" &&
        api.kind !==
          "Variable" && (
          <MemberGroup
            title="Properties"
            members={properties}
            navigation={
              navigation
            }
          />
        )}

      {api.kind ===
        "Interface" && (
        <MemberGroup
          title="Properties"
          members={properties}
          navigation={
            navigation
          }
        />
      )}

      {api.kind ===
        "TypeAlias" &&
        api.typeDeclaration
          .length > 0 && (
          <MemberGroup
            title="Properties"
            members={
              api.typeDeclaration
            }
            navigation={
              navigation
            }
          />
        )}

      <MemberGroup
        title="Accessors"
        members={accessors}
        navigation={navigation}
      />

      <MemberGroup
        title="Methods"
        members={methods}
        navigation={navigation}
      />

      <MemberGroup
        title="Members"
        members={remaining}
        navigation={navigation}
      />

      {api.signatures.length >
        0 && (
        <SignatureGroup
          signatures={
            api.signatures
          }
          navigation={
            navigation
          }
        />
      )}
    </ApiShell>
  );
}

function pageTitle(
  api: ApiReflection,
) {
  const parameters =
    api.typeParameters.length > 0
      ? "<" +
        api.typeParameters
          .map(
            (parameter) =>
              parameter.name,
          )
          .join(", ") +
        ">"
      : "";

  switch (api.kind) {
    case "Class":
      return (
        "Class " +
        api.name +
        parameters
      );

    case "Interface":
      return (
        "Interface " +
        api.name +
        parameters
      );

    case "TypeAlias":
      return (
        "Type Alias " +
        api.name +
        parameters
      );

    case "Variable":
      return (
        "Variable " +
        api.name
      );

    case "Function":
      return (
        "Function " +
        api.name
      );

    default:
      return (
        api.kind +
        " " +
        api.name +
        parameters
      );
  }
}

function InterfaceSignature({
  api,
  navigation,
}: {
  readonly api: ApiReflection;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <SignatureBox>
      <span className="typedoc-keyword">
        interface
      </span>{" "}

      <span className="typedoc-kind-interface">
        {api.name}
      </span>

      <TypeParameters
        api={api}
        navigation={navigation}
      />

      {" {"}

      {api.children.map(
        (member) => (
          <div
            key={member.id}
            className="typedoc-signature-line"
          >
            <a
              href={
                "#" +
                member.anchor
              }
              className="typedoc-kind-property"
            >
              {member.name}
            </a>

            {member.flags.optional
              ? "?: "
              : ": "}

            <TypeExpression
              value={
                member.type ??
                "unknown"
              }
              navigation={
                navigation
              }
            />

            {";"}
          </div>
        ),
      )}

      {"}"}
    </SignatureBox>
  );
}

function TypeAliasSignature({
  api,
  navigation,
}: {
  readonly api: ApiReflection;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <SignatureBox>
      <span className="typedoc-keyword">
        type
      </span>{" "}

      <span className="typedoc-kind-type-alias">
        {api.name}
      </span>

      <TypeParameters
        api={api}
        navigation={navigation}
      />

      {" = "}

      <TypeExpression
        value={
          api.type ??
          "unknown"
        }
        navigation={navigation}
      />
    </SignatureBox>
  );
}

function VariableSignature({
  api,
  navigation,
}: {
  readonly api: ApiReflection;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <SignatureBox>
      <span className="typedoc-kind-variable">
        {api.name}
      </span>

      {": "}

      <TypeExpression
        value={
          api.type ??
          "unknown"
        }
        navigation={navigation}
      />
    </SignatureBox>
  );
}

function TypeParameters({
  api,
  navigation,
}: {
  readonly api: ApiReflection;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  if (
    api.typeParameters.length ===
    0
  ) {
    return null;
  }

  return (
    <>
      {"<"}

      {api.typeParameters.map(
        (
          parameter,
          index,
        ) => (
          <span
            key={
              parameter.name
            }
          >
            {index > 0
              ? ", "
              : ""}

            <span className="typedoc-type-parameter">
              {
                parameter.name
              }
            </span>

            {parameter.type && (
              <>
                {" extends "}

                <TypeExpression
                  value={
                    parameter.type
                  }
                  navigation={
                    navigation
                  }
                />
              </>
            )}

            {parameter.default && (
              <>
                {" = "}

                <TypeExpression
                  value={
                    parameter.default
                  }
                  navigation={
                    navigation
                  }
                />
              </>
            )}
          </span>
        ),
      )}

      {">"}
    </>
  );
}

function Hierarchy({
  api,
  navigation,
}: {
  readonly api: ApiReflection;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  if (
    api.hierarchy.extends
      .length === 0 &&
    api.hierarchy.extendedBy
      .length === 0
  ) {
    return null;
  }

  return (
    <section className="typedoc-hierarchy-panel">
      <h4>
        Hierarchy
      </h4>

      <ul>
        {api.hierarchy.extends.map(
          (base) => (
            <li key={base}>
              <TypeExpression
                value={base}
                navigation={
                  navigation
                }
              />

              <ul>
                <li className="typedoc-hierarchy-target">
                  {api.name}
                </li>
              </ul>
            </li>
          ),
        )}

        {api.hierarchy.extends
          .length === 0 && (
          <li className="typedoc-hierarchy-target">
            {api.name}

            {api.hierarchy
              .extendedBy.length >
              0 && (
              <ul>
                {api.hierarchy.extendedBy.map(
                  (child) => (
                    <li
                      key={
                        child
                      }
                    >
                      <TypeExpression
                        value={
                          child
                        }
                        navigation={
                          navigation
                        }
                      />
                    </li>
                  ),
                )}
              </ul>
            )}
          </li>
        )}
      </ul>
    </section>
  );
}

function RelationshipInfo({
  api,
}: {
  readonly api: ApiReflection;
}) {
  const rows = [
    api.inheritedFrom
      ? [
          "Inherited from",
          api.inheritedFrom,
        ]
      : null,

    api.overwrites
      ? [
          "Overrides",
          api.overwrites,
        ]
      : null,

    api.implementationOf
      ? [
          "Implements",
          api.implementationOf,
        ]
      : null,
  ].filter(
    (
      value,
    ): value is [
      string,
      string,
    ] => value !== null,
  );

  if (rows.length === 0) {
    return null;
  }

  return (
    <aside className="typedoc-relationships">
      {rows.map(
        ([label, value]) => (
          <p key={label}>
            {label}{" "}
            <code>
              {value}
            </code>
          </p>
        ),
      )}
    </aside>
  );
}

function MemberIndex({
  groups,
}: {
  readonly groups: readonly {
    readonly title: string;

    readonly members:
      readonly ApiMember[];
  }[];
}) {
  return (
    <section className="typedoc-index-panel">
      <h5>
        Index
      </h5>

      {groups.map(
        (group) => {
          if (
            group.members
              .length === 0
          ) {
            return null;
          }

          return (
            <section
              key={
                group.title
              }
              className="typedoc-index-section"
            >
              <h3>
                {group.title}
              </h3>

              <div className="typedoc-index-list">
                {group.members.map(
                  (member) => (
                    <a
                      key={
                        member.id
                      }
                      href={
                        "#" +
                        member.anchor
                      }
                    >
                      <TypeDocIcon
                        kind={
                          member.kindId
                        }
                        label={
                          member.kind
                        }
                        className="size-5"
                      />

                      <span>
                        {
                          member.name
                        }

                        {member.flags.optional
                          ? "?"
                          : ""}
                      </span>
                    </a>
                  ),
                )}
              </div>
            </section>
          );
        },
      )}
    </section>
  );
}

function MemberGroup({
  title,
  members,
  navigation,
}: {
  readonly title: string;

  readonly members:
    readonly ApiMember[];

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  if (members.length === 0) {
    return null;
  }

  return (
    <details
      open
      className="typedoc-member-group"
    >
      <summary className="typedoc-group-summary">
        <h2>
          {title}
        </h2>
      </summary>

      <div>
        {members.map(
          (member) => (
            <Member
              key={member.id}
              member={member}
              navigation={
                navigation
              }
            />
          ),
        )}
      </div>
    </details>
  );
}

function Member({
  member,
  navigation,
}: {
  readonly member: ApiMember;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <section
      id={member.anchor}
      className="typedoc-member"
    >
      <h3>
        {member.flags.optional && (
          <Tag>
            Optional
          </Tag>
        )}

        {member.flags.readonly && (
          <Tag>
            Readonly
          </Tag>
        )}

        {member.flags.static && (
          <Tag>
            Static
          </Tag>
        )}

        {member.flags.abstract && (
          <Tag>
            Abstract
          </Tag>
        )}

        <span>
          {member.name}
        </span>

        <Anchor
          id={member.anchor}
        />
      </h3>

      {member.type && (
        <SignatureBox>
          <span
            className={
              "typedoc-kind-" +
              kindClass(
                member.kind,
              )
            }
          >
            {member.name}
          </span>

          {member.flags.optional
            ? "?: "
            : ": "}

          <TypeExpression
            value={member.type}
            navigation={
              navigation
            }
          />
        </SignatureBox>
      )}

      {member.description && (
        <div className="typedoc-comment">
          <p>
            {
              member.description
            }
          </p>
        </div>
      )}

      {member.signatures.map(
        (signature) => (
          <Signature
            key={
              signature.id
            }
            signature={
              signature
            }
            navigation={
              navigation
            }
          />
        ),
      )}

      {member.typeDeclaration
        .length > 0 && (
        <TypeDeclaration
          members={
            member.typeDeclaration
          }
          navigation={
            navigation
          }
        />
      )}

      <Sources
        sources={
          member.sources
        }
      />
    </section>
  );
}

function SignatureGroup({
  signatures,
  navigation,
}: {
  readonly signatures:
    readonly ApiSignature[];

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <section className="typedoc-signature-group">
      {signatures.map(
        (signature) => (
          <Signature
            key={
              signature.id
            }
            signature={
              signature
            }
            navigation={
              navigation
            }
          />
        ),
      )}
    </section>
  );
}

function Signature({
  signature,
  navigation,
}: {
  readonly signature:
    ApiSignature;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <div className="typedoc-signature-block">
      <SignatureBox>
        <span className="typedoc-kind-method">
          {signature.name}
        </span>

        {"("}

        {signature.parameters.map(
          (
            parameter,
            index,
          ) => (
            <span
              key={
                parameter.id
              }
            >
              {index > 0
                ? ", "
                : ""}

              <span className="typedoc-parameter">
                {
                  parameter.name
                }
              </span>

              {parameter.optional
                ? "?: "
                : ": "}

              <TypeExpression
                value={
                  parameter.type
                }
                navigation={
                  navigation
                }
              />
            </span>
          ),
        )}

        {"): "}

        <TypeExpression
          value={
            signature.returns
          }
          navigation={
            navigation
          }
        />
      </SignatureBox>

      {signature.description && (
        <div className="typedoc-comment">
          <p>
            {
              signature.description
            }
          </p>
        </div>
      )}

      {signature.parameters
        .length > 0 && (
        <div className="typedoc-parameters">
          <h4>
            Parameters
          </h4>

          <ul>
            {signature.parameters.map(
              (parameter) => (
                <li
                  key={
                    parameter.id
                  }
                >
                  <div>
                    {parameter.optional && (
                      <Tag>
                        Optional
                      </Tag>
                    )}

                    <span className="typedoc-parameter">
                      {
                        parameter.name
                      }
                    </span>

                    {": "}

                    <TypeExpression
                      value={
                        parameter.type
                      }
                      navigation={
                        navigation
                      }
                    />
                  </div>

                  {parameter.description && (
                    <p>
                      {
                        parameter.description
                      }
                    </p>
                  )}
                </li>
              ),
            )}
          </ul>
        </div>
      )}

      <h4 className="typedoc-returns">
        Returns{" "}

        <TypeExpression
          value={
            signature.returns
          }
          navigation={
            navigation
          }
        />
      </h4>

      {signature.returnsDescription && (
        <p className="typedoc-return-description">
          {
            signature.returnsDescription
          }
        </p>
      )}

      <Sources
        sources={
          signature.sources
        }
      />
    </div>
  );
}

function TypeDeclaration({
  members,
  navigation,
}: {
  readonly members:
    readonly ApiMember[];

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <div className="typedoc-type-declaration">
      <h4>
        Type Declaration
      </h4>

      <ul>
        {members.map(
          (member) => (
            <li
              key={member.id}
              id={member.anchor}
            >
              <h5>
                {member.flags.readonly && (
                  <Tag>
                    Readonly
                  </Tag>
                )}

                {member.flags.optional && (
                  <Tag>
                    Optional
                  </Tag>
                )}

                <span className="typedoc-kind-property">
                  {member.name}
                </span>

                {member.flags.optional
                  ? "?: "
                  : ": "}

                <TypeExpression
                  value={
                    member.type ??
                    "unknown"
                  }
                  navigation={
                    navigation
                  }
                />
              </h5>

              {member.description && (
                <div className="typedoc-comment">
                  <p>
                    {
                      member.description
                    }
                  </p>
                </div>
              )}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

function PageNavigation({
  groups,
}: {
  readonly groups: readonly {
    readonly title: string;

    readonly members:
      readonly ApiMember[];
  }[];
}) {
  const visible =
    groups.filter(
      (group) =>
        group.members.length >
        0,
    );

  if (visible.length === 0) {
    return null;
  }

  return (
    <details open>
      <summary>
        <strong>
          On This Page
        </strong>
      </summary>

      <div className="typedoc-page-navigation">
        {visible.map(
          (group) => (
            <details
              key={
                group.title
              }
              open
            >
              <summary>
                {
                  group.title
                }
              </summary>

              <div>
                {group.members.map(
                  (member) => (
                    <a
                      key={
                        member.id
                      }
                      href={
                        "#" +
                        member.anchor
                      }
                    >
                      <TypeDocIcon
                        kind={
                          member.kindId
                        }
                        label={
                          member.kind
                        }
                        className="size-4"
                      />

                      <span>
                        {
                          member.name
                        }
                      </span>
                    </a>
                  ),
                )}
              </div>
            </details>
          ),
        )}
      </div>
    </details>
  );
}

function Sources({
  sources,
}: {
  readonly sources:
    readonly ApiSource[];
}) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <aside className="typedoc-sources">
      <ul>
        {sources.map(
          (
            source,
            index,
          ) => {
            const text =
              (source.fileName ??
                "Unknown") +
              (
                source.line
                  ? ":" +
                    source.line
                  : ""
              );

            return (
              <li key={index}>
                Defined in{" "}

                {source.url ? (
                  <a
                    href={
                      source.url
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {text}
                  </a>
                ) : (
                  text
                )}
              </li>
            );
          },
        )}
      </ul>
    </aside>
  );
}

function SignatureBox({
  children,
}: {
  readonly children:
    React.ReactNode;
}) {
  return (
    <div className="typedoc-signature">
      {children}
    </div>
  );
}

function Anchor({
  id,
}: {
  readonly id: string;
}) {
  return (
    <a
      href={"#" + id}
      className="typedoc-anchor"
      aria-label={
        "Permalink to " + id
      }
    >
      <TypeDocUtilityIcon
        name="anchor"
        className="size-4"
      />
    </a>
  );
}

function Tag({
  children,
}: {
  readonly children:
    React.ReactNode;
}) {
  return (
    <code className="typedoc-tag">
      {children}
    </code>
  );
}

function kindClass(kind: string) {
  return kind
    .replace(
      /([a-z])([A-Z])/g,
      "$1-$2",
    )
    .toLowerCase();
}
`;

const API_CSS = `:root {
  --typedoc-background: #2b2e33;
  --typedoc-background-secondary: #1e2024;
  --typedoc-background-active: #5d5d6a;

  --typedoc-text: #f5f5f5;
  --typedoc-text-aside: #a8abb2;
  --typedoc-border: #41444a;

  --typedoc-link: #00aff4;

  --color-icon-background: #1e2024;
  --color-icon-text: #f5f5f5;

  --color-ts-keyword: #3399ff;
  --color-ts-project: #e358ff;
  --color-ts-module: #e358ff;
  --color-ts-namespace: #e358ff;

  --color-ts-enum: #f4d93e;
  --color-ts-enum-member: #f4d93e;

  --color-ts-variable: #798dff;
  --color-ts-function: #a280ff;

  --color-ts-class: #8ac4ff;
  --color-ts-interface: #6cff87;

  --color-ts-constructor: #8ac4ff;
  --color-ts-property: #ff984d;
  --color-ts-method: #ff4db8;

  --color-ts-reference: #ff4d82;

  --color-ts-parameter: #798dff;
  --color-ts-type-parameter: #e07d13;

  --color-ts-accessor: #ff6060;
  --color-ts-type-alias: #ff6492;

  --color-document: #ffffff;
}

.typedoc-shell {
  min-height: 100vh;
  color: var(--typedoc-text);
}

.typedoc-toolbar {
  position: sticky;
  top: 0;
  z-index: 30;

  border-bottom: 1px solid
    rgba(255, 255, 255, 0.08);

  background:
    rgba(9, 9, 9, 0.94);

  backdrop-filter: blur(14px);
}

.typedoc-toolbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1440px;
  height: 42px;

  margin: 0 auto;
  padding: 0 24px;
}

.typedoc-toolbar-title {
  font-size: 14px;
  font-weight: 600;
  color: #f4f4f5;
}

.typedoc-toolbar-actions {
  display: flex;
  gap: 16px;
}

.typedoc-toolbar-link {
  font-size: 12px;
  color: #71717a;
}

.typedoc-toolbar-link:hover {
  color: #f4f4f5;
}

.typedoc-layout {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    300px;

  max-width: 1440px;
  margin: 0 auto;
}

.typedoc-content {
  min-width: 0;
  padding: 48px 54px 64px;
}

.typedoc-sidebar {
  border-left: 1px solid
    rgba(255, 255, 255, 0.07);

  padding: 32px 24px;
}

.typedoc-page-menu,
.typedoc-site-menu {
  position: sticky;
}

.typedoc-page-menu {
  top: 72px;
}

.typedoc-site-menu {
  margin-top: 30px;
}

.typedoc-page-menu details,
.typedoc-site-menu details {
  margin-bottom: 12px;
}

.typedoc-page-menu summary,
.typedoc-site-menu summary {
  cursor: pointer;

  font-size: 12px;
  color: #a1a1aa;
}

.typedoc-page-navigation {
  padding-top: 10px;
}

.typedoc-page-navigation details {
  margin: 6px 0;
}

.typedoc-page-navigation a {
  display: flex;
  align-items: center;

  gap: 7px;

  padding: 4px 6px;

  font-size: 11px;

  color: #71717a;
}

.typedoc-page-navigation a:hover {
  color: #fb923c;
}

.typedoc-site-title {
  display: block;

  margin-bottom: 14px;

  font-size: 13px;
  font-weight: 600;

  color: #e4e4e7;
}

.typedoc-site-navigation {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.typedoc-nav-group > div {
  margin-top: 4px;
}

.typedoc-nav-link {
  display: flex;
  align-items: center;

  gap: 7px;

  padding: 4px 7px;

  border-radius: 5px;

  font-size: 11px;
  color: #71717a;
}

.typedoc-nav-link:hover {
  background:
    rgba(255, 255, 255, 0.03);

  color: #d4d4d8;
}

.typedoc-nav-link-active {
  color: #fb923c;

  background:
    rgba(249, 115, 22, 0.08);
}

.typedoc-page-title {
  margin-bottom: 24px;
}

.typedoc-page-title h1 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  gap: 10px;

  margin-top: 8px;

  font-size: 32px;
  font-weight: 600;
  line-height: 1.2;

  letter-spacing: -0.02em;
}

.typedoc-breadcrumb {
  display: flex;
  align-items: center;
  gap: 7px;

  font-size: 11px;
  color: #71717a;
}

.typedoc-breadcrumb a:hover {
  color: #d4d4d8;
}

.typedoc-comment {
  margin: 16px 0;

  font-size: 14px;
  line-height: 1.75;

  color: #c4c4ca;
}

.typedoc-comment p + p {
  margin-top: 10px;
}

.typedoc-signature {
  overflow-x: auto;

  margin: 18px 0;

  padding: 14px 16px;

  border-radius: 4px;

  background: #1e1e1e;

  font-family:
    var(--font-geist-mono),
    ui-monospace,
    monospace;

  font-size: 12px;
  line-height: 1.7;

  white-space: pre-wrap;
}

.typedoc-signature-line {
  padding-left: 28px;
}

.typedoc-keyword {
  color:
    var(--color-ts-keyword);
}

.typedoc-symbol {
  color: #a1a1aa;
}

.typedoc-literal {
  color: #ce9178;
}

.typedoc-parameter {
  color:
    var(--color-ts-parameter);
}

.typedoc-type-parameter {
  color:
    var(--color-ts-type-parameter);
}

.typedoc-kind-class {
  color:
    var(--color-ts-class);
}

.typedoc-kind-interface {
  color:
    var(--color-ts-interface);
}

.typedoc-kind-variable {
  color:
    var(--color-ts-variable);
}

.typedoc-kind-function {
  color:
    var(--color-ts-function);
}

.typedoc-kind-method {
  color:
    var(--color-ts-method);
}

.typedoc-kind-property {
  color:
    var(--color-ts-property);
}

.typedoc-kind-accessor {
  color:
    var(--color-ts-accessor);
}

.typedoc-kind-constructor {
  color:
    var(--color-ts-constructor);
}

.typedoc-kind-type-alias {
  color:
    var(--color-ts-type-alias);
}

.typedoc-type-link:hover {
  text-decoration: underline;
}

.typedoc-tag {
  display: inline-block;

  margin-right: 6px;
  padding: 2px 5px;

  border-radius: 4px;

  background:
    rgba(255, 255, 255, 0.07);

  font-size: 9px;
  font-weight: 400;

  color: #c4c4ca;
}

.typedoc-anchor {
  display: inline-flex;

  margin-left: 6px;

  color: #52525b;

  vertical-align: middle;
}

.typedoc-anchor:hover {
  color: #fb923c;
}

.typedoc-hierarchy-panel {
  margin: 24px 0;
}

.typedoc-hierarchy-panel h4 {
  margin-bottom: 8px;

  font-size: 13px;
  font-weight: 600;
}

.typedoc-hierarchy-panel ul {
  margin-left: 18px;

  font-size: 12px;

  color: #a1a1aa;
}

.typedoc-hierarchy-target {
  color: #f4f4f5;
}

.typedoc-relationships {
  margin: 16px 0;

  font-size: 11px;
  color: #71717a;
}

.typedoc-sources {
  margin: 16px 0 24px;

  font-size: 10px;

  color: #71717a;
}

.typedoc-sources ul {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.typedoc-sources a {
  color: #a1a1aa;
}

.typedoc-sources a:hover {
  color: var(--typedoc-link);
}

.typedoc-index-panel {
  margin: 28px 0;

  padding: 18px 20px;

  border: 1px solid
    rgba(255, 255, 255, 0.08);

  border-radius: 5px;
}

.typedoc-index-panel > h5 {
  margin-bottom: 18px;

  font-size: 11px;
  font-weight: 600;

  text-transform: uppercase;

  letter-spacing: 0.12em;

  color: #71717a;
}

.typedoc-index-section {
  margin-top: 16px;
}

.typedoc-index-section h3 {
  margin-bottom: 7px;

  font-size: 13px;
  font-weight: 600;
}

.typedoc-index-list {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 5px 20px;
}

.typedoc-index-list a {
  display: flex;
  align-items: center;

  gap: 7px;

  font-size: 12px;

  color: #a1a1aa;
}

.typedoc-index-list a:hover {
  color: #fb923c;
}

.typedoc-member-group {
  margin: 26px 0;
}

.typedoc-group-summary {
  cursor: pointer;

  list-style: none;

  border-bottom: 1px solid
    rgba(255, 255, 255, 0.08);

  padding-bottom: 8px;
}

.typedoc-group-summary h2 {
  font-size: 22px;
  font-weight: 600;
}

.typedoc-member {
  padding: 24px 0;

  border-bottom: 1px solid
    rgba(255, 255, 255, 0.07);
}

.typedoc-member:last-child {
  border-bottom: 0;
}

.typedoc-member h3 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  gap: 4px;

  font-size: 17px;
  font-weight: 500;
}

.typedoc-parameters {
  margin-top: 18px;
}

.typedoc-parameters h4 {
  margin-bottom: 10px;

  font-size: 13px;
}

.typedoc-parameters ul {
  display: flex;
  flex-direction: column;

  gap: 14px;
}

.typedoc-parameters li {
  font-size: 12px;
}

.typedoc-parameters p {
  margin-top: 5px;

  color: #a1a1aa;

  line-height: 1.6;
}

.typedoc-returns {
  margin-top: 18px;

  font-size: 13px;
}

.typedoc-return-description {
  margin-top: 7px;

  font-size: 12px;
  line-height: 1.6;

  color: #a1a1aa;
}

.typedoc-type-declaration {
  margin: 22px 0;
}

.typedoc-type-declaration > h4 {
  margin-bottom: 12px;

  font-size: 13px;
}

.typedoc-type-declaration > ul {
  display: flex;
  flex-direction: column;

  gap: 14px;
}

.typedoc-type-declaration h5 {
  font-size: 12px;
  font-weight: 400;
}

.typedoc-member-summaries {
  display: flex;
  flex-direction: column;
}

.typedoc-summary-row {
  display: grid;

  grid-template-columns:
    minmax(180px, 0.4fr)
    minmax(0, 1fr);

  gap: 20px;

  padding: 9px 0;

  border-bottom: 1px solid
    rgba(255, 255, 255, 0.05);
}

.typedoc-summary-row dt {
  display: flex;
  align-items: center;

  gap: 7px;

  font-size: 13px;
}

.typedoc-summary-row dd {
  font-size: 12px;
  line-height: 1.55;

  color: #71717a;
}

.typedoc-hierarchy-tree,
.typedoc-hierarchy-tree ul {
  margin: 12px 0 0 18px;
}

.typedoc-hierarchy-tree li {
  margin: 7px 0;
}

.typedoc-hierarchy-link {
  display: inline-flex;
  align-items: center;

  gap: 7px;

  font-size: 13px;

  color: #c4c4ca;
}

.typedoc-footer {
  max-width: 1440px;

  margin: 0 auto;

  padding: 28px 54px;

  border-top: 1px solid
    rgba(255, 255, 255, 0.06);

  font-size: 10px;

  color: #52525b;
}

@media (
  max-width: 960px
) {
  .typedoc-layout {
    grid-template-columns: 1fr;
  }

  .typedoc-sidebar {
    display: none;
  }

  .typedoc-content {
    padding:
      32px 22px
      48px;
  }

  .typedoc-index-list {
    grid-template-columns:
      1fr;
  }

  .typedoc-summary-row {
    grid-template-columns:
      1fr;

    gap: 4px;
  }
}
`;
