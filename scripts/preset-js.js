module.exports = {
  presets: [
    [
      "babel-preset-env",
      {
        targets:
          process.env.RUNTIME_ENV === "client"
            ? { browsers: ["last 2 versions", "safari >= 7"] }
            : { node: "current" },
        useBuiltIns: false,
        modules: process.env.RUN_MODE === "es" ? false : "commonjs"
      }
    ]
  ],
  plugins: [
    [
      "transform-runtime",
      {
        polyfill: false,
        useBuiltIns: true,
        useESModules: true
      }
    ]
  ]
};
