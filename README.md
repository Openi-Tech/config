# @openi/config

Shared oxlint / oxfmt / tsconfig for Openi projects.

```bash
bun add -d oxlint@1.80.0 @oxlint/plugins@1.80.0 oxfmt@0.65.0 'github:Openi-Tech/config#v0.2.0'
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
// oxfmt.config.ts
import { defineConfig } from 'oxfmt'
import { base } from '@openi/config/oxfmt'

export default defineConfig({ ...base })
```

```json
// tsconfig.json
{ "extends": "@openi/config/tsconfig/react" }
```

Custom rules live in `oxlint/plugin.ts` under the `openi/` prefix. Repo-only rules go in `.oxlint-plugins/` of that repo and are appended to `jsPlugins`.
