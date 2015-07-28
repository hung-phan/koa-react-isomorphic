'use strict';

var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var defaultConfig = require('./default');

module.exports = _.merge(defaultConfig, {
  entry: {
    server: [
      'webpack/hot/signal.js'
    ]
  }, // Hot Module Replacement
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
      loader: 'monkey-hot'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin(), // Hot Module Replacement
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.NO_SERVER_RENDERING': true
    })
  ]
}, function (obj1, obj2) {
  return _.isArray(obj2) ? obj2.concat(obj1) : undefined;
});
