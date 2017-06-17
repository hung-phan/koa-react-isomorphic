const _ = require("lodash");
const webpack = require("webpack");
const BabiliPlugin = require("babili-webpack-plugin");
const defaultConfig = require("./default");
const productionConfig = require("./default");

_.mergeWith(defaultConfig, {
  devtool: false
});

productionConfig.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new BabiliPlugin({}, {
    comments: false
  }),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": "'production'",
    "process.env.SERVER_RENDERING": true
  })
);

module.exports = productionConfig;
