import Link from "next/link";

import { TypeDocIcon } from "./typedoc-icon";

import type {
  ApiIndexReflection,
} from "./types";

interface ApiIndexProps {
  readonly name: string;

  readonly reflections:
    readonly ApiIndexReflection[];
}

export function ApiIndex({
  name,
  reflections,
}: ApiIndexProps) {
  const groups = Map.groupBy(
    reflections,
    (reflection) => reflection.kind,
  );

  return (
    <article className="mx-auto max-w-5xl px-6 py-14">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-orange-400">
          API Reference
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {name}
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
          Generated directly from the public
          SinterDB TypeScript declarations.
        </p>
      </header>

      <div className="space-y-10">
        {[...groups.entries()].map(
          ([kind, entries]) => (
            <section key={kind}>
              <div className="mb-4 flex items-center gap-3 border-b border-white/[0.07] pb-3">
                <h2 className="text-xl font-semibold text-white">
                  {formatKind(kind)}
                </h2>

                <span className="font-mono text-[10px] text-zinc-600">
                  {entries.length}
                </span>
              </div>

              <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                {entries.map(
                  (reflection) => (
                    <Link
                      key={reflection.id}
                      href={
                        "/docs/api/" +
                        reflection.route
                      }
                      className="group flex items-start gap-2 rounded-md px-2 py-2 text-sm transition hover:bg-white/[0.03]"
                    >
                      <TypeDocIcon
                        kind={
                          reflection.kindId
                        }
                        label={
                          reflection.kind
                        }
                        className="mt-0.5 size-4 shrink-0"
                      />

                      <span className="min-w-0">
                        <span className="block font-mono text-zinc-300 transition group-hover:text-orange-300">
                          {reflection.name}
                        </span>

                        {reflection.description && (
                          <span className="mt-1 line-clamp-2 block text-xs leading-5 text-zinc-600">
                            {
                              reflection.description
                            }
                          </span>
                        )}
                      </span>
                    </Link>
                  ),
                )}
              </div>
            </section>
          ),
        )}
      </div>
    </article>
  );
}

function formatKind(kind: string) {
  return kind
    .replace(
      /([a-z])([A-Z])/g,
      "$1 $2",
    )
    .replace(
      /([A-Z])([A-Z][a-z])/g,
      "$1 $2",
    );
}
