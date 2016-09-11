'use strict';

const _ = require('lodash');
const path = require('path');
const ROOT = require('./../../path-helper').ROOT;
const config = require('./../../index');
const crypto = require('crypto');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const developmentConfig = require('./default');

_.mergeWith(developmentConfig, {
  entry: {
    server: [
      'webpack/hot/poll?1000',
    ],
  },
  recordsPath: path.join(ROOT, config.path.tmp, 'server-records.json'),
}, (obj1, obj2) =>
  _.isArray(obj2) ? obj2.concat(obj1) : undefined
);

developmentConfig.plugins.push(
  new HardSourceWebpackPlugin({
    // Either an absolute path or relative to output.path.
    cacheDirectory: path.join(ROOT, config.path.tmp, 'cache/server'),
    // Optional field. This field determines when to throw away the whole
    // cache if for example npm modules were updated.
    environmentPaths: {
      root: process.cwd(),
      directories: ['node_modules'],
      // Add your webpack configuration paths here so changes to loader
      // configuration and other details will cause a fresh build to occur.
      files: [
        path.join(ROOT, 'package.json'),
        path.join(ROOT, 'config/webpack/server/default.js'),
        path.join(ROOT, 'config/webpack/server/development.js'),
      ],
    },
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': "'development'",
    'process.env.SECRET_KEY': `"${crypto.randomBytes(8).toString('hex')}"`,
    'process.env.SERVER_RENDERING': process.env.SERVER_RENDERING || false,
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin() // Hot Module Replacement
);

module.exports = developmentConfig;
