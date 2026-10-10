import MarkdownIt from "markdown-it";
import { createHighlighter } from "shiki";

const LANGUAGES = [
  "typescript",
  "tsx",
  "javascript",
  "jsx",
  "json",
  "shellscript",
];

const LANGUAGE_ALIASES = {
  ts: "typescript",
  mts: "typescript",
  cts: "typescript",
  js: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  sh: "shellscript",
  bash: "shellscript",
  shell: "shellscript",
  zsh: "shellscript",
  console: "shellscript",
  jsonc: "json",
};

/**
 * Markdown renderer for doc comments, with build-time syntax highlighting.
 * Highlighted code carries both light and dark colors as CSS variables so
 * the generated stylesheet can switch schemes without client JavaScript.
 *
 * @param {{ light: string; dark: string }} themes
 */
export async function createMarkdownRenderer(themes) {
  const highlighter = await createHighlighter({
    themes: [themes.light, themes.dark],
    langs: LANGUAGES,
  });

  const md = new MarkdownIt({
    html: true,
    linkify: false,
    typographer: false,
    highlight(code, language) {
      const lang = resolveLanguage(language || "ts");

      if (!lang) {
        return "";
      }

      return highlighter.codeToHtml(code.replace(/\n$/u, ""), {
        lang,
        themes,
        defaultColor: false,
      });
    },
  });

  return {
    /** @param {string} markdown */
    render(markdown) {
      return md.render(markdown).trim();
    },

    /** @param {string} markdown */
    renderInline(markdown) {
      return md.renderInline(markdown).trim();
    },

    /**
     * @param {string} code
     * @param {string} [language]
     */
    code(code, language = "ts") {
      return md.render("```" + language + "\n" + code + "\n```").trim();
    },
  };
}

function resolveLanguage(language) {
  const lang =
    LANGUAGE_ALIASES[language.toLowerCase()] ?? language.toLowerCase();
  return LANGUAGES.includes(lang) ? lang : null;
}
