require("dotenv").config();
const { build } = require("esbuild");
const glob = require("tiny-glob");
const { rmSync, existsSync } = require("fs");
const { dependencies, devDependencies } = require("../package.json");
const ScreepsPlugin = require("./screeps-plugin");

const { BRANCH, SERVER, DRY_RUN, BUILD_ALL } = process.env;

if ([BRANCH, SERVER].some((x) => !x)) {
  console.error("Missing one of environment variables: BRANCH, SERVER");
  return;
}

(async () => {
  if (existsSync("dist")) {
    console.log("Removing dist folder...");
    rmSync("dist", { recursive: true, force: true });
  }

  let entryPoints =
    BUILD_ALL === "true" ? await glob("./src/**/*.ts") : ["./src/main.ts"];

  console.log(
    "Building",
    BUILD_ALL === "true" ? `all ${entryPoints.length} files` : "only main.ts",
    "..."
  );

  build({
    entryPoints,
    outdir: "./dist",
    bundle: true,
    target: "ES2021",
    format: "cjs",
    minify: !(DRY_RUN === "true"),
    treeShaking: true,
    external: Object.keys(dependencies).concat(Object.keys(devDependencies)),
    plugins: [
      ScreepsPlugin({
        branch: BRANCH,
        server: SERVER,
        dryRun: DRY_RUN === "true",
      }),
    ],
    metafile: true,
  })
    .then(() => {
      console.log("Build complete!");
    })
    .catch((e) => {
      console.log("Build failed!", e);
    });
})();
