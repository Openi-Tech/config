import { defineConfig } from 'oxlint'
import type { OxlintConfig } from 'oxlint'

type Override = NonNullable<OxlintConfig['overrides']>[number]

export const ignorePatterns = [
  '**/dist/**',
  '**/build/**',
  '**/node_modules/**',
  '**/.sst/**',
  '**/coverage/**',
  '**/*.gen.ts',
  '**/*.d.ts',
]

export const base = defineConfig({
  plugins: ['typescript', 'import', 'unicorn', 'oxc', 'promise'],
  jsPlugins: ['@openi/config/oxlint/plugin'],
  categories: { correctness: 'error', suspicious: 'warn' },
  env: { es2022: true },
  ignorePatterns,
  rules: {
    'no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_', args: 'after-used' },
    ],
    'no-restricted-imports': ['error', { patterns: ['../*'] }],
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'openi/no-classes': 'error',
    'openi/no-conditional-await-fallback': 'error',
  },
})

export const react = (files: string[]): Override => ({
  files,
  plugins: ['react', 'jsx-a11y'],
  env: { browser: true },
  rules: {
    'import/no-default-export': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
})

export const node = (files: string[]): Override => ({
  files,
  plugins: ['node'],
  env: { node: true },
})

export const configs = (
  files: string[] = ['**/*.config.{js,cjs,mjs,ts}', '**/vite.config.ts'],
): Override => ({
  files,
  rules: { 'import/no-default-export': 'off' },
})

export const tests = (files: string[]): Override => ({
  files,
  plugins: ['vitest'],
  env: { vitest: true },
  rules: { 'openi/no-classes': 'off' },
})
