const _ = require("lodash");
const path = require("path");
const webpack = require("webpack");
const cssnext = require("postcss-cssnext");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const { clientConfiguration } = require("universal-webpack");
const { ROOT } = require("../../path-helper");
const config = require("../..");

const developmentConfig = clientConfiguration(
  require("../default-config"),
  require("../universal-webpack-settings"),
  {
    development: true
  }
);

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

developmentConfig.plugins.push(
  new webpack.DefinePlugin({
    "process.env.RUNTIME_ENV": "'client'",
    "process.env.SERVER_RENDERING": process.env.SERVER_RENDERING || false
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
  new webpack.HotModuleReplacementPlugin()
);

module.exports = developmentConfig;
