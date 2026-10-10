export function renderSourceTemplate() {
  return `import type { ApiSource } from "./types";

export function SourceList({
  sources,
}: {
  readonly sources:
    readonly ApiSource[];
}) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <aside className="typedoc-sources">
      <ul>
        {sources.map(
          (
            source,
            index,
          ) => {
            const label =
              (source.fileName ??
                "Unknown") +
              (
                source.line
                  ? ":" +
                    source.line
                  : ""
              );

            return (
              <li key={index}>
                Defined in{" "}

                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {label}
                  </a>
                ) : (
                  label
                )}
              </li>
            );
          },
        )}
      </ul>
    </aside>
  );
}
`;
}
