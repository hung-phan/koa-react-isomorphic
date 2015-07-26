'use strict';

var fs          = require('fs');
var path        = require('path');
var webpack     = require('webpack');
var _           = require('lodash');
var config      = require('./../config.json');
var rootPath    = path.join(__dirname, './../../');
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

nodeModules[path.join(rootPath, './dist/webpack-asset-manifest.json')] = true;
nodeModules[path.join(rootPath, './dist/webpack-common-manifest.json')] = true;

module.exports = {
  context: rootPath,
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  entry: {
    server: path.join(rootPath, config.path.src, 'server')
  },
  output: {
    path: path.join(rootPath, config.path.dist),
    publicPath: path.join(rootPath, config.path.dist),
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  externals: [
    nodeModules,
    function(context, request, callback) {
      return /^external!/.test(request) ? callback(null, 'commonjs ' + request.substr(9)) : callback();
    }
  ],
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
  recordsPath: path.join(rootPath, config.path.dist, '_records'),
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/)
  ]
};
