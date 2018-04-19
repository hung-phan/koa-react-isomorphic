const _ = require("lodash");
const path = require("path");
const webpack = require("webpack");
const WebpackIsomorphicToolsPlugin = require("webpack-isomorphic-tools/plugin");
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require("../../webpack/webpack-isomorphic-tools")
);
const developmentConfig = require("./default");
const { ROOT } = require("../../path-helper");
const config = require("../..");

_.mergeWith(
  developmentConfig,
  {
    mode: "development",
    entry: {
      app: ["react-hot-loader/patch"]
    },
    output: {
      publicPath: `http://localhost:8080${config.path.build}`,
      filename: "[name].js",
      chunkFilename: "[id].js"
    },
    cache: true,
    devtool: "source-map",
    devServer: {
      contentBase: ROOT,
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      inline: true
    },
    recordsPath: path.join(ROOT, config.path.tmp, "client-records.json"),
    optimization: {
      noEmitOnErrors: true
    }
  },
  (obj1, obj2) => (_.isArray(obj2) ? obj2.concat(obj1) : undefined)
);

developmentConfig.module.rules.push(
  {
    test: /\.css$/,
    use: [
      "style-loader",
      { loader: "css-loader", options: { ...config.cssModules, importLoaders: 1 } },
      "postcss-loader"
    ]
  },
  {
    test: /\.less$/,
    use: [
      "style-loader",
      { loader: "css-loader", options: { ...config.cssModules, importLoaders: 2 } },
      "postcss-loader",
      "less-loader"
    ]
  },
  {
    test: /\.scss$/,
    use: [
      "style-loader",
      { loader: "css-loader", options: { ...config.cssModules, importLoaders: 2 } },
      "postcss-loader",
      "sass-loader"
    ]
  }
);

developmentConfig.plugins.push(
  new webpack.DefinePlugin({
    "process.env.SERVER_RENDERING": process.env.SERVER_RENDERING || false
  }),
  webpackIsomorphicToolsPlugin.development(),
  new webpack.HotModuleReplacementPlugin()
);

module.exports = developmentConfig;
