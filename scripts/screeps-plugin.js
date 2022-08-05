const { ScreepsAPI } = require("screeps-api");
const { readFileSync } = require("fs");

const ScreepsPlugin = ({ branch, server, dryRun }) => ({
  name: "screeps-plugin",
  async setup(build) {
    if (dryRun) {
      console.log("Dry run, skipping screeps-plugin...");
      return;
    }
    console.log("Connecting to Screeps...");
    const api = await ScreepsAPI.fromConfig(server);
    console.log("Screeps API connected with:", (await api.me()).username);

    build.onEnd(({ metafile: { outputs } }) => {
      const files = Object.keys(outputs);
      let code = {};

      files.map((file) => {
        let keyHydrated = file.replace("dist/", "").replace(/\.js$/, "");
        code[keyHydrated] = readFileSync(file, "utf8");
      });

      console.log("Uploading dist...");
      api.code.set(branch, code).then(({ ok, timestamp }) => {
        const timeString = new Date(timestamp).toLocaleString();
        console.log(
          `Uploaded with ${ok ? "success" : "error"} at ${timeString}`
        );
      });
    });
  },
});

module.exports = ScreepsPlugin;
