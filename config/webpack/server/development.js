'use strict';

const _ = require('lodash');
const path = require('path');
const crypto = require('crypto');
const webpack = require('webpack');
const ROOT = require('../../path-helper').ROOT;
const config = require('../../index');
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
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': "'development'",
    'process.env.SECRET_KEY': `"${crypto.randomBytes(8).toString('hex')}"`,
    'process.env.SERVER_RENDERING': process.env.SERVER_RENDERING || false,
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
);

module.exports = developmentConfig;
