# @openi/config

Shared oxlint / prettier / tsconfig for Openi projects.

```bash
bun add -d oxlint@1.80.0 @oxlint/plugins@1.80.0 'github:Openi-Tech/config#v0.1.0'
```

Pin a tag; bump the tag to roll rule changes across repos. `oxlint` and `@oxlint/plugins` versions must match the peer range in `package.json`.

```ts
// oxlint.config.ts
import { defineConfig } from "oxlint";
import { base, configs, react, node, tests } from "@openi/config/oxlint";

export default defineConfig({
  extends: [base],
  overrides: [react(["apps/web/**"]), node(["apps/api/**", "packages/**"]), tests(["**/*.test.ts"]), configs()],
});
```

```js
// prettier.config.js
export { default } from "@openi/config/prettier";
```

```json
// tsconfig.json
{ "extends": "@openi/config/tsconfig/react" }
```

Custom rules live in `oxlint/plugin.ts` under the `openi/` prefix. Repo-only rules go in `.oxlint-plugins/` of that repo and are appended to `jsPlugins`.
