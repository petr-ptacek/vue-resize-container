import js             from "@eslint/js";
import tsPlugin       from "@typescript-eslint/eslint-plugin";
import tsParser       from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import vuePlugin      from "eslint-plugin-vue";

export default [
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": "error"
      // "import/order": [
      //   "error",
      //   {
      //     groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
      //     "newlines-between": "always",
      //     alphabetize: {
      //       order: "asc",
      //       caseInsensitive: true,
      //     },
      //   },
      // ],
    }
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.playground.json", "./tsconfig.node.json"],
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": ["warn"]
    }
  },
  {
    files: ["**/*.vue"],
    plugins: {
      vue: vuePlugin,
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin
    },
    processor: vuePlugin.processors.vue,
    rules: {
      ...vuePlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-unused-vars": ["warn"]
    }
  },
  {
    files: ["playground/**/*.{ts,js,vue}"],
    rules: {
      "no-console": "off"
    }
  }
];
