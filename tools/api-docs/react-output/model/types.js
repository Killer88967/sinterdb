import { createRoute } from "./navigation.js";

/**
 * @typedef {object} TypeModel
 * @property {string} kind
 * @property {string} text
 * @property {string | null} name
 * @property {number | null} targetId
 * @property {TypeModel[]} children
 */

/**
 * Convert a TypeDoc Type into the normalized representation used
 * by the React output plugin.
 *
 * This first implementation keeps the rendered text as a fallback
 * while preserving basic reference metadata.
 *
 * @param {import("typedoc").SomeType | undefined} type
 * @returns {TypeModel | null}
 */
export function createTypeModel(type) {
  if (!type) {
    return null;
  }

  return {
    kind: type.type ?? "unknown",
    text: type.toString(),
    name: getTypeName(type),
    target: getTypeTarget(type),
    children: type.typeArguments?.map(createTypeModel).filter(Boolean) ?? [],
  };
}

function getTypeName(type) {
  if (typeof type.name === "string") {
    return type.name;
  }

  return null;
}

function getTypeTarget(type) {
  const reflection = getTargetReflection(type);

  if (!reflection) {
    return null;
  }

  return {
    id: reflection.id,
    name: reflection.name,
    route: createRoute(reflection),
  };
}

function getTargetReflection(type) {
  if (type.reflection && typeof type.reflection.id === "number") {
    return type.reflection;
  }

  if (type.target && typeof type.target.id === "number") {
    return type.target;
  }

  return null;
}
