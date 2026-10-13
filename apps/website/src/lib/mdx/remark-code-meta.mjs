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
    const meta = node.meta.trim();
    const noCopy = /(^|\s)nocopy(?=\s|$)/u.test(meta);
    const title = parseTitle(meta.replace(/(^|\s)nocopy(?=\s|$)/u, " ").trim());

    if (title || noCopy) {
      node.data ??= {};
      node.data.hProperties = {
        ...node.data.hProperties,
        ...(title && { "data-title": title }),
        ...(noCopy && { "data-nocopy": "" }),
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
