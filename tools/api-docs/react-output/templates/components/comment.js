export function renderCommentTemplate() {
  return `import type {
  ApiComment,
  ApiCommentPart,
} from "../_generated/model";

function CommentParts({
  parts,
}: {
  readonly parts: readonly ApiCommentPart[];
}) {
  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part.text}
        </span>
      ))}
    </>
  );
}

export function Comment({
  comment,
}: {
  readonly comment: ApiComment | null;
}) {
  if (!comment) {
    return null;
  }

  return (
    <div className="typedoc-comment">
      {comment.summary.length > 0 && (
        <p>
          <CommentParts parts={comment.summary} />
        </p>
      )}

      {comment.blockTags.map((block, index) => (
        <section
          key={index}
          className="typedoc-comment-block"
        >
          <h4>
            {block.tag.replace(/^@/, "")}
          </h4>

          <p>
            <CommentParts parts={block.content} />
          </p>
        </section>
      ))}
    </div>
  );
}
`;
}
