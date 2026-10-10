/**
 * @typedef {object} CommentPartModel
 * @property {string} kind
 * @property {string} text
 * @property {string | null} target
 */

/**
 * @typedef {object} CommentBlockModel
 * @property {string} tag
 * @property {CommentPartModel[]} content
 */

/**
 * @typedef {object} CommentModel
 * @property {CommentPartModel[]} summary
 * @property {CommentBlockModel[]} blockTags
 */

/**
 * @param {import("typedoc").Comment | undefined} comment
 * @returns {CommentModel | null}
 */
export function createCommentModel(comment) {
  if (!comment) {
    return null;
  }

  return {
    summary: comment.summary.map(createCommentPart),

    blockTags: comment.blockTags.map((blockTag) => ({
      tag: blockTag.tag,

      content: blockTag.content.map(createCommentPart),
    })),
  };
}

/**
 * @param {import("typedoc").CommentDisplayPart} part
 * @returns {CommentPartModel}
 */
function createCommentPart(part) {
  return {
    kind: part.kind,

    text: part.text,

    target: getCommentPartTarget(part),
  };
}

function getCommentPartTarget(part) {
  if (!("target" in part) || !part.target) {
    return null;
  }

  if (typeof part.target === "string") {
    return part.target;
  }

  if (typeof part.target === "object" && "url" in part.target) {
    return part.target.url ?? null;
  }

  return null;
}

/**
 * Convenience helper for places where only plain text
 * is currently needed.
 *
 * @param {CommentModel | null} comment
 */
export function commentSummaryText(comment) {
  if (!comment) {
    return "";
  }

  return comment.summary
    .map((part) => part.text)
    .join("")
    .trim();
}

/**
 * @param {CommentModel | null} comment
 * @param {string} tag
 */
export function getCommentBlock(comment, tag) {
  return comment?.blockTags.find((blockTag) => blockTag.tag === tag) ?? null;
}
