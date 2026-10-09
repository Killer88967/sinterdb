import Link from "next/link";

export default function InstallationPage() {
  return (
    <article className="max-w-4xl">
      <div className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">
          Getting Started
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Installation
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
          Install the SinterDB server and Node.js driver, then start a local
          database server for development.
        </p>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Requirements
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            SinterDB currently requires Node.js 24 or newer.
          </p>
        </div>

        <div className="rounded-xl border border-orange-500/15 bg-orange-500/4 p-5">
          <p className="text-sm leading-6 text-zinc-400">
            SinterDB <code className="text-orange-300">0.1.0</code> is currently
            a developer preview published under the{" "}
            <code className="text-orange-300">next</code> npm tag.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Install the server
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            The SinterDB server CLI is distributed as{" "}
            <code className="text-orange-300">@sinterdb/cli</code>. It provides
            the <code className="text-orange-300">sinterd</code> command.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
            <div className="border-b border-white/[0.07] px-4 py-2 font-mono text-[11px] text-zinc-600">
              npm
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-zinc-300">
              <code>npm install --global @sinterdb/cli@next</code>
            </pre>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
            <div className="border-b border-white/[0.07] px-4 py-2 font-mono text-[11px] text-zinc-600">
              pnpm
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-zinc-300">
              <code>pnpm add --global @sinterdb/cli@next</code>
            </pre>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Start the server
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Start SinterDB with a local data directory:
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
            <div className="border-b border-white/[0.07] px-4 py-2 font-mono text-[11px] text-zinc-600">
              terminal
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-zinc-300">
              <code>sinterd --data-dir ./sinterdb-data</code>
            </pre>
          </div>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Using <code className="text-zinc-300">--data-dir</code> enables
            durable storage so your data survives server restarts. Without it,
            the server runs entirely in memory.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Install the Node.js driver
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            In your application project, install the official SinterDB driver:
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
            <div className="border-b border-white/[0.07] px-4 py-2 font-mono text-[11px] text-zinc-600">
              npm
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-zinc-300">
              <code>npm install sinterdb@next</code>
            </pre>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
            <div className="border-b border-white/[0.07] px-4 py-2 font-mono text-[11px] text-zinc-600">
              pnpm
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-zinc-300">
              <code>pnpm add sinterdb@next</code>
            </pre>
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-white/2 p-5">
          <h3 className="text-sm font-semibold text-white">
            Default server address
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            SinterDB listens on{" "}
            <code className="text-zinc-300">127.0.0.1:4721</code> by default.
            Authentication and TLS are not available yet, so avoid exposing a
            development server to an untrusted network.
          </p>
        </div>
      </section>

      <div className="mt-14 flex items-center justify-between border-t border-white/[0.07] pt-8">
        <Link
          href="/docs"
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          ← Documentation
        </Link>

        <Link
          href="/docs/connecting"
          className="text-sm font-medium text-orange-400 transition hover:text-orange-300"
        >
          Connecting →
        </Link>
      </div>
    </article>
  );
}
