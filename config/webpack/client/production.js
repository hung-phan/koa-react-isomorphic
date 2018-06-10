const _ = require("lodash");
const webpack = require("webpack");
const cssnext = require("postcss-cssnext");
const OfflinePlugin = require("offline-plugin");
const MinifyPlugin = require("uglifyjs-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { clientConfiguration } = require("universal-webpack");
const config = require("../..");

const productionConfig = clientConfiguration(
  require("../default-config"),
  require("../universal-webpack-settings"),
  {
    development: false,
    useMiniCssExtractPlugin: true
  }
);

_.merge(productionConfig, {
  mode: "production",
  devtool: false,
  output: {
    publicPath: config.path.assets,
    filename: "[name].[chunkhash].js",
    chunkFilename: "[id].[chunkhash].js"
  },
  optimization: {
    minimizer: [
      new MinifyPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: {
      name: "runtime"
    }
  }
});

productionConfig.plugins.push(
  new webpack.DefinePlugin({
    "process.env.RUNTIME_ENV": "'client'",
    "process.env.SERVER_RENDERING": true
  }),
  new webpack.LoaderOptionsPlugin({
    test: /\.(css|less|scss)$/,
    options: {
      postcss() {
        return [cssnext()];
      }
    }
  }),
  new StyleLintPlugin(),
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
      output: "../sw.js",
      publicPath: "/sw.js",
      events: true
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new CompressionPlugin()
);

module.exports = productionConfig;
