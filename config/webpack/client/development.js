'use strict';

var path          = require('path');
var _             = require('lodash');
var webpack       = require('webpack');
var cssnext       = require('cssnext');
var defaultConfig = require('./default');
var config        = require('config/config.json');
var ROOT          = require('config/path-helper').ROOT;

module.exports = _.merge(defaultConfig, {
  entry: {
    app: []
  }, // Hot Module Replacement
  output: {
    publicPath: 'http://localhost:8080' + config.path.build
  }, // Hot Module Replacement
  cache: true,
  debug: true,
  outputPathinfo: true,
  devtool: 'source-map',
  devServer: {
    contentBase: ROOT,
    noInfo: true,
    hot: true,
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass'
      }
    ]
  }, // Hot Module Replacement
  postcss: function () {
    return [cssnext()];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin(), // Hot Module Replacement
    /*new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js'),*/ // Code splitting
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'development'",
      'process.env.SERVER_RENDERING': process.env.SERVER_RENDERING || false
    })
  ]
}, function(obj1, obj2) {
  return _.isArray(obj2) ? obj2.concat(obj1) : undefined;
});
