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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.modernizrrc$/,
        use: ["modernizr-loader"]
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
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: "all",
      name: "vendor",
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
