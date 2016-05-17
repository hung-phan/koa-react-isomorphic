'use strict';

const _ = require('lodash');
const ROOT = require('./../../path-helper').ROOT;
const config = require('./../../index');
const cssnext = require('postcss-cssnext');
const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./../../webpack/webpack-isomorphic-tools')
);
const developmentConfig = require('./default');

_.mergeWith(developmentConfig, {
  output: {
    publicPath: `http://localhost:8080${config.path.build}`,
    filename: '[name].js',
    chunkFilename: '[id].js',
  },
  cache: true,
  debug: true,
  outputPathinfo: true,
  devtool: 'source-map',
  devServer: {
    contentBase: ROOT,
    noInfo: true,
    hot: true,
    inline: true,
  },
  postcss() {
    return [cssnext()];
  },
}, (obj1, obj2) =>
  _.isArray(obj2) ? obj2.concat(obj1) : undefined
);

developmentConfig.module.loaders.push(
  {
    test: /\.css$/,
    loader: `style!css${config.cssModules}!postcss`,
  },
  {
    test: /\.less$/,
    loader: `style!css${config.cssModules}!postcss!less`,
  },
  {
    test: /\.scss$/,
    loader: `style!css${config.cssModules}!postcss!sass`,
  }
);

developmentConfig.plugins.push(
  // new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js'), // Code splitting
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': "'development'",
    'process.env.SERVER_RENDERING': process.env.SERVER_RENDERING || false,
  }),
  webpackIsomorphicToolsPlugin.development(),
  new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin() // Hot Module Replacement
);

module.exports = developmentConfig;
