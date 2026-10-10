import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { renderModelDeclarations } from "./model.js";
import { renderModuleDeclarations } from "./modules.js";
import { renderRendererDeclarations } from "./renderer.js";

/**
 * @param {{
 *   outputPath: string;
 *   options: {
 *     declarations: {
 *       enabled: boolean;
 *       directory: string;
 *       moduleName: string | null;
 *     };
 *   };
 * }} inputs
 */
export async function generateDeclarations({ outputPath, options }) {
  const declarationOptions = options.declarations;

  if (!declarationOptions.enabled) {
    return;
  }

  const directory = join(outputPath, declarationOptions.directory);

  await mkdir(directory, {
    recursive: true,
  });

  const files = [
    writeFile(join(directory, "model.d.ts"), renderModelDeclarations(), "utf8"),
    writeFile(
      join(directory, "renderer.d.ts"),
      renderRendererDeclarations(),
      "utf8",
    ),
    writeFile(join(directory, "index.d.ts"), renderIndexDeclarations(), "utf8"),
  ];

  const modules = renderModuleDeclarations({
    moduleName: declarationOptions.moduleName,
  });

  if (modules) {
    files.push(writeFile(join(directory, "modules.d.ts"), modules, "utf8"));
  }

  await Promise.all(files);
}

function renderIndexDeclarations() {
  return `export * from "./model";
export * from "./renderer";`;
}
