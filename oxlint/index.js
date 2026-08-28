import { defineConfig } from "oxlint";

/** @typedef {NonNullable<import('oxlint').OxlintConfig['overrides']>[number]} Override */

export const ignorePatterns = [
  "**/dist/**",
  "**/build/**",
  "**/node_modules/**",
  "**/.sst/**",
  "**/coverage/**",
  "**/*.gen.ts",
  "**/*.d.ts",
];

export const base = defineConfig({
  plugins: ["typescript", "import", "unicorn", "oxc", "promise"],
  jsPlugins: ["@openi/config/oxlint/plugin"],
  categories: { correctness: "error", suspicious: "warn" },
  env: { es2022: true },
  ignorePatterns,
  rules: {
    "no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_", args: "after-used" },
    ],
    "no-restricted-imports": ["error", { patterns: ["../*"] }],
    "no-console": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "openi/no-classes": "error",
    "openi/no-conditional-await-fallback": "error",
  },
});

/** @param {string[]} files @returns {Override} */
export const react = (files) => ({
  files,
  plugins: ["react", "jsx-a11y"],
  env: { browser: true },
  rules: {
    "import/no-default-export": "error",
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off",
    "react-hooks/exhaustive-deps": "off",
  },
});

/** @param {string[]} files @returns {Override} */
export const node = (files) => ({
  files,
  plugins: ["node"],
  env: { node: true },
});

/** @param {string[]} [files] @returns {Override} */
export const configs = (files = ["**/*.config.{js,cjs,mjs,ts,mts}", "**/vite.config.ts"]) => ({
  files,
  rules: { "import/no-default-export": "off" },
});

/** @param {string[]} files @returns {Override} */
export const tests = (files) => ({
  files,
  plugins: ["vitest"],
  env: { vitest: true },
  rules: { "openi/no-classes": "off" },
});
