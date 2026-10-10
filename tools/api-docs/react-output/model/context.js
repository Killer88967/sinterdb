import { ReflectionKind } from "typedoc";

import { AnchorRegistry, createSlug, getKindDirectory } from "./navigation.js";

/**
 * @typedef {object} SectionPlan
 * @property {string} id
 * @property {string} title
 * @property {import("typedoc").DeclarationReflection[]} members
 *
 * @typedef {object} PagePlan
 * @property {import("typedoc").DeclarationReflection} reflection
 * @property {string} route Path below the route base, e.g. `classes/SinterClient`.
 * @property {string} href
 * @property {SectionPlan[]} sections
 * @property {import("typedoc").DeclarationReflection[]} typeMembers Members of an object type alias or variable.
 */

/**
 * Shared state for building the page model: which reflections get pages,
 * every page and member URL, and the renderers used along the way.
 */
export class ModelContext {
  /** @type {Map<number, string>} */
  #hrefs = new Map();

  /** @type {Map<number, string>} */
  #anchors = new Map();

  /** @type {PagePlan[]} */
  pages = [];

  /**
   * @param {{
   *   project: import("typedoc").ProjectReflection;
   *   options: ReturnType<import("../options.js").resolveReactOutputOptions>;
   *   markdown: Awaited<ReturnType<import("./markdown.js").createMarkdownRenderer>>;
   *   sources: import("./source.js").SourceResolver;
   * }} input
   */
  constructor({ project, options, markdown, sources }) {
    this.project = project;
    this.options = options;
    this.markdown = markdown;
    this.sources = sources;
    this.routeBase = options.routeBase.replace(/\/+$/u, "");

    this.#hrefs.set(project.id, this.routeBase || "/");

    for (const reflection of project.children ?? []) {
      this.#planPage(reflection);
    }
  }

  /** Every member that ends up on a page has an anchor. */
  anchorFor(reflection) {
    return this.#anchors.get(reflection.id) ?? null;
  }

  /** @param {import("typedoc").Reflection} reflection */
  hrefForReflection(reflection) {
    let current = reflection;

    while (current) {
      const href = this.#hrefs.get(current.id);

      if (href) {
        return href;
      }

      // Signatures, parameters and type parameters link to their owner.
      if (
        current.kindOf(
          ReflectionKind.SomeSignature |
            ReflectionKind.Parameter |
            ReflectionKind.TypeParameter |
            ReflectionKind.TypeLiteral,
        )
      ) {
        current = current.parent;
        continue;
      }

      return null;
    }

    return null;
  }

  /** @param {import("typedoc").ReferenceType} type */
  hrefForReference(type) {
    const target = type.reflection;

    if (target) {
      return this.hrefForReflection(target);
    }

    return type.externalUrl ?? null;
  }

  /**
   * Members inherited from outside the project (for example `Error.stack`)
   * add noise, so they are hidden unless enabled.
   *
   * @param {import("typedoc").DeclarationReflection} member
   */
  isVisible(member) {
    if (this.options.features.externalInherited) {
      return true;
    }

    if (member.inheritedFrom && !member.inheritedFrom.reflection) {
      return false;
    }

    return !member.flags.isExternal;
  }

  /** @param {import("typedoc").DeclarationReflection} reflection */
  #planPage(reflection) {
    const route = `${getKindDirectory(reflection.kind)}/${createSlug(reflection.name)}`;
    const href = `${this.routeBase}/${route}`;
    const anchors = new AnchorRegistry();

    this.#hrefs.set(reflection.id, href);

    const sections = groupMembers(reflection, this).map((group) => ({
      id: anchors.take(group.title),
      title: group.title,
      members: group.members,
    }));

    const typeMembers = getTypeMembers(reflection).filter((member) =>
      this.isVisible(member),
    );

    for (const member of [
      ...sections.flatMap((section) => section.members),
      ...typeMembers,
    ]) {
      this.#registerMember(member, href, anchors, "");
    }

    this.pages.push({ reflection, route, href, sections, typeMembers });
  }

  #registerMember(member, pageHref, anchors, prefix) {
    const anchor = anchors.take(prefix + member.name);
    this.#anchors.set(member.id, anchor);
    this.#hrefs.set(member.id, `${pageHref}#${anchor}`);

    // Properties typed as object literals get nested entries.
    for (const child of getTypeDeclaration(member)?.children ?? []) {
      this.#registerMember(child, pageHref, anchors, `${anchor}.`);
    }
  }
}

const SECTION_ORDER = [
  ReflectionKind.Constructor,
  ReflectionKind.Property,
  ReflectionKind.Accessor,
  ReflectionKind.Method,
  ReflectionKind.EnumMember,
];

/**
 * Uses TypeDoc's own groups (which honor `@group` and the `sort` option)
 * and falls back to grouping by kind.
 *
 * @param {import("typedoc").DeclarationReflection} reflection
 * @param {ModelContext} ctx
 */
export function groupMembers(reflection, ctx) {
  const visible = (members) =>
    members.filter((member) => member.isDeclaration() && ctx.isVisible(member));

  if (reflection.groups?.length) {
    return reflection.groups
      .map((group) => ({
        title: group.title,
        members: visible(group.children),
      }))
      .filter((group) => group.members.length > 0);
  }

  const children = visible(reflection.children ?? []);

  return SECTION_ORDER.map((kind) => ({
    title: ReflectionKind.pluralString(kind),
    members: children.filter((child) => child.kind === kind),
  })).filter((group) => group.members.length > 0);
}

/**
 * Properties of an object type alias or variable, including the object
 * literal parts of an intersection such as `Mapped<T> & { $and?: ... }`.
 *
 * @param {import("typedoc").DeclarationReflection} reflection
 * @returns {import("typedoc").DeclarationReflection[]}
 */
export function getTypeMembers(reflection) {
  if (!reflection.kindOf(ReflectionKind.TypeAlias | ReflectionKind.Variable)) {
    return [];
  }

  const type = reflection.type;
  const parts = type?.type === "intersection" ? type.types : [type];

  return parts.flatMap((part) =>
    part?.type === "reflection" ? (part.declaration.children ?? []) : [],
  );
}

/**
 * The object literal declaration behind a type, if any.
 *
 * @param {import("typedoc").DeclarationReflection} reflection
 * @returns {import("typedoc").DeclarationReflection | undefined}
 */
export function getTypeDeclaration(reflection) {
  const type = reflection.type;

  if (type?.type === "reflection") {
    return type.declaration;
  }

  return undefined;
}
