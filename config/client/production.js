'use strict';

var _                   = require('lodash');
var webpack             = require('webpack');
var ManifestPlugin      = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var defaultConfig       = require('./default');

module.exports = _.merge(defaultConfig, {
  devtool: false,
  output: {
    filename: '[name]-[chunkhash].bundle.js',
    chunkFilename: '[id]-[chunkhash].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"', '__DEV__': false }),
    new ManifestPlugin({
      fileName: 'webpack-asset-manifest.json'
    }),
    new ChunkManifestPlugin({
      filename: 'webpack-common-manifest.json',
      manfiestVariable: 'webpackManifest'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}, function(obj1, obj2) {
  return _.isArray(obj2) ? obj2.concat(obj1) : undefined;
});
