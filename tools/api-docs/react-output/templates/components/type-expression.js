export function renderTypeExpressionTemplate() {
  return `import type { ApiType } from "./types";

export function TypeExpression({
  type,
}: {
  readonly type:
    ApiType | null;
}) {
  if (!type) {
    return (
      <span className="typedoc-type-unknown">
        unknown
      </span>
    );
  }

  return (
    <span className="typedoc-type">
      {type.text}
    </span>
  );
}
`;
}
