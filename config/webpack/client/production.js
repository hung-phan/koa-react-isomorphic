const _ = require("lodash");
const webpack = require("webpack");
const OfflinePlugin = require("offline-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackIsomorphicToolsPlugin = require("webpack-isomorphic-tools/plugin");
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require("../../webpack/webpack-isomorphic-tools")
);
const productionConfig = require("./default");
const config = require("../..");

_.merge(
  productionConfig,
  {
    mode: "production",
    devtool: false,
    output: {
      publicPath: config.path.assets,
      filename: "[name].[chunkhash].js",
      chunkFilename: "[id].[chunkhash].js"
    },
    optimization: {
      minimizer: [
        new MinifyPlugin(
          {},
          {
            comments: false
          }
        ),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
  }
);

productionConfig.module.rules.push(
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      { loader: "css-loader", options: { ...config.cssModules, importLoaders: 1 } },
      "postcss-loader"
    ]
  },
  {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      { loader: "css-loader", options: { ...config.cssModules, importLoaders: 2 } },
      "postcss-loader",
      "less-loader"
    ]
  },
  {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      { loader: "css-loader", options: { ...config.cssModules, importLoaders: 2 } },
      "postcss-loader",
      "sass-loader"
    ]
  }
);

productionConfig.plugins.push(
  new webpack.DefinePlugin({
    "process.env.SERVER_RENDERING": true
  }),
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
    chunkFilename: "[id].[contenthash].css"
  }),
  new OfflinePlugin({
    safeToUseOptionalCaches: true,
    caches: {
      main: ["*.js", "*.css"],
      additional: [":externals:"],
      optional: [":rest:"]
    },
    externals: ["*.woff", "*.woff2", "*.eot", "*.ttf"],
    relativePaths: false,
    ServiceWorker: {
      // disable minifier for webpack 4
      minify: false,
      output: "../sw.js",
      publicPath: "/sw.js",
      events: true
    }
  }),
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
  new CompressionPlugin(),
  webpackIsomorphicToolsPlugin
);

module.exports = productionConfig;
