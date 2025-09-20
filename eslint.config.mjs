// Flat ESLint config for TypeScript + React
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import a11yPlugin from "eslint-plugin-jsx-a11y";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  { ignores: ["dist/**", "node_modules/**", "vite.config.ts"] },
  js.configs.recommended,
  // Base React rules for JS files
  {
    files: ["**/*.{js,jsx}", "eslint.config.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.es2021 },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      import: importPlugin,
      "jsx-a11y": a11yPlugin,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...a11yPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "import/order": "off",
    },
  },
  // TypeScript + React rules
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        projectService: true,
        allowDefaultProject: true,
      },
      globals: { ...globals.browser, ...globals.es2021 },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      import: importPlugin,
      "unused-imports": unusedImports,
      "jsx-a11y": a11yPlugin,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": { typescript: { project: ["./tsconfig.json"] } },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...a11yPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "unused-imports/no-unused-imports": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "import/order": "off",
    },
  },
];
