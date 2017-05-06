const presetEnv = {
  modules: process.env.RUN_MODE === "es" ? false : "commonjs"
};

if (process.env.RUNTIME_ENV === "server") {
  presetEnv.targets = { node: "current" };
} else {
  presetEnv.targets = { browsers: ["last 2 versions", "safari >= 7"] };
}

module.exports = {
  presets: [
    ["babel-preset-env", presetEnv],
  ],
};
