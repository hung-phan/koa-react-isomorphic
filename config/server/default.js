'use strict';

var fs          = require('fs');
var path        = require('path');
var webpack     = require('webpack');
var _           = require('lodash');
var config      = require('./config.json');
var nodeModules = _.reduce(
                    // more info on https://github.com/jlongster/blog/blob/master/gulpfile.js
                    _.filter(fs.readdirSync('node_modules'), function(x) {
                      return ['.bin'].indexOf(x) === -1;
                    }),
                    function(modules, mod) {
                      modules[mod] = 'commonjs ' + mod;
                      return modules;
                    },
                    {}
                  );

module.exports = {
  context: path.join(__dirname, '../'),
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  entry: {
    index: config.backend.src + 'index'
  },
  output: {
    path: config.backend.dist,
    publicPath: config.backend.dist,
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
  recordsPath: path.join(__dirname, '../', config.backend.dist, '_records'),
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/)
  ]
};
