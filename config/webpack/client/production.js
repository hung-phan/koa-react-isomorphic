'use strict';

const _ = require('lodash');
const config = require('./../../index');
const ROOT = require('./../../path-helper').ROOT;
const cssnext = require('postcss-cssnext');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCssPlugin = require('purifycss-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./../../webpack/webpack-isomorphic-tools')
);
const productionConfig = require('./default');

_.mergeWith(productionConfig, {
  devtool: false,
  output: {
    publicPath: config.path.assets,
    filename: '[name]-[chunkhash].bundle.js',
    chunkFilename: '[id]-[chunkhash].bundle.js',
  },
  postcss() {
    return [cssnext()];
  },
}, (obj1, obj2) =>
  _.isArray(obj2) ? obj2.concat(obj1) : undefined
);

productionConfig.module.loaders.push(
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', `css${config.cssModules}!postcss`),
  },
  {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('style', `css${config.cssModules}!postcss!less`),
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', `css${config.cssModules}!postcss!sass`),
  }
);

productionConfig.plugins.push(
  // new webpack.optimize.CommonsChunkPlugin('common', 'common-[chunkhash].bundle.js'), // Code splitting
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': "'production'",
    'process.env.SERVER_RENDERING': true,
  }),
  new ExtractTextPlugin('[name]-[contenthash].css'),
  new PurifyCssPlugin({
    basePath: ROOT,
    paths: [
      'app/server/templates/**/*.html',
      'app/client/**/*.js',
    ],
    purifyOptions: {
      minify: true,
    },
  }),
  new ChunkManifestPlugin({
    filename: 'webpack-common-manifest.json',
    manfiestVariable: 'webpackManifest',
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.optimize.UglifyJsPlugin(),
  webpackIsomorphicToolsPlugin
);

module.exports = productionConfig;
