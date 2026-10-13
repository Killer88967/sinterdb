/**
 * Passes the fence title through to the rendered `<code>` element:
 *
 * ```ts title="app.ts"     -> data-title="app.ts"```
 * ```bash npm              -> data-title="npm"```
 */
export default function remarkCodeMeta() {
  return (tree) => {
    visit(tree);
  };
}

function visit(node) {
  if (node.type === "code" && node.meta) {
    let meta = node.meta.trim();

    const noCopy = /(^|\s)nocopy(?=\s|$)/u.test(meta);
    meta = meta.replace(/(^|\s)nocopy(?=\s|$)/u, " ");

    const choice = /(^|\s)choice\[([^\]]*)\](?=\s|$)/u.exec(meta);
    meta = meta.replace(/(^|\s)choice\[[^\]]*\](?=\s|$)/u, " ");

    const title = parseTitle(meta.trim());

    if (title || noCopy || choice) {
      node.data ??= {};
      node.data.hProperties = {
        ...node.data.hProperties,
        ...(title && { "data-title": title }),
        ...(noCopy && { "data-nocopy": "" }),
        ...(choice && { "data-choices": choice[2] }),
      };
    }
  }
  if (node.type === "code" && node.meta) {
    let meta = node.meta.trim();

    const noCopy = /(^|\s)nocopy(?=\s|$)/u.test(meta);
    meta = meta.replace(/(^|\s)nocopy(?=\s|$)/u, " ");

    const choice = extractChoice(meta);
    if (choice) meta = choice.rest;

    const title = parseTitle(meta.trim());

    if (title || noCopy || choice) {
      node.data ??= {};
      node.data.hProperties = {
        ...node.data.hProperties,
        ...(title && { "data-title": title }),
        ...(noCopy && { "data-nocopy": "" }),
        ...(choice && { "data-choices": choice.value }),
      };
    }
  }

  for (const child of node.children ?? []) {
    visit(child);
  }
}

function parseTitle(meta) {
  const match = /title=(?:"([^"]*)"|'([^']*)'|(\S+))/u.exec(meta);

  if (match) {
    return match[1] ?? match[2] ?? match[3];
  }

  return meta.includes("=") ? null : meta || null;
}

/**
 * Finds `choice[...]` with nested brackets, e.g.
 * `choice[npm,yarn[classic(v1),modern(v2+)]]`. Brackets inside a `(note)`
 * are left alone.
 */
function extractChoice(meta) {
  const match = /(^|\s)choice\[/u.exec(meta);
  if (!match) return null;

  const start = match.index + match[0].length;
  let depth = 1;
  let parens = 0;

  for (let index = start; index < meta.length; index += 1) {
    const char = meta[index];

    if (char === "(") parens += 1;
    else if (char === ")") parens = Math.max(0, parens - 1);
    else if (parens === 0 && char === "[") depth += 1;
    else if (parens === 0 && char === "]") {
      depth -= 1;

      if (depth === 0) {
        return {
          value: meta.slice(start, index),
          rest: `${meta.slice(0, match.index)} ${meta.slice(index + 1)}`,
        };
      }
    }
  }

  return null;
}
