'use strict';

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ROOT = require('../../path-helper').ROOT;
const config = require('../../index');
const assets = '(.css|.less|.scss|.gif|.jpg|.jpeg|.png|.svg|.ttf|.eot|.woff|.woff2)';

module.exports = {
  context: ROOT,
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
  },
  entry: {
    server: [
      path.join(ROOT, config.path.app, 'server'),
    ],
  },
  output: {
    path: path.join(ROOT, config.path.build),
    publicPath: config.path.assets,
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    nodeExternals({
      whitelist: [/^webpack/],
    }),
    (context, request, callback) => {
      const regexp = new RegExp(`${assets}$`);

      return regexp.test(request)
        ? callback(null, `commonjs ${path.join(context.replace(ROOT, '../'), request)}`)
        : callback();
    },
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('./app'),
      'node_modules',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.(js|jsx)$/,
      options: {
        eslint: {
          emitWarning: true,
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env.RUNTIME_ENV': "'server'",
    }),
  ],
};
