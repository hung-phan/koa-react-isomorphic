const _ = require("lodash");
const webpack = require("webpack");
const MinifyPlugin = require("uglifyjs-webpack-plugin");
const { serverConfiguration } = require("universal-webpack");

const productionConfig = serverConfiguration(
  require("../default-config"),
  require("../universal-webpack-settings")
);

_.merge(productionConfig, {
  mode: "production"
});

productionConfig.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new MinifyPlugin({
    cache: true,
    parallel: true,
    sourceMap: true
  }),
  new webpack.DefinePlugin({
    "process.env.RUNTIME_ENV": "'server'",
    "process.env.SERVER_RENDERING": true
  })
);

module.exports = productionConfig;
