const _ = require("lodash");
const config = require("../../index");
const webpack = require("webpack");
const OfflinePlugin = require("offline-plugin");
const BabiliPlugin = require("babili-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const WebpackIsomorphicToolsPlugin = require("webpack-isomorphic-tools/plugin");
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require("../../webpack/webpack-isomorphic-tools")
);
const productionConfig = require("./default");

_.mergeWith(
  productionConfig,
  {
    devtool: false,
    output: {
      publicPath: config.path.assets,
      filename: "[name].[chunkhash].js",
      chunkFilename: "[id].[chunkhash].js"
    }
  },
  (obj1, obj2) => (_.isArray(obj2) ? obj2.concat(obj1) : undefined)
);

productionConfig.module.loaders.push(
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: `css-loader${config.cssModules}!postcss-loader`
    })
  },
  {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: `css-loader${config.cssModules}!postcss-loader!less-loader`
    })
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: `css-loader${config.cssModules}!postcss-loader!sass-loader`
    })
  }
);

productionConfig.plugins.push(
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": "'production'",
    "process.env.SERVER_RENDERING": true
  }),
  new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    allChunks: true
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new BabiliPlugin({}, {
    comments: false
  }),
  new CompressionPlugin(),
  webpackIsomorphicToolsPlugin,
  new OfflinePlugin({
    safeToUseOptionalCaches: true,
    caches: {
      main: [
        "*.js",
        "*.css",
        "/"
      ],
      additional: [
        "*.woff",
        "*.woff2",
        "*.eot",
        "*.ttf"
      ],
      optional: [":rest:"]
    },
    externals: ["/"],
    relativePaths: false,
    ServiceWorker: {
      output: "../sw.js",
      publicPath: "/sw.js",
      events: true
    }
  })
);

module.exports = productionConfig;
