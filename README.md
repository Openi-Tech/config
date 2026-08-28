# @openi/config

Shared oxlint / oxfmt / tsconfig for Openi projects.

```bash
bun add -d oxlint@1.80.0 @oxlint/plugins@1.80.0 oxfmt@0.65.0 'github:Openi-Tech/config#v0.3.1'
```

Pin a tag; bump the tag to roll rule changes across repos. `oxlint`, `@oxlint/plugins` and `oxfmt` versions must match the peer range in `package.json`.

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint'
import { base, configs, react, node, tests } from '@openi/config/oxlint'

export default defineConfig({
  extends: [base],
  overrides: [
    react(['apps/web/**']),
    node(['apps/api/**', 'packages/**']),
    tests(['**/*.test.ts']),
    configs(),
  ],
})
```

```ts
// oxfmt.config.mts
import { defineConfig } from 'oxfmt'
import { base } from '@openi/config/oxfmt'

export default defineConfig({ ...base })
```

```json
// tsconfig.json
{ "extends": "@openi/config/tsconfig/react" }
```

Sources are plain JS with JSDoc types (Node refuses to type-strip `.ts` under `node_modules`). Custom rules live in `oxlint/plugin.js` under the `openi/` prefix. Repo-only rules go in `.oxlint-plugins/` of that repo and are appended to `jsPlugins`.
