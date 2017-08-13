const path = require("path");
const webpack = require("webpack");
const cssnext = require("postcss-cssnext");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const ROOT = require("../../path-helper").ROOT;
const config = require("../..");

module.exports = {
  context: ROOT,
  entry: {
    app: [path.join(ROOT, config.path.app, "app")],
    vendor: [
      path.join(ROOT, config.path.app, "client/helpers/loadExternalLibs")
    ]
  },
  output: {
    path: path.join(ROOT, config.path.publicAssets)
  },
  externals: [],
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve("./app"), "node_modules"],
    alias: {
      modernizr$: path.join(ROOT, ".modernizrrc")
    }
  },
  module: {
    loaders: [
      {
        test: /\.modernizrrc$/,
        loader: "modernizr-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg|ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.(js|jsx)$/,
      options: {
        eslint: {
          emitWarning: true
        }
      }
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
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env.RUNTIME_ENV": "'client'"
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: module => module.context && module.context.includes("node_modules")
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 4
    })
  ]
};
