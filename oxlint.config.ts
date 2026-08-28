import { defineConfig } from 'oxlint'

import { base, configs, node } from './oxlint/index.ts'

export default defineConfig({
  extends: [base],
  jsPlugins: ['./oxlint/plugin.ts'],
  overrides: [node(['**/*.ts']), configs()],
})
