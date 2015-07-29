'use strict';

var _                 = require('lodash');
var path              = require('path');
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var defaultConfig     = require('./default');
var config            = require('./../config.json');

module.exports = _.merge(defaultConfig, {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080' + config.path.build
    ]
  }, // Hot Module Replacement
  output: {
    publicPath: 'http://localhost:8080' + config.path.build
  }, // Hot Module Replacement
  cache: true,
  debug: true,
  outputPathinfo: true,
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, './../../'),
    hot: true,
    inline: true
  },
  module: {
    loaders: [{
      test: /.js$/,
      exclude: /node_modules/,
      loader: 'react-hot'
    }]
  }, // Hot Module Replacement
  plugins: [
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin(), // Hot Module Replacement
    /*new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js'),*/ // Code splitting
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ]
}, function(obj1, obj2) {
  return _.isArray(obj2) ? obj2.concat(obj1) : undefined;
});
