'use strict';

const _ = require('lodash');
const path = require('path');
const ROOT = require('./../../path-helper').ROOT;
const config = require('./../../index');
const cssnext = require('postcss-cssnext');
const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./../../webpack/webpack-isomorphic-tools')
);
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
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
  recordsPath: path.join(ROOT, config.path.tmp, 'client-records.json'),
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
  new HardSourceWebpackPlugin({
    // Either an absolute path or relative to output.path.
    cacheDirectory: path.join(ROOT, config.path.tmp, 'cache'),
    // Optional field. This field determines when to throw away the whole
    // cache if for example npm modules were updated.
    environmentPaths: {
      root: process.cwd(),
      directories: ['node_modules'],
      // Add your webpack configuration paths here so changes to loader
      // configuration and other details will cause a fresh build to occur.
      files: [
        path.join(ROOT, 'package.json'),
        path.join(ROOT, 'config/webpack/client/default.js'),
        path.join(ROOT, 'config/webpack/client/development.js'),
      ],
    },
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': "'development'",
    'process.env.SERVER_RENDERING': process.env.SERVER_RENDERING || false,
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['common'],
    minChunks: module => /node_modules/.test(module.resource),
  }),
  webpackIsomorphicToolsPlugin.development(),
  new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin() // Hot Module Replacement
);

module.exports = developmentConfig;
