import { bundledLanguages, codeToHtml } from "shiki";

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
}: {
  readonly code: string;
  readonly lang?: string;
  readonly title?: string;
}) {
  const language = lang in bundledLanguages ? lang : "text";
  const html = await codeToHtml(code, { lang: language, theme: THEME });

  return (
    <figure className="docs-code group relative my-5 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
      {title && (
        <figcaption className="border-b border-white/[0.07] px-4 py-2 font-mono text-[11px] text-zinc-600">
          {title}
        </figcaption>
      )}

      <CopyButton text={code} />

      <div
        className="overflow-x-auto p-5 font-mono text-sm leading-6 [&_pre]:bg-transparent! [&_pre]:outline-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
