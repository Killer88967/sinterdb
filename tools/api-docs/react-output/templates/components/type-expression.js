export function renderTypeExpressionTemplate() {
  return `import Link from "next/link";

import type { ApiType } from "../_generated/model";

interface TypeExpressionProps {
  readonly type: ApiType | null;
  readonly routeBase?: string;
}

export function TypeExpression({
  type,
  routeBase = "/docs/api",
}: TypeExpressionProps) {
  if (!type) {
    return (
      <span className="typedoc-type typedoc-type-unknown">
        unknown
      </span>
    );
  }

  if (type.target) {
    return (
      <Link
        href={
          routeBase +
          "/" +
          type.target.route
        }
        className="typedoc-type typedoc-type-reference"
      >
        {type.name ?? type.target.name}
      </Link>
    );
  }

  if (type.children.length === 0) {
    return (
      <span
        className={
          "typedoc-type " +
          getTypeClassName(type.kind)
        }
      >
        {type.text}
      </span>
    );
  }

  return (
    <span
      className={
        "typedoc-type " +
        getTypeClassName(type.kind)
      }
    >
      {type.name ?? type.text}

      {"<"}

      {type.children.map(
        (child, index) => (
          <span key={index}>
            {index > 0 ? ", " : ""}

            <TypeExpression
              type={child}
              routeBase={routeBase}
            />
          </span>
        ),
      )}

      {">"}
    </span>
  );
}

function getTypeClassName(
  kind: string,
) {
  switch (kind) {
    case "intrinsic":
      return "typedoc-type-intrinsic";

    case "literal":
      return "typedoc-type-literal";

    case "reference":
      return "typedoc-type-reference";

    case "reflection":
      return "typedoc-type-reflection";

    case "union":
      return "typedoc-type-union";

    case "intersection":
      return "typedoc-type-intersection";

    case "array":
      return "typedoc-type-array";

    case "tuple":
      return "typedoc-type-tuple";

    case "conditional":
      return "typedoc-type-conditional";

    case "query":
      return "typedoc-type-query";

    case "indexedAccess":
      return "typedoc-type-indexed-access";

    case "mapped":
      return "typedoc-type-mapped";

    default:
      return "typedoc-type-default";
  }
}
`;
}
