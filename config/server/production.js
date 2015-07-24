'use strict';

var _             = require('lodash');
var webpack       = require('webpack');
var defaultConfig = require('./../../backend.config');

module.exports = _.merge(defaultConfig, {
  devtool: false,
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}, function(obj1, obj2) {
  return _.isArray(obj2) ? obj2.concat(obj1) : undefined;
});
