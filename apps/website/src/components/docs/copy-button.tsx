"use client";

import { useState } from "react";

export function CopyButton({
  text,
  inline = false,
}: {
  readonly text: string;
  /** Sit in the flow (title bar) instead of floating over the code. */
  readonly inline?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const position = inline
    ? "-my-1 px-1.5 py-0.5"
    : "absolute right-2 bottom-2 border border-white/8 bg-[#141414] px-2 py-1";

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className={`${position} rounded-md font-mono text-[11px] text-zinc-500 opacity-0 transition group-hover:opacity-100 hover:text-white focus-visible:opacity-100 [@media(hover:none)]:opacity-100`}
      aria-label="Copy code"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
