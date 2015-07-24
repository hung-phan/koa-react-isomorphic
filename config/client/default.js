'use strict';

var path     = require('path');
var webpack  = require('webpack');
var config   = require('./../config.json');
var rootPath = path.join(__dirname, './../../');

module.exports = {
  context: rootPath,
  entry: {
    app: path.join(rootPath, config.path.src, 'app')
  },
  output: {
    path: path.join(rootPath, config.path.dist),
    publicPath: path.join(rootPath, config.path.dist),
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
