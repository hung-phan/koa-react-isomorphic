'use strict';

var path    = require('path'),
    webpack = require('webpack'),
    config  = require('./config.json');

module.exports = {
  context: path.join(__dirname, '../'),
  entry: {
    index: config.frontend.path + 'index'
  },
  output: {
    path: config.frontend.build,
    publicPath: config.frontend.build,
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
