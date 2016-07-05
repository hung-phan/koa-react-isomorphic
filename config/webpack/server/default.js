'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const ROOT = require('./../../path-helper').ROOT;
const config = require('./../../index');
const webpack = require('webpack');
const nodeModules = _.reduce(
                      // more info on https://github.com/jlongster/blog/blob/master/gulpfile.js
                      _.filter(fs.readdirSync('node_modules'), (x) => ['.bin'].indexOf(x) === -1),
                      (modules, mod) => Object.assign(modules, { [mod]: `commonjs ${mod}` }),
                      {}
                    );
const assets = '(.css|.less|.scss|.gif|.jpg|.jpeg|.png|.svg|.ttf|.eot|.woff|.woff2)';

module.exports = {
  context: ROOT,
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
  },
  entry: {
    server: [
      path.join(ROOT, config.path.app, 'server'),
    ],
  },
  output: {
    path: path.join(ROOT, config.path.build),
    publicPath: config.path.assets,
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    nodeModules,
    (context, request, callback) => {
      const regexp = new RegExp(`${assets}$`);

      return regexp.test(request)
        ? callback(null, `commonjs ${path.join(context.replace(ROOT, './../'), request)}`)
        : callback();
    },
  ],
  resolve: {
    extensions: ['', '.js'],
    modules: [
      path.resolve('./app'),
      'node_modules',
    ],
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.RUNTIME_ENV': "'server'",
    }),
  ],
  eslint: {
    emitWarning: true,
  },
};
