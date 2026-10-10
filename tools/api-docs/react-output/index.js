import { generateReactOutput } from "./generator.js";
import { resolveReactOutputOptions } from "./options.js";

/**
 * TypeDoc plugin entry point.
 *
 * @param {import("typedoc").Application} app
 */
export function load(app) {
  app.outputs.addOutput("react", async (outputPath, project) => {
    const options = resolveReactOutputOptions({
      app,
      outputPath,
    });

    await generateReactOutput({
      project,
      options,
    });
  });
}
