import { defineConfig } from "oxlint";

import { base, configs, node } from "./oxlint/index.js";

export default defineConfig({
  extends: [base],
  jsPlugins: ["./oxlint/plugin.js"],
  overrides: [node(["**/*.{js,ts}"]), configs()],
});
