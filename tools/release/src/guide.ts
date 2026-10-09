export interface Block {
  readonly language: string;
  readonly attributes: ReadonlyMap<string, string>;
  readonly code: string;
}

/**
 * Reads the fenced code blocks of a guide. Markers after the language say
 * what a block is for:
 *   ```bash run=server       the command that starts the server
 *   ```ts file=<name>        a file the reader creates
 *   ```text expect=<name>    the output of running that file
 */
export function readBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];

  for (const match of markdown.matchAll(/```(\w+)([^\n]*)\n([\s\S]*?)```/g)) {
    const attributes = new Map<string, string>();

    for (const pair of (match[2] ?? "").trim().split(/\s+/)) {
      const [key, value] = pair.split("=");

      if (key !== undefined && value !== undefined && key.length > 0) {
        attributes.set(key, value);
      }
    }

    blocks.push({
      language: match[1] as string,
      attributes,
      code: match[3] as string,
    });
  }

  return blocks;
}
