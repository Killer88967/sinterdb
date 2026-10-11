"use client";

import { useState, useSyncExternalStore } from "react";

export type BannerType = "notice" | "important" | "warning" | "error";

const STYLES: Record<BannerType, { box: string; dot: string }> = {
  notice: {
    box: "border-cyan-500/25 bg-cyan-950/80 text-cyan-100",
    dot: "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]",
  },
  important: {
    box: "border-violet-500/25 bg-violet-950/80 text-violet-100",
    dot: "bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]",
  },
  warning: {
    box: "border-amber-500/25 bg-amber-950/80 text-amber-100",
    dot: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]",
  },
  error: {
    box: "border-red-500/25 bg-red-950/80 text-red-100",
    dot: "bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)]",
  },
};

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function readDismissed(key: string | undefined) {
  if (!key) return false;
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

export default function PopupBanner({
  label,
  type = "notice",
  id,
  href,
  linkLabel = "Learn more",
  className = "",
}: {
  label: string;
  type?: BannerType;
  /** When set, closing the banner is remembered in this browser. */
  id?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}) {
  const storageKey = id ? `banner-dismissed:${id}` : undefined;

  // Hidden on the server, so a banner someone already closed never flashes.
  const stored = useSyncExternalStore(
    subscribe,
    () => readDismissed(storageKey),
    () => true,
  );
  const [closed, setClosed] = useState(false);

  if (stored || closed) return null;

  const style = STYLES[type];

  function dismiss() {
    setClosed(true);
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, "1");
      } catch {}
    }
  }

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-2xl shadow-black/50 backdrop-blur-xl transition duration-300 starting:translate-y-3 starting:opacity-0 ${style.box} ${className}`}
    >
      <span className={`size-1.5 shrink-0 rounded-full ${style.dot}`} />

      <p className="min-w-0 flex-1 leading-6">
        {label}
        {href && (
          <>
            {" "}
            <a
              href={href}
              className="font-medium underline underline-offset-4 opacity-90 transition hover:opacity-100"
            >
              {linkLabel} →
            </a>
          </>
        )}
      </p>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="-mr-1 flex size-7 shrink-0 items-center justify-center rounded-md opacity-60 transition hover:bg-white/10 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  );
}
