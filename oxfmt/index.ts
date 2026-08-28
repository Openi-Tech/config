import { defineConfig } from 'oxfmt'

export const base = defineConfig({
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  arrowParens: 'avoid',
  tabWidth: 2,
  printWidth: 80,
  endOfLine: 'lf',
  sortImports: true,
  sortPackageJson: true,
  ignorePatterns: [
    '**/dist/**',
    '**/build/**',
    '**/node_modules/**',
    '**/.sst/**',
    '**/coverage/**',
    '**/*.gen.ts',
  ],
})
