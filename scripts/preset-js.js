module.exports = {
  presets: [
    [
      "babel-preset-env",
      {
        targets:
          process.env.RUNTIME_ENV === "client"
            ? { browsers: ["> 1%", "last 2 versions", "Firefox ESR"] }
            : { node: "current" },
        useBuiltIns: true,
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
