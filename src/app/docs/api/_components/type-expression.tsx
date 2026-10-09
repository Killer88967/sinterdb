import Link from "next/link";

import type {
  ApiNavigationItem,
} from "./types";

const KEYWORDS = new Set([
  "abstract",
  "as",
  "boolean",
  "const",
  "extends",
  "false",
  "in",
  "keyof",
  "never",
  "null",
  "number",
  "object",
  "readonly",
  "string",
  "symbol",
  "true",
  "typeof",
  "undefined",
  "unknown",
  "void",
]);

interface TypeExpressionProps {
  readonly value: string;
  readonly navigation:
    readonly ApiNavigationItem[];
}

export function TypeExpression({
  value,
  navigation,
}: TypeExpressionProps) {
  const names = new Map(
    navigation.map((item) => [
      item.name,
      item,
    ]),
  );

  const pieces = value.split(
    /([A-Za-z_$][A-Za-z0-9_$]*|\s+|=>|[{}()[\]<>:;,?&|.=])/g,
  );

  return (
    <>
      {pieces.map(
        (piece, index) => {
          if (!piece) {
            return null;
          }

          const target =
            names.get(piece);

          if (target) {
            return (
              <Link
                key={index}
                href={
                  "/docs/api/" +
                  target.route
                }
                className={
                  "typedoc-type-link typedoc-kind-" +
                  kindClass(
                    target.kind,
                  )
                }
              >
                {piece}
              </Link>
            );
          }

          if (
            KEYWORDS.has(piece)
          ) {
            return (
              <span
                key={index}
                className="typedoc-keyword"
              >
                {piece}
              </span>
            );
          }

          if (
            /^[{}()[\]<>:;,?&|.=]$/.test(
              piece,
            ) ||
            piece === "=>"
          ) {
            return (
              <span
                key={index}
                className="typedoc-symbol"
              >
                {piece}
              </span>
            );
          }

          if (
            /^["']/.test(piece) ||
            /^\d/.test(piece)
          ) {
            return (
              <span
                key={index}
                className="typedoc-literal"
              >
                {piece}
              </span>
            );
          }

          return (
            <span key={index}>
              {piece}
            </span>
          );
        },
      )}
    </>
  );
}

function kindClass(kind: string) {
  return kind
    .replace(
      /([a-z])([A-Z])/g,
      "$1-$2",
    )
    .toLowerCase();
}
