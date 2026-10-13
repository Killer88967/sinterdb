"use client";

import { useId, useState } from "react";

import { CopyButton } from "./copy-button";

export interface ChoiceNode {
  readonly label: string;
  /** From `label(note)`: a tooltip on hover, a note line on touch screens. */
  readonly comment: string | null;
  readonly children: readonly ChoiceNode[];
  /** Index into `panels` for a final choice, `null` when it has sub-choices. */
  readonly leaf: number | null;
}

export interface ChoicePanel {
  readonly code: string;
  /** Highlighted HTML. */
  readonly html: string;
}

/** Follows `path`, then picks the first option until it reaches a leaf. */
function complete(nodes: readonly ChoiceNode[], path: readonly number[]) {
  const next: number[] = [];
  let level = nodes;

  for (let depth = 0; level.length > 0; depth += 1) {
    const index = Math.min(path[depth] ?? 0, level.length - 1);
    next.push(index);
    level = level[index].children;
  }

  return next;
}

/** Each block keeps its own selection; blocks never switch each other. */
export function ChoiceTabs({
  choices,
  panels,
  title,
  copy,
}: {
  readonly choices: readonly ChoiceNode[];
  readonly panels: readonly ChoicePanel[];
  readonly title?: string;
  readonly copy: boolean;
}) {
  const id = useId();
  const [path, setPath] = useState(() => complete(choices, []));

  // One row of tabs per level along the current path.
  const rows: { nodes: readonly ChoiceNode[]; active: number }[] = [];
  let level = choices;
  for (const index of path) {
    rows.push({ nodes: level, active: index });
    level = level[index].children;
  }

  const selected = rows.map((row) => row.nodes[row.active]);
  const activeLeaf = selected.at(-1)?.leaf ?? 0;
  const notes = selected.filter((node) => node.comment);

  function select(depth: number, index: number) {
    setPath((current) =>
      complete(choices, [...current.slice(0, depth), index]),
    );
  }

  return (
    <>
      {rows.map((row, depth) => (
        <div
          key={depth}
          className={
            depth === 0
              ? "flex items-center justify-between gap-4 border-b border-white/[0.07] px-4 font-mono text-[11px] text-zinc-600"
              : "border-b border-white/[0.07] bg-white/1.5 px-4 font-mono text-[11px] text-zinc-600"
          }
        >
          <div className="flex min-w-0 items-center gap-4">
            {depth === 0 && title && (
              <span className="truncate py-2">{title}</span>
            )}

            <div
              role="tablist"
              aria-label={depth === 0 ? title : selected[depth - 1].label}
              className={
                depth === 0
                  ? "-mb-px flex flex-wrap gap-x-4"
                  : "flex flex-wrap gap-1.5 py-1.5"
              }
            >
              {row.nodes.map((node, index) => (
                <Tab
                  key={index}
                  id={`${id}-${depth}-${index}`}
                  node={node}
                  nested={depth > 0}
                  selected={index === row.active}
                  onSelect={() => select(depth, index)}
                />
              ))}
            </div>
          </div>

          {depth === 0 && copy && (
            <CopyButton text={panels[activeLeaf].code} inline />
          )}
        </div>
      ))}

      {/* Touch screens can't hover, so the notes for the current pick are shown inline. */}
      {notes.length > 0 && (
        <p className="border-b border-white/[0.07] px-4 py-1.5 font-mono text-[11px] text-zinc-500 [@media(hover:hover)]:hidden">
          {notes.map((node, index) => (
            <span key={index} className="mr-3 inline-block">
              <span className="text-zinc-300">{node.label}</span> {node.comment}
            </span>
          ))}
        </p>
      )}

      {panels.map((panel, index) => (
        <div
          key={index}
          role="tabpanel"
          aria-label={selected.map((node) => node.label).join(" / ")}
          hidden={index !== activeLeaf}
          className="overflow-x-auto p-5 font-mono text-sm leading-6 [&_pre]:bg-transparent! [&_pre]:outline-none"
          dangerouslySetInnerHTML={{ __html: panel.html }}
        />
      ))}
    </>
  );
}

function Tab({
  id,
  node,
  nested,
  selected,
  onSelect,
}: {
  readonly id: string;
  readonly node: ChoiceNode;
  readonly nested: boolean;
  readonly selected: boolean;
  readonly onSelect: () => void;
}) {
  return (
    <span className="relative">
      <button
        type="button"
        role="tab"
        aria-selected={selected}
        aria-describedby={node.comment ? `${id}-tip` : undefined}
        onClick={onSelect}
        className={
          nested
            ? "peer rounded-md px-2 py-0.5 whitespace-nowrap transition hover:text-zinc-300 aria-selected:bg-white/8 aria-selected:text-zinc-200"
            : "peer border-b border-transparent py-2 whitespace-nowrap transition hover:text-zinc-300 aria-selected:border-orange-400 aria-selected:text-zinc-200"
        }
      >
        {node.label}
      </button>

      {node.comment && (
        <span
          role="tooltip"
          id={`${id}-tip`}
          className="pointer-events-none absolute top-full left-0 z-20 mt-1.5 rounded-md border border-white/10 bg-[#161616] px-2 py-1 whitespace-nowrap text-zinc-300 opacity-0 shadow-lg shadow-black/40 transition peer-hover:opacity-100 peer-focus-visible:opacity-100 [@media(hover:none)]:hidden"
        >
          {node.comment}
        </span>
      )}
    </span>
  );
}
