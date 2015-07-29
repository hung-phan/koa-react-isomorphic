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

module.exports = {
  context: rootPath,
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  entry: {
    server: path.join(rootPath, config.path.app, 'server')
  },
  output: {
    path: path.join(rootPath, config.path.build),
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  externals: [
    nodeModules,
    function(context, request, callback) {
      var external = 'external!';

      return (new RegExp('^' + external)).test(request)
        ? callback(null, 'commonjs ' + path.join(rootPath, request.substr(external.length)))
        : callback();
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
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/)
  ]
};
