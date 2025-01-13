import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigEslint from "eslint-config-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    ignores: ["node_modules"],
  },
  pluginJs.configs.recommended,
  ...eslintConfigEslint,
  eslintPluginPrettier,
  { rules: { "no-console": "off" } },
];
