'use strict';

var _             = require('lodash'),
    webpack       = require('webpack'),
    defaultConfig = require('./../../backend.config');

module.exports = _.merge(defaultConfig, {
  entry: {
    index: [
      'webpack/hot/signal.js'
    ]
  }, // Hot Module Replacement
  plugins: [
    new webpack.HotModuleReplacementPlugin({ quiet: true }), new webpack.NoErrorsPlugin(), // Hot Module Replacement
    /*new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js'),*/ // Code splitting
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"', '__DEV__': true })
  ]
}, function(obj1, obj2) {
  return _.isArray(obj2) ? obj2.concat(obj1) : undefined;
});
