'use strict';

const _ = require('lodash');
const path = require('path');
const ROOT = require('config/path-helper').ROOT;
const config = require('config/config.json');
const cssnext = require('cssnext');
const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('config/webpack/webpack-isomorphic-tools')
);
let developmentConfig = require('./default');

_.merge(developmentConfig, {
  output: {
    publicPath: 'http://localhost:8080' + config.path.build,
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  cache: true,
  debug: true,
  outputPathinfo: true,
  devtool: 'source-map',
  devServer: {
    contentBase: ROOT,
    noInfo: true,
    hot: true,
    inline: true
  },
  postcss() {
    return [cssnext()];
  }
}, (obj1, obj2) => {
  return _.isArray(obj2) ? obj2.concat(obj1) : undefined;
});

developmentConfig.module.loaders.push(
  {
    test: /\.css$/,
    loader: `style!css${config.cssModules}!postcss`
  },
  {
    test: /\.less$/,
    loader: `style!css${config.cssModules}!postcss!less`
  },
  {
    test: /\.scss$/,
    loader: `style!css${config.cssModules}!postcss!sass`
  }
);

developmentConfig.plugins.push(
  // new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js'), // Code splitting
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': "'development'",
    'process.env.SERVER_RENDERING': process.env.SERVER_RENDERING || false
  }),
  new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin(), // Hot Module Replacement
  webpackIsomorphicToolsPlugin.development()
);

module.exports = developmentConfig;
