import { chmod } from "node:fs/promises";
import { build } from "esbuild";

const outputFile = "dist/index.js";

await build({
  entryPoints: ["src/index.ts"],
  outfile: outputFile,
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node24",
  sourcemap: true,
  sourcesContent: false,
  legalComments: "none",
  logLevel: "info",
});

await chmod(outputFile, 0o755);
