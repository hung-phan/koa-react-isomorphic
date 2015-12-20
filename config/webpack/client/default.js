'use strict';

const path = require('path');
const ROOT = require('config/path-helper').ROOT;
const config = require('config/config.json');
const webpack = require('webpack');

module.exports = {
  context: ROOT,
  entry: {
    app: [
      path.join(ROOT, config.path.app, 'app')
    ]
  },
  output: {
    path: path.join(ROOT, config.path.publicAssets)
  },
  externals: [],
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg|ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    ]),
    new webpack.NormalModuleReplacementPlugin(/external!/, (result) => {
      result.request = result.request.replace(/external!/, '');
    }),
    new webpack.DefinePlugin({
      'process.env.RUNTIME_ENV': "'client'"
    })
  ]
};
