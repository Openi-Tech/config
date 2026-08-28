import { defineConfig } from "oxfmt";

export const base = defineConfig({
  sortImports: true,
  sortPackageJson: true,
  ignorePatterns: [
    "**/dist/**",
    "**/build/**",
    "**/node_modules/**",
    "**/.sst/**",
    "**/coverage/**",
    "**/*.gen.ts",
  ],
});
