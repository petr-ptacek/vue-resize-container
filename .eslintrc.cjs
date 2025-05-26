module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: [
      "./tsconfig.playground.json",
      "./tsconfig.app.json",
      "./tsconfig.build.json"
    ],
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project: [
          "./tsconfig.playground.json",
          "./tsconfig.app.json",
          "./tsconfig.build.json"
        ]
      }
    }
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
};
