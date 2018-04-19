const _ = require("lodash");
const webpack = require("webpack");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const productionConfig = require("./default");

_.merge(
  productionConfig,
  {
    mode: "production",
    devtool: false
  }
);

productionConfig.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new MinifyPlugin(
    {},
    {
      comments: false
    }
  ),
  new webpack.DefinePlugin({
    "process.env.SERVER_RENDERING": true
  })
);

module.exports = productionConfig;
