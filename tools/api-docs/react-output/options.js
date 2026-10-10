/**
 * @typedef {object} ReactOutputOptions
 * @property {string} outputPath
 * @property {string} routBase
 * @property {string} iconSpritePath
 * @property {boolean} cleanOutput
 * @property {"next"} framework
 */

/**
 * @param {{
 *   app: import("typedoc").Application;
 *   outputPath: string;
 * }} input
 *
 * @returns {ReactOutputOptions}
 */
export function resolveReactOutputOptions({ app, outputPath }) {
  void app;

  return {
    outputPath,
    framework: "next",
    iconSpritePath: "/docs/api/assets/icons.svg",
    cleanOutput: true,
  };
}
