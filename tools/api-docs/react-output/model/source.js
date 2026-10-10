/**
 * @typedef {object} SourceModel
 * @property {string | null} fileName
 * @property {number | null} line
 * @property {number | null} character
 * @property {string | null} url
 */

/**
 * @param {import("typedoc").Reflection} reflection
 * @returns {SourceModel[]}
 */
export function createSources(reflection) {
  return (
    reflection.sources?.map((source) => ({
      fileName: source.fileName ?? null,
      line: source.line ?? null,
      character: source.character ?? null,
      url: source.url ?? null,
    })) ?? []
  );
}
