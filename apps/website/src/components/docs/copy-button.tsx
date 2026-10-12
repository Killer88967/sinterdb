"use client";

import { useState } from "react";

export function CopyButton({ text }: { readonly text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="absolute right-2 bottom-2 rounded-md border border-white/8 bg-[#141414] px-2 py-1 font-mono text-[11px] text-zinc-500 opacity-0 transition group-hover:opacity-100 hover:text-white focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
      aria-label="Copy code"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
