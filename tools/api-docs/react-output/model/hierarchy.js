/**
 * @typedef {object} HierarchyModel
 * @property {string[]} extends
 * @property {string[]} extendedBy
 */

/**
 * @param {import("typedoc").DeclarationReflection} reflection
 * @returns {HierarchyModel}
 */
export function createHierarchy(reflection) {
  return {
    extends: reflection.extendedTypes?.map((type) => type.toString()) ?? [],
    extendedBy: reflection.extendedBy?.map((type) => type.toString()) ?? [],
  };
}
