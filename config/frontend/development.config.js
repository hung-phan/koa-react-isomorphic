'use strict';

var _             = require('lodash'),
    defaultConfig = require('./default.config'),
    webpack       = require('webpack');

module.exports = _.merge(defaultConfig, {
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:8080/dist/',
      'webpack/hot/only-dev-server'
    ]
  }, // Hot Module Replacement
  output: {
    publicPath: 'http://localhost:8080/dist/'
  }, // Hot Module Replacement
  cache: true,
  debug: true,
  outputPathinfo: true,
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /.js$/,
      exclude: /node_modules/,
      loader: 'react-hot'
    }]
  }, // Hot Module Replacement
  plugins: [
    new webpack.NoErrorsPlugin(), // Hot Module Replacement
    /*new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js'),*/ // Code splitting
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"', '__DEV__': true })
  ]
}, function(obj1, obj2) {
  return _.isArray(obj2) ? obj2.concat(obj1) : undefined;
});
