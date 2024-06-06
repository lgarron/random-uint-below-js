import { $ } from "bun";
import { build } from "esbuild";

const outfile = "./.temp/benchmark-deno/main.js";

await build({
  entryPoints: ["./src/benchmark/main.ts"],
  outfile,
  bundle: true,
  format: "esm",
  target: "es2020",
});

await $`deno run ${outfile}`;
