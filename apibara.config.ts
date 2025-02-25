import typescript from "@rollup/plugin-typescript";
import type { Plugin } from "apibara/rollup";
import { defineConfig } from "apibara/config";

export default defineConfig({
  runtimeConfig: {
    myIndexer: {
      startingBlock: 0,
      streamUrl: "https://starknet.preview.apibara.org",
      postgresConnectionString:
        process.env["POSTGRES_CONNECTION_STRING"] ?? "memory://myIndexer",
    },
  },
  rollupConfig: {
    plugins: [typescript() as Plugin],
  },
});
