import { ReflectionKind } from "typedoc";

/**
 * @param {number} kind
 */
export function getKindName(kind) {
  return ReflectionKind[kind] ?? "Unknown";
}

/**
 * @param {number} kind
 */
export function getKindDirectory(kind) {
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

export function createSlug(name) {
  return name.replaceAll(/[^a-zA-Z0-9._-]/g, "-");
}

export function createAnchor(name) {
  return name
    .replaceAll(/([a-z])([A-Z])/g, "$1-$2")
    .replaceAll(/[^a-zA-Z0-9_-]/g, "-")
    .toLowerCase();
}

/**
 * @param {import("typedoc").DeclarationReflection} reflection
 */
export function createRoute(reflection) {
  return [getKindDirectory(reflection.kind), createSlug(reflection.name)].join(
    "/",
  );
}

/**
 * @param {Array<ReturnType<import("./reflection.js").createReflectionModel>>} reflections
 */
export function createNavigation(reflections) {
  return reflections.map((reflection) => ({
    id: reflection.id,
    name: reflection.name,
    route: reflection.route,
    kind: reflection.kind,
    kindId: reflection.kindId,
  }));
}
