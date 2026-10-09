import Link from "next/link";

const cards = [
  {
    title: "Installation",
    description:
      "Install the SinterDB Node.js driver and prepare your project.",
    href: "/docs/installation",
  },
  {
    title: "Connecting",
    description: "Create a client and connect to a running SinterDB server.",
    href: "/docs/connecting",
  },
  {
    title: "Queries",
    description: "Filter, sort, limit, and iterate over documents.",
    href: "/docs/filters",
  },
  {
    title: "Writing data",
    description: "Insert, update, replace, and delete documents.",
    href: "/docs/inserts",
  },
];

export default function DocsPage() {
  return (
    <article className="max-w-4xl">
      <div className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">
          Documentation
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          SinterDB documentation
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
          Learn how to connect to SinterDB, work with databases and collections,
          query documents, and use the TypeScript-first driver.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-xl border border-white/8 bg-white/2 p-6 transition hover:border-orange-500/25 hover:bg-orange-500/3"
          >
            <h2 className="text-base font-semibold text-white transition group-hover:text-orange-300">
              {card.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              {card.description}
            </p>

            <span className="mt-5 inline-block text-sm text-orange-400">
              Read more →
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-14 border-t border-white/[0.07] pt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          API reference
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
          Looking for exact classes, methods, interfaces, and type signatures?
          The API reference is generated directly from the public SinterDB
          driver declarations.
        </p>

        <a
          href="/docs/api/index.html"
          className="mt-5 inline-flex h-10 items-center rounded-lg border border-orange-500/20 bg-orange-500/[0.07] px-4 text-sm font-medium text-orange-300 transition hover:bg-orange-500/10"
        >
          Open API reference ↗
        </a>
      </section>
    </article>
  );
}
