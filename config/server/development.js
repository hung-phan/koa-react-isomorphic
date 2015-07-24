'use strict';

var _             = require('lodash');
var webpack       = require('webpack');
var defaultConfig = require('./../../backend.config');

module.exports = _.merge(defaultConfig, {
  entry: {
    index: [
      'webpack/hot/signal.js'
    ]
  }, // Hot Module Replacement
  module: {
    loaders: [{
      test: /.js$/,
      exclude: /node_modules/,
      loader: 'monkey-hot'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({ quiet: true }), new webpack.NoErrorsPlugin(), // Hot Module Replacement
    /*new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js'),*/ // Code splitting
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"', 'process.env.NO_SERVER_RENDERING': true, '__DEV__': true })
  ]
}, function(obj1, obj2) {
  return _.isArray(obj2) ? obj2.concat(obj1) : undefined;
});
