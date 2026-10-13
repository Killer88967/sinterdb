import { bundledLanguages, codeToHtml } from "shiki";

import { ChoiceTabs, type ChoiceNode } from "./choice-tabs";
import { CopyButton } from "./copy-button";

/** Matches the token colors used by the generated API reference. */
const THEME = "github-dark-default";

/**
 * Highlighted code block, rendered on the server with no client-side
 * highlighting. Fenced code in MDX goes through this automatically; TSX
 * pages can use it directly.
 */
export async function CodeBlock({
  code,
  lang = "text",
  title,
  copy = true,
}: {
  readonly code: string;
  readonly lang?: string;
  readonly title?: string;
  readonly copy?: boolean;
}) {
  const language = lang in bundledLanguages ? lang : "text";
  const html = await codeToHtml(code, { lang: language, theme: THEME });

  return (
    <figure className="docs-code group relative my-5 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
      {title && (
        <figcaption className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-4 py-2 font-mono text-[11px] text-zinc-600">
          <span className="truncate">{title}</span>
          {copy && <CopyButton text={code} inline />}
        </figcaption>
      )}

      {!title && copy && <CopyButton text={code} />}

      <div
        className="overflow-x-auto p-5 font-mono text-sm leading-6 [&_pre]:bg-transparent! [&_pre]:outline-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}

/**
 * One code block with a tab per choice. The fence body holds one section per
 * final choice, in order, separated by lines containing only `---`.
 *
 * choice[npm,pnpm(note),yarn[classic(note),modern(note)]]
 *
 * `(note)` is shown on hover, and `[...]` adds a second row of tabs.
 */
export async function CodeChoices({
  code,
  choices,
  lang = "text",
  title,
  copy = true,
}: {
  readonly code: string;
  readonly choices: string;
  readonly lang?: string;
  readonly title?: string;
  readonly copy?: boolean;
}) {
  const tree = parseChoiceTree(choices);
  const leaves = countLeaves(tree);

  const codes = code
    .split(/^[ \t]*---[ \t]*$/mu)
    .map((section) => section.replace(/^\n+|\n+$/gu, ""))
    .filter((section) => section.trim() !== "");

  if (leaves === 0 || codes.length !== leaves) {
    throw new Error(
      `choice[${choices}] has ${leaves} choices but ${codes.length} code sections. ` +
        "Separate sections with a line containing only ---.",
    );
  }

  const language = lang in bundledLanguages ? lang : "text";
  const panels = await Promise.all(
    codes.map(async (section) => ({
      code: section,
      html: await codeToHtml(section, { lang: language, theme: THEME }),
    })),
  );

  // No overflow-hidden here, so hover notes can hang below the tab bar.
  return (
    <figure className="docs-code group relative my-5 rounded-xl border border-white/8 bg-[#0d0d0d]">
      <ChoiceTabs choices={tree} panels={panels} title={title} copy={copy} />
    </figure>
  );
}

/**
 * `npm,yarn(note)[classic(v1, global),modern]` -> a tree of tabs. Leaves are
 * numbered in order; `leaf` is their index into the code sections.
 */
function parseChoiceTree(source: string): ChoiceNode[] {
  let index = 0;
  let leaf = 0;

  function list(): ChoiceNode[] {
    const nodes: ChoiceNode[] = [];

    while (index < source.length && source[index] !== "]") {
      const node = item();
      if (node) nodes.push(node);
      if (source[index] === ",") index += 1;
    }

    return nodes;
  }

  function item(): ChoiceNode | null {
    let label = "";
    while (index < source.length && !",()[]".includes(source[index])) {
      label += source[index];
      index += 1;
    }

    let comment: string | null = null;
    if (source[index] === "(") {
      index += 1;
      let depth = 1;
      let text = "";

      while (index < source.length) {
        const char = source[index];
        index += 1;
        if (char === "(") depth += 1;
        if (char === ")" && --depth === 0) break;
        text += char;
      }

      comment = text.trim() || null;
    }

    let children: ChoiceNode[] = [];
    if (source[index] === "[") {
      index += 1;
      children = list();
      if (source[index] === "]") index += 1;
    }

    label = label.trim();
    if (!label) return null;

    return children.length > 0
      ? { label, comment, children, leaf: null }
      : { label, comment, children, leaf: leaf++ };
  }

  return list();
}

function countLeaves(nodes: readonly ChoiceNode[]): number {
  return nodes.reduce(
    (count, node) =>
      count + (node.children.length > 0 ? countLeaves(node.children) : 1),
    0,
  );
}
