module.exports = {
  presets: [
    [
      "babel-preset-env",
      {
        targets: process.env.RUNTIME_ENV === "client"
          ? { browsers: ["last 2 versions", "safari >= 7"] }
          : { node: "current" },
        modules: process.env.RUN_MODE === "es" ? false : "commonjs"
      }
    ]
  ]
};
