'use strict';

var path    = require('path');
var webpack = require('webpack');
var config  = require('./config.json');

module.exports = {
  context: path.join(__dirname, '../'),
  entry: {
    index: config.frontend.src + 'index'
  },
  output: {
    path: config.frontend.dist,
    publicPath: config.frontend.dist,
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },
  externals: {},
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader?optional=runtime'
    }]
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    ])
  ]
};
