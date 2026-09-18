import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    name: "Global ignores",
    ignores: [
      "**/node_modules/**",
      "**/.pnpm-store/**",
      "**/dist/**",
      "**/build/**",
      "**/out/**",
      "**/lib/**",
      "**/coverage/**",
      "**/test-results/**",
      "**/.cache/**",
      "**/.vitest/**",
      "**/.turbo/**",
      "**/.temp/**",
      "**/tmp/**",
      "**/*.{ts,tsx,mts,cts}",
      "data/**",
      ".sinterdb/**",
      "sinterdb-data/**",
      "backups/**",
    ],

    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },

  eslint.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.node,
      },
    },

    rules: {
      curly: ["error", "all"],
      eqeqeq: ["error", "always"],
      "no-console": "off",
    },
  },
]);
