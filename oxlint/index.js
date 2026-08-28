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

const reactCompilerRules = [
  "set-state-in-effect",
  "incompatible-library",
  "refs",
  "capitalized-calls",
  "exhaustive-effect-dependencies",
  "memo-dependencies",
  "static-components",
  "preserve-manual-memoization",
  "immutability",
  "use-memo",
  "purity",
  "iframe-missing-sandbox",
];

const a11yRules = [
  "label-has-associated-control",
  "prefer-tag-over-role",
  "click-events-have-key-events",
  "no-static-element-interactions",
  "no-autofocus",
  "role-has-required-aria-props",
  "no-noninteractive-element-interactions",
  "control-has-associated-label",
];

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
    ...Object.fromEntries(reactCompilerRules.map((r) => [`react/${r}`, "off"])),
    ...Object.fromEntries(a11yRules.map((r) => [`jsx-a11y/${r}`, "warn"])),
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
