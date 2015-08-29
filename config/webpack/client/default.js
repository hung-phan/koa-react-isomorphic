'use strict';

var path    = require('path');
var webpack = require('webpack');
var config  = require('config/config.json');
var ROOT    = require('config/path-helper').ROOT;

module.exports = {
  context: ROOT,
  entry: {
    app: path.join(ROOT, config.path.app, 'app')
  },
  output: {
    path: path.join(ROOT, config.path.publicAssets),
    publicPath: config.path.assets,
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },
  externals: {},
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
      // fonts
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/'react'/, 'react/addons'),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    ]),
    new webpack.DefinePlugin({
      'process.env.runtimeEnv': '"client"'
    })
  ]
};
