//@ts-nocheck
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";

export default defineConfig([
  {
    ignores: ["playground/**", "dist/**", "node_modules/**", "package.lock.json"],
  },
  // JS/TS/Vue soubory (obecná nastavení)
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
    },
    plugins: { js, prettier, import: importPlugin },
    extends: ["js/recommended"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "",
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // např. fs, path
            "external", // npm balíčky
            "internal", // interní moduly (můžeš definovat v settings)
            ["parent", "sibling", "index"], // relativní cesty
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc" /* řadí abecedně */,
            caseInsensitive: true,
          },
        },
      ],
      "prettier/prettier": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": true, // zakázat `// @ts-ignore`
          "ts-expect-error": true, // zakázat `// @ts-expect-error`
          "ts-nocheck": false, // povolit `// @ts-nocheck`
          "ts-check": false, // povolit `// @ts-check`,
          //minimumDescriptionLength: 5, // Pokud je nastaveno, @ts-ignore musí být doprovázen popisem
        },
      ],
    },
  },
  // TypeScript podpora
  ...tseslint.configs.recommended,

  // Vue podpora (bezpečnější kombinace)
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser, // důležité!
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
        project: ["./tsconfig.app.json", "./tsconfig.playground.json"], // pokud chceš type-aware linting
      },
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      ...pluginVue.configs["flat/essential"].rules,
    },
  },

  // // JSON
  // {
  //   files: ["**/*.json"],
  //   plugins: { json },
  //   language: "json/json",
  //   extends: ["json/recommended"],
  // },
  //
  // // CSS
  // {
  //   files: ["**/*.css"],
  //   plugins: { css },
  //   language: "css/css",
  //   extends: ["css/recommended"],
  // },
]);
