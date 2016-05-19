'use strict';

const path = require('path');
const ROOT = require('./../../path-helper').ROOT;
const config = require('./../../index');
const webpack = require('webpack');

module.exports = {
  context: ROOT,
  entry: {
    app: [
      path.join(ROOT, config.path.app, 'app'),
    ],
  },
  output: {
    path: path.join(ROOT, config.path.publicAssets),
  },
  externals: [],
  resolve: {
    extensions: ['', '.js'],
    modules: [
      path.resolve('./app'),
      'node_modules',
    ],
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg|ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.RUNTIME_ENV': "'client'",
    }),
  ],
  eslint: {
    emitWarning: true,
  },
};
