import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { ReflectionKind } from "typedoc";

/**
 * @param {import("typedoc").Application} app
 */
export function load(app) {
  app.outputs.addOutput("reactOg", async (outputPath, project) => {
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

    await generateSharedComponents(outputPath);
    await generateIndexPage(outputPath, project.name, reflections);

    for (const reflection of reflections) {
      await generateReflectionPage(
        outputPath,
        project.name,
        reflection,
        reflections,
      );
    }
  });
}

/**
 * @param {import("typedoc").DeclarationReflection} reflection
 */
function createApiReflection(reflection) {
  const routeGroup = getKindDirectory(reflection.kind);

  return {
    id: reflection.id,
    name: reflection.name,
    slug: createSlug(reflection.name),

    kind: getKindName(reflection.kind),
    kindId: reflection.kind,

    route: `${routeGroup}/${createSlug(reflection.name)}`,

    description: getCommentText(reflection.comment),
    type: reflection.type?.toString() ?? null,

    flags: createFlags(reflection),

    source: getSource(reflection),

    hierarchy: getHierarchy(reflection),

    typeParameters:
      reflection.typeParameters?.map((parameter) => ({
        name: parameter.name,
        type: parameter.type?.toString() ?? null,
        default: parameter.default?.toString() ?? null,
        description: getCommentText(parameter.comment),
      })) ?? [],

    signatures:
      reflection.signatures?.map((signature) => createSignature(signature)) ??
      [],

    children: reflection.children?.map((child) => createMember(child)) ?? [],
  };
}

/**
 * @param {import("typedoc").DeclarationReflection} reflection
 */
function createMember(reflection) {
  return {
    id: reflection.id,
    name: reflection.name,

    anchor: createAnchor(reflection.name),

    kind: getKindName(reflection.kind),
    kindId: reflection.kind,

    description: getCommentText(reflection.comment),
    type: reflection.type?.toString() ?? null,

    flags: createFlags(reflection),

    source: getSource(reflection),

    signatures:
      reflection.signatures?.map((signature) => createSignature(signature)) ??
      [],
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

    typeParameters:
      signature.typeParameters?.map((parameter) => ({
        name: parameter.name,
        type: parameter.type?.toString() ?? null,
        default: parameter.default?.toString() ?? null,
      })) ?? [],

    parameters:
      signature.parameters?.map((parameter) => ({
        name: parameter.name,
        type: parameter.type?.toString() ?? "unknown",
        optional: parameter.flags.isOptional,
        defaultValue: parameter.defaultValue ?? null,
        description: getCommentText(parameter.comment),
      })) ?? [],

    returns: signature.type?.toString() ?? "void",

    returnsDescription: getBlockTagText(signature.comment, "@returns"),

    source: getSource(signature),
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
  };
}

/**
 * @param {import("typedoc").Reflection} reflection
 */
function getSource(reflection) {
  const source = reflection.sources?.[0];

  if (!source) {
    return null;
  }

  return {
    fileName: source.fileName ?? null,
    line: source.line ?? null,
    character: source.character ?? null,
    url: source.url ?? null,
  };
}

/**
 * @param {import("typedoc").DeclarationReflection} reflection
 */
function getHierarchy(reflection) {
  const extendedTypes =
    reflection.extendedTypes?.map((type) => type.toString()) ?? [];

  const extendedBy =
    reflection.extendedBy?.map((type) => type.toString()) ?? [];

  return {
    extends: extendedTypes,
    extendedBy,
  };
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

async function generateIndexPage(outputPath, projectName, reflections) {
  const source = `import { ApiIndex } from "./_components/api-index";

const reflections = ${serialize(
    reflections.map((reflection) => ({
      id: reflection.id,
      name: reflection.name,
      slug: reflection.slug,
      route: reflection.route,
      kind: reflection.kind,
      kindId: reflection.kindId,
      description: reflection.description,
    })),
  )} as const;

export default function Page() {
  return (
    <ApiIndex
      name=${JSON.stringify(projectName)}
      reflections={reflections}
    />
  );
}
`;

  await writeFile(join(outputPath, "page.tsx"), source, "utf8");
}

async function generateReflectionPage(
  outputPath,
  projectName,
  reflection,
  reflections,
) {
  const directory = join(outputPath, reflection.route);

  await mkdir(directory, {
    recursive: true,
  });

  const navigation = reflections.map((item) => ({
    id: item.id,
    name: item.name,
    route: item.route,
    kind: item.kind,
    kindId: item.kindId,
  }));

  const source = `import { ApiReferencePage } from "../../_components/api-reference-page";

const api = ${serialize(reflection)} as const;

const navigation = ${serialize(navigation)} as const;

export default function Page() {
  return (
    <ApiReferencePage
      projectName=${JSON.stringify(projectName)}
      api={api}
      navigation={navigation}
    />
  );
}
`;

  await writeFile(join(directory, "page.tsx"), source, "utf8");
}

async function generateSharedComponents(outputPath) {
  const directory = join(outputPath, "_components");

  await mkdir(directory, {
    recursive: true,
  });

  await Promise.all([
    writeFile(join(directory, "types.ts"), TYPES_COMPONENT, "utf8"),

    writeFile(
      join(directory, "typedoc-icon.tsx"),
      TYPEDOC_ICON_COMPONENT,
      "utf8",
    ),

    writeFile(join(directory, "api-index.tsx"), API_INDEX_COMPONENT, "utf8"),

    writeFile(
      join(directory, "api-reference-page.tsx"),
      API_REFERENCE_COMPONENT,
      "utf8",
    ),
  ]);
}

const TYPES_COMPONENT = `export interface ApiIndexReflection {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
  readonly route: string;
  readonly kind: string;
  readonly kindId: number;
  readonly description: string;
}

export interface ApiNavigationItem {
  readonly id: number;
  readonly name: string;
  readonly route: string;
  readonly kind: string;
  readonly kindId: number;
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
}

export interface ApiHierarchy {
  readonly extends: readonly string[];
  readonly extendedBy: readonly string[];
}

export interface ApiTypeParameter {
  readonly name: string;
  readonly type: string | null;
  readonly default: string | null;
  readonly description?: string;
}

export interface ApiParameter {
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

  readonly source: ApiSource | null;
}

export interface ApiMember {
  readonly id: number;
  readonly name: string;
  readonly anchor: string;

  readonly kind: string;
  readonly kindId: number;

  readonly description: string;
  readonly type: string | null;

  readonly flags: ApiFlags;

  readonly source: ApiSource | null;

  readonly signatures:
    readonly ApiSignature[];
}

export interface ApiReflection {
  readonly id: number;
  readonly name: string;
  readonly slug: string;

  readonly kind: string;
  readonly kindId: number;

  readonly route: string;

  readonly description: string;
  readonly type: string | null;

  readonly flags: ApiFlags;

  readonly source: ApiSource | null;

  readonly hierarchy: ApiHierarchy;

  readonly typeParameters:
    readonly ApiTypeParameter[];

  readonly signatures:
    readonly ApiSignature[];

  readonly children:
    readonly ApiMember[];
}
`;

const TYPEDOC_ICON_COMPONENT = `interface TypeDocIconProps {
  readonly kind: number;
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
      className={className}
      aria-label={label}
      aria-hidden={label ? undefined : true}
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
`;

const API_INDEX_COMPONENT = `import Link from "next/link";

import { TypeDocIcon } from "./typedoc-icon";

import type {
  ApiIndexReflection,
} from "./types";

interface ApiIndexProps {
  readonly name: string;

  readonly reflections:
    readonly ApiIndexReflection[];
}

export function ApiIndex({
  name,
  reflections,
}: ApiIndexProps) {
  const groups = Map.groupBy(
    reflections,
    (reflection) => reflection.kind,
  );

  return (
    <article className="mx-auto max-w-5xl px-6 py-14">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-orange-400">
          API Reference
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {name}
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
          Generated directly from the public
          SinterDB TypeScript declarations.
        </p>
      </header>

      <div className="space-y-10">
        {[...groups.entries()].map(
          ([kind, entries]) => (
            <section key={kind}>
              <div className="mb-4 flex items-center gap-3 border-b border-white/[0.07] pb-3">
                <h2 className="text-xl font-semibold text-white">
                  {formatKind(kind)}
                </h2>

                <span className="font-mono text-[10px] text-zinc-600">
                  {entries.length}
                </span>
              </div>

              <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                {entries.map(
                  (reflection) => (
                    <Link
                      key={reflection.id}
                      href={
                        "/docs/api/" +
                        reflection.route
                      }
                      className="group flex items-start gap-2 rounded-md px-2 py-2 text-sm transition hover:bg-white/[0.03]"
                    >
                      <TypeDocIcon
                        kind={
                          reflection.kindId
                        }
                        label={
                          reflection.kind
                        }
                        className="mt-0.5 size-4 shrink-0"
                      />

                      <span className="min-w-0">
                        <span className="block font-mono text-zinc-300 transition group-hover:text-orange-300">
                          {reflection.name}
                        </span>

                        {reflection.description && (
                          <span className="mt-1 line-clamp-2 block text-xs leading-5 text-zinc-600">
                            {
                              reflection.description
                            }
                          </span>
                        )}
                      </span>
                    </Link>
                  ),
                )}
              </div>
            </section>
          ),
        )}
      </div>
    </article>
  );
}

function formatKind(kind: string) {
  return kind
    .replace(
      /([a-z])([A-Z])/g,
      "$1 $2",
    )
    .replace(
      /([A-Z])([A-Z][a-z])/g,
      "$1 $2",
    );
}
`;

const API_REFERENCE_COMPONENT = `import Link from "next/link";

import { TypeDocIcon } from "./typedoc-icon";

import type {
  ApiMember,
  ApiNavigationItem,
  ApiReflection,
  ApiSignature,
  ApiSource,
} from "./types";

interface ApiReferencePageProps {
  readonly projectName: string;
  readonly api: ApiReflection;

  readonly navigation:
    readonly ApiNavigationItem[];
}

export function ApiReferencePage({
  projectName,
  api,
  navigation,
}: ApiReferencePageProps) {
  const constructors =
    api.children.filter(
      (member) =>
        member.kind === "Constructor",
    );

  const properties =
    api.children.filter(
      (member) =>
        member.kind === "Property",
    );

  const accessors =
    api.children.filter(
      (member) =>
        member.kind === "Accessor",
    );

  const methods =
    api.children.filter(
      (member) =>
        member.kind === "Method",
    );

  const otherMembers =
    api.children.filter(
      (member) =>
        !constructors.includes(member) &&
        !properties.includes(member) &&
        !accessors.includes(member) &&
        !methods.includes(member),
    );

  const groupedNavigation =
    Map.groupBy(
      navigation,
      (item) => item.kind,
    );

  const toc = [
    constructors.length > 0
      ? {
          label: "Constructors",
          href: "#constructors",
        }
      : null,

    properties.length > 0
      ? {
          label: "Properties",
          href: "#properties",
        }
      : null,

    accessors.length > 0
      ? {
          label: "Accessors",
          href: "#accessors",
        }
      : null,

    methods.length > 0
      ? {
          label: "Methods",
          href: "#methods",
        }
      : null,

    otherMembers.length > 0
      ? {
          label: "Members",
          href: "#members",
        }
      : null,
  ].filter(
    (
      item,
    ): item is {
      label: string;
      href: string;
    } => item !== null,
  );

  return (
    <div className="mx-auto grid max-w-[1500px] grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)_210px]">
      <aside className="hidden border-r border-white/[0.07] px-4 py-8 xl:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <Link
            href="/docs/api"
            className="mb-6 block text-sm font-semibold text-zinc-200 transition hover:text-white"
          >
            {projectName}
          </Link>

          <nav className="space-y-6">
            {[
              ...groupedNavigation.entries(),
            ].map(([kind, items]) => (
              <section key={kind}>
                <h2 className="mb-2 px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
                  {formatKind(kind)}
                </h2>

                <div className="space-y-0.5">
                  {items.map((item) => {
                    const active =
                      item.id === api.id;

                    return (
                      <Link
                        key={item.id}
                        href={
                          "/docs/api/" +
                          item.route
                        }
                        className={
                          "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition " +
                          (
                            active
                              ? "bg-orange-500/[0.08] text-orange-300"
                              : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300"
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
                          className="size-3.5 shrink-0"
                        />

                        <span className="truncate font-mono">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </nav>
        </div>
      </aside>

      <main className="min-w-0 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <article className="mx-auto max-w-4xl">
          <nav className="mb-7 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
            <Link
              href="/docs"
              className="transition hover:text-zinc-300"
            >
              Docs
            </Link>

            <span>/</span>

            <Link
              href="/docs/api"
              className="transition hover:text-zinc-300"
            >
              API
            </Link>

            <span>/</span>

            <span className="text-zinc-400">
              {formatKind(api.kind)}
            </span>

            <span>/</span>

            <span className="text-zinc-300">
              {api.name}
            </span>
          </nav>

          <header className="pb-8">
            <div className="flex items-center gap-3">
              <TypeDocIcon
                kind={api.kindId}
                label={api.kind}
                className="size-6 shrink-0"
              />

              <span className="font-mono text-xs text-zinc-500">
                {formatKind(api.kind)}
              </span>
            </div>

            <h1 className="mt-4 font-mono text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {api.name}
            </h1>

            {api.typeParameters.length >
              0 && (
              <p className="mt-3 font-mono text-sm text-zinc-500">
                {"<"}
                {api.typeParameters
                  .map(
                    (
                      parameter,
                    ) =>
                      parameter.name,
                  )
                  .join(", ")}
                {">"}
              </p>
            )}

            {api.description && (
              <p className="mt-5 max-w-3xl whitespace-pre-line text-sm leading-7 text-zinc-400 sm:text-base">
                {api.description}
              </p>
            )}

            <Hierarchy
              name={api.name}
              hierarchy={api.hierarchy}
            />

            <Source
              source={api.source}
            />
          </header>

          <ApiMemberIndex
            constructors={
              constructors
            }
            properties={properties}
            accessors={accessors}
            methods={methods}
            otherMembers={
              otherMembers
            }
          />

          {api.type && (
            <ApiSection
              title="Type"
              id="type"
            >
              <CodeBlock>
                {api.name +
                  " = " +
                  api.type}
              </CodeBlock>
            </ApiSection>
          )}

          {api.signatures.length >
            0 && (
            <ApiSection
              title="Signatures"
              id="signatures"
            >
              <div className="space-y-6">
                {api.signatures.map(
                  (
                    signature,
                    index,
                  ) => (
                    <Signature
                      key={
                        signature.id ??
                        index
                      }
                      signature={
                        signature
                      }
                    />
                  ),
                )}
              </div>
            </ApiSection>
          )}

          <MemberSection
            title="Constructors"
            id="constructors"
            members={constructors}
          />

          <MemberSection
            title="Properties"
            id="properties"
            members={properties}
          />

          <MemberSection
            title="Accessors"
            id="accessors"
            members={accessors}
          />

          <MemberSection
            title="Methods"
            id="methods"
            members={methods}
          />

          <MemberSection
            title="Members"
            id="members"
            members={otherMembers}
          />
        </article>
      </main>

      <aside className="hidden border-l border-white/[0.07] px-5 py-10 xl:block">
        <div className="sticky top-20">
          <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600">
            On this page
          </h2>

          <nav className="space-y-1">
            {toc.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-1 text-xs text-zinc-500 transition hover:text-orange-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}

function ApiMemberIndex({
  constructors,
  properties,
  accessors,
  methods,
  otherMembers,
}: {
  readonly constructors:
    readonly ApiMember[];

  readonly properties:
    readonly ApiMember[];

  readonly accessors:
    readonly ApiMember[];

  readonly methods:
    readonly ApiMember[];

  readonly otherMembers:
    readonly ApiMember[];
}) {
  return (
    <section className="mb-10 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.015]">
      <div className="border-b border-white/[0.07] px-5 py-3">
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Index
        </h2>
      </div>

      <div className="space-y-7 p-5">
        <IndexGroup
          title="Constructors"
          members={
            constructors
          }
        />

        <IndexGroup
          title="Properties"
          members={properties}
        />

        <IndexGroup
          title="Accessors"
          members={accessors}
        />

        <IndexGroup
          title="Methods"
          members={methods}
        />

        <IndexGroup
          title="Members"
          members={
            otherMembers
          }
        />
      </div>
    </section>
  );
}

function IndexGroup({
  title,
  members,
}: {
  readonly title: string;

  readonly members:
    readonly ApiMember[];
}) {
  if (members.length === 0) {
    return null;
  }

  return (
    <section>
      <h3 className="mb-2 text-xs font-semibold text-zinc-400">
        {title}
      </h3>

      <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
        {members.map(
          (member) => (
            <a
              key={member.id}
              href={
                "#" +
                member.anchor
              }
              className="group flex items-center gap-2 rounded px-1 py-1 text-xs text-zinc-500 transition hover:text-orange-300"
            >
              <TypeDocIcon
                kind={
                  member.kindId
                }
                label={
                  member.kind
                }
                className="size-4 shrink-0"
              />

              <code className="font-mono group-hover:text-orange-300">
                {member.name}
              </code>

              {member.flags.optional && (
                <span className="font-mono text-zinc-700">
                  ?
                </span>
              )}
            </a>
          ),
        )}
      </div>
    </section>
  );
}

function MemberSection({
  title,
  id,
  members,
}: {
  readonly title: string;
  readonly id: string;

  readonly members:
    readonly ApiMember[];
}) {
  if (members.length === 0) {
    return null;
  }

  return (
    <ApiSection
      title={title}
      id={id}
    >
      <div className="space-y-0">
        {members.map(
          (member) => (
            <article
              key={member.id}
              id={
                member.anchor
              }
              className="scroll-mt-24 border-b border-white/[0.07] py-7 first:pt-0 last:border-b-0 last:pb-0"
            >
              <div className="flex flex-wrap items-center gap-2">
                <TypeDocIcon
                  kind={
                    member.kindId
                  }
                  label={
                    member.kind
                  }
                  className="size-5"
                />

                <h3 className="font-mono text-lg font-medium text-white">
                  {member.name}
                </h3>

                <a
                  href={
                    "#" +
                    member.anchor
                  }
                  aria-label={
                    "Link to " +
                    member.name
                  }
                  className="text-zinc-700 transition hover:text-orange-400"
                >
                  #
                </a>

                {member.flags.static && (
                  <Flag>
                    Static
                  </Flag>
                )}

                {member.flags.readonly && (
                  <Flag>
                    Readonly
                  </Flag>
                )}

                {member.flags.optional && (
                  <Flag>
                    Optional
                  </Flag>
                )}

                {member.flags.abstract && (
                  <Flag>
                    Abstract
                  </Flag>
                )}
              </div>

              {member.type && (
                <CodeBlock>
                  {member.name +
                    ": " +
                    member.type}
                </CodeBlock>
              )}

              {member.description && (
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-400">
                  {
                    member.description
                  }
                </p>
              )}

              {member.signatures.length >
                0 && (
                <div className="mt-5 space-y-6">
                  {member.signatures.map(
                    (
                      signature,
                      index,
                    ) => (
                      <Signature
                        key={
                          signature.id ??
                          index
                        }
                        signature={
                          signature
                        }
                      />
                    ),
                  )}
                </div>
              )}

              <Source
                source={
                  member.source
                }
              />
            </article>
          ),
        )}
      </div>
    </ApiSection>
  );
}

function Signature({
  signature,
}: {
  readonly signature: ApiSignature;
}) {
  const generics =
    signature
      .typeParameters
      .length > 0
      ? "<" +
        signature.typeParameters
          .map(
            (
              parameter,
            ) =>
              parameter.name,
          )
          .join(", ") +
        ">"
      : "";

  const signatureText =
    signature.name +
    generics +
    "(" +
    signature.parameters
      .map(
        (
          parameter,
        ) => {
          const optional =
            parameter.optional
              ? "?"
              : "";

          return (
            parameter.name +
            optional +
            ": " +
            parameter.type
          );
        },
      )
      .join(", ") +
    "): " +
    signature.returns;

  return (
    <div>
      <CodeBlock>
        {signatureText}
      </CodeBlock>

      {signature.description && (
        <p className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-400">
          {
            signature.description
          }
        </p>
      )}

      {signature.parameters.length >
        0 && (
        <div className="mt-5">
          <h4 className="mb-3 text-sm font-semibold text-zinc-300">
            Parameters
          </h4>

          <div className="space-y-4">
            {signature.parameters.map(
              (
                parameter,
              ) => (
                <div
                  key={
                    parameter.name
                  }
                >
                  <div className="flex flex-wrap items-baseline gap-2 font-mono text-xs">
                    {parameter.optional && (
                      <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-[9px] text-zinc-500">
                        Optional
                      </span>
                    )}

                    <span className="text-[#798dff]">
                      {
                        parameter.name
                      }
                    </span>

                    <span className="text-zinc-600">
                      :
                    </span>

                    <span className="text-zinc-300">
                      {
                        parameter.type
                      }
                    </span>
                  </div>

                  {parameter.description && (
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {
                        parameter.description
                      }
                    </p>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      )}

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-zinc-300">
          Returns{" "}
          <code className="ml-1 font-mono text-xs font-normal text-[#8ac4ff]">
            {
              signature.returns
            }
          </code>
        </h4>

        {signature.returnsDescription && (
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            {
              signature.returnsDescription
            }
          </p>
        )}
      </div>

      <Source
        source={signature.source}
      />
    </div>
  );
}

function Hierarchy({
  name,
  hierarchy,
}: {
  readonly name: string;
  readonly hierarchy: ApiReflection["hierarchy"];
}) {
  if (
    hierarchy.extends.length === 0 &&
    hierarchy.extendedBy.length === 0
  ) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="text-sm font-semibold text-zinc-300">
        Hierarchy
      </h2>

      <div className="mt-3 space-y-2 font-mono text-xs text-zinc-500">
        {hierarchy.extends.map((type) => (
          <div key={type}>
            {type}
          </div>
        ))}

        <div className="pl-4 text-orange-300">
          ↳ {name}
        </div>

        {hierarchy.extendedBy.map((type) => (
          <div
            key={type}
            className="pl-8"
          >
            ↳ {type}
          </div>
        ))}
      </div>
    </div>
  );
}

function Source({
  source,
}: {
  readonly source:
    ApiSource | null;
}) {
  if (!source?.fileName) {
    return null;
  }

  const text =
    source.fileName +
    (
      source.line
        ? ":" + source.line
        : ""
    );

  return (
    <div className="mt-5 border-t border-white/[0.05] pt-3 text-[11px] text-zinc-700">
      Defined in{" "}
      {source.url ? (
        <a
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className="font-mono transition hover:text-zinc-400"
        >
          {text}
        </a>
      ) : (
        <span className="font-mono">
          {text}
        </span>
      )}
    </div>
  );
}

function ApiSection({
  title,
  id,
  children,
}: {
  readonly title: string;
  readonly id: string;

  readonly children:
    React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-white/[0.07] py-9"
    >
      <div className="mb-6 flex items-center gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </h2>

        <a
          href={"#" + id}
          aria-label={
            "Link to " +
            title
          }
          className="text-sm text-zinc-700 transition hover:text-orange-400"
        >
          #
        </a>
      </div>

      {children}
    </section>
  );
}

function CodeBlock({
  children,
}: {
  readonly children:
    React.ReactNode;
}) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-md border border-white/[0.07] bg-black/30 px-4 py-3">
      <code className="font-mono text-xs leading-6 text-zinc-300">
        {children}
      </code>
    </pre>
  );
}

function Flag({
  children,
}: {
  readonly children:
    React.ReactNode;
}) {
  return (
    <span className="rounded bg-white/[0.05] px-1.5 py-0.5 font-mono text-[9px] text-zinc-500">
      {children}
    </span>
  );
}

function formatKind(kind: string) {
  return kind
    .replace(
      /([a-z])([A-Z])/g,
      "$1 $2",
    )
    .replace(
      /([A-Z])([A-Z][a-z])/g,
      "$1 $2",
    );
}
`;
