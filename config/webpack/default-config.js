const path = require("path");
const webpack = require("webpack");
const { ROOT } = require("../path-helper");
const config = require("..");

module.exports = {
  context: ROOT,
  entry: {
    app: [path.join(ROOT, config.path.app, "app")]
  },
  output: {
    path: path.join(ROOT, config.path.publicAssets)
  },
  devtool: "source-map",
  externals: [],
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve(ROOT, "app"), "node_modules"],
    alias: {
      modernizr$: path.join(ROOT, ".modernizrrc")
    }
  },
  module: {
    rules: [
      {
        test: /\.modernizrrc$/,
        use: ["modernizr-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg|ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ["file-loader"]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { ...config.cssModules, importLoaders: 1 }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { ...config.cssModules, importLoaders: 2 }
          },
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { ...config.cssModules, importLoaders: 2 }
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  optimization: {
    // https://webpack.js.org/plugins/split-chunks-plugin/#optimization-splitchunks
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          name: "default",
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.(js|jsx)$/,
      options: {
        eslint: {
          emitWarning: true
        }
      }
    })
  ]
};
