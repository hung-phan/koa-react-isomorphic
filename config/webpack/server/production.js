const webpack = require("webpack");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const productionConfig = require("./default");

productionConfig.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new MinifyPlugin({}, {
    comments: false
  }),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": "'production'",
    "process.env.SERVER_RENDERING": true
  })
);

module.exports = productionConfig;
