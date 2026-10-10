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

  const model = {
    kind: type.type ?? "unknown",
    text: type.toString(),
    name: getTypeName(type),
    targetId: getTargetId(type),
    children: [],
  };

  if ("typeArguments" in type && Array.isArray(type.typeArguments)) {
    model.children = type.typeArguments.map(createTypeModel).filter(Boolean);
  }

  return model;
}

function getTypeName(type) {
  if ("name" in type && typeof type.name === "string") {
    return type.name;
  }

  return null;
}

function getTargetId(type) {
  if (!("reflection" in type) || !type.reflection) {
    return null;
  }

  return type.reflection.id ?? null;
}
