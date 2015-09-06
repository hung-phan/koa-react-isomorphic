'use strict';

var path          = require('path');
var crypto        = require('crypto');
var _             = require('lodash');
var webpack       = require('webpack');
var defaultConfig = require('./default');
var config        = require('config/config.json');
var ROOT          = require('config/path-helper').ROOT;

module.exports = _.merge(defaultConfig, {
  entry: {
    server: [
      'webpack/hot/poll?1000'
    ]
  }, // Hot Module Replacement
  devtool: 'source-map',
  devServer: {
    contentBase: ROOT,
    hot: true,
    inline: true
  },
  module: {
    loaders: [{
      test: /.js$/,
      exclude: /node_modules/,
      loader: 'monkey-hot'
    }]
  },
  recordsPath: path.join(ROOT, config.path.build, '_records'),
  plugins: [
    new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin(), // Hot Module Replacement
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      'process.env.SECRET_KEY': '"' + crypto.randomBytes(8).toString('hex') + '"',
      'process.env.SERVER_RENDERING': process.env.SERVER_RENDERING || false
    })
  ]
}, function (obj1, obj2) {
  return _.isArray(obj2) ? obj2.concat(obj1) : undefined;
});
