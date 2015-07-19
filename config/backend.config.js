'use strict';

var _           = require('lodash'),
    fs          = require('fs'),
    path        = require('path'),
    webpack     = require('webpack'),
    config      = require('./config.json'),
    nodeModules = {};

// add all node_modules to externals
_(fs.readdirSync('node_modules'))
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .each(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  })
  .value();

module.exports = {
  context: path.join(__dirname, '../'),
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  entry: {
    index: config.backend.path + 'index'
  },
  output: {
    path: config.backend.build,
    publicPath: config.backend.build,
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  externals: nodeModules,
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader?optional=runtime'
    }]
  },
  recordsPath: path.join(__dirname, '../', 'build/server/_records'),
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/)
  ]
};
