'use strict';

var _                   = require('lodash');
var webpack             = require('webpack');
var ManifestPlugin      = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var cssnext             = require('cssnext');
var cssnano             = require('cssnano');
var defaultConfig       = require('./default');

module.exports = _.merge(defaultConfig, {
  devtool: false,
  output: {
    filename: '[name]-[chunkhash].bundle.js',
    chunkFilename: '[id]-[chunkhash].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
      }
    ]
  },
  postcss: function () {
    return [cssnext(), cssnano];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'production'"
    }),
    new ExtractTextPlugin('[name]-[contenthash].css'),
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
