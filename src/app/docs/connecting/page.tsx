import Link from "next/link";

export default function ConnectingPage() {
  return (
    <article className="max-w-4xl">
      <div className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">
          Getting Started
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Connecting
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
          Create a SinterDB client, connect to a server, and select a database
          and collection.
        </p>
      </div>

      <section className="space-y-10">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Create a client
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Import <code className="text-orange-300">SinterClient</code> from
            the official <code className="text-orange-300">sinterdb</code>{" "}
            package.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
            <div className="border-b border-white/[0.07] px-4 py-2 font-mono text-[11px] text-zinc-600">
              app.ts
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-zinc-300">
              <code>{`import { SinterClient } from "sinterdb";

const client = new SinterClient(
  "sinterdb://localhost/my-app",
);

await client.connect();`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Connection strings
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            SinterDB connection strings use the{" "}
            <code className="text-orange-300">sinterdb://</code> scheme.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-zinc-300">
              <code>{`sinterdb://localhost/my-app

sinterdb://127.0.0.1:4721/my-app`}</code>
            </pre>
          </div>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            The portion after the final slash is the database name. If the
            connection string includes a database, you can access it with{" "}
            <code className="text-zinc-300">client.db()</code>.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Access a collection
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Collections can be typed with your own TypeScript interface.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
            <div className="border-b border-white/[0.07] px-4 py-2 font-mono text-[11px] text-zinc-600">
              app.ts
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-zinc-300">
              <code>{`interface User {
  name: string;
  active: boolean;
}

const users = client
  .db()
  .collection<User>("users");`}</code>
            </pre>
          </div>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            The document type is used by filters, updates, sorts, and other
            driver APIs to provide compile-time type checking.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Always close the client
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Close the connection when your application is finished using it. A{" "}
            <code className="text-zinc-300">try/finally</code> block is a simple
            way to guarantee cleanup.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
            <div className="border-b border-white/[0.07] px-4 py-2 font-mono text-[11px] text-zinc-600">
              app.ts
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-zinc-300">
              <code>{`import { SinterClient } from "sinterdb";

const client = new SinterClient(
  "sinterdb://localhost/my-app",
);

await client.connect();

try {
  const users = client
    .db()
    .collection("users");

  // Use the database...
} finally {
  await client.close();
}`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Client options
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            You can configure connection, request, and idle socket timeouts when
            creating the client.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-zinc-300">
              <code>{`const client = new SinterClient(
  "sinterdb://localhost/my-app",
  {
    connectTimeoutMS: 10_000,
    requestTimeoutMS: 10_000,
    socketTimeoutMS: 0,
  },
);`}</code>
            </pre>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-white/[0.07] bg-white/2 p-4">
              <code className="text-xs text-orange-300">connectTimeoutMS</code>

              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Maximum time allowed for connecting and completing the
                handshake.
              </p>
            </div>

            <div className="rounded-lg border border-white/[0.07] bg-white/2 p-4">
              <code className="text-xs text-orange-300">requestTimeoutMS</code>

              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Maximum time to wait for an individual server response.
              </p>
            </div>

            <div className="rounded-lg border border-white/[0.07] bg-white/2 p-4">
              <code className="text-xs text-orange-300">socketTimeoutMS</code>

              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Idle socket timeout. A value of 0 disables it.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-orange-500/15 bg-orange-500/4 p-5">
          <h3 className="text-sm font-semibold text-orange-300">
            Database creation
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            You do not need to create databases or collections beforehand. They
            are created when you first write documents to them.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Complete example
          </h2>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/8 bg-[#0d0d0d]">
            <div className="border-b border-white/[0.07] px-4 py-2 font-mono text-[11px] text-zinc-600">
              app.ts
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-zinc-300">
              <code>{`import { SinterClient } from "sinterdb";

interface User {
  name: string;
  active: boolean;
}

const client = new SinterClient(
  "sinterdb://localhost/my-app",
);

await client.connect();

try {
  const users = client
    .db()
    .collection<User>("users");

  await users.insertOne({
    name: "Kage",
    active: true,
  });

  const user = await users.findOne({
    name: "Kage",
  });

  console.log(user);
} finally {
  await client.close();
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      <div className="mt-14 flex items-center justify-between border-t border-white/[0.07] pt-8">
        <Link
          href="/docs/installation"
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          ← Installation
        </Link>

        <Link
          href="/docs/databases"
          className="text-sm font-medium text-orange-400 transition hover:text-orange-300"
        >
          Databases →
        </Link>
      </div>
    </article>
  );
}
