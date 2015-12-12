'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const ROOT = require('config/path-helper').ROOT;
const config = require('config/config.json');
const webpack = require('webpack');
const nodeModules = _.reduce(
                      // more info on https://github.com/jlongster/blog/blob/master/gulpfile.js
                      _.filter(fs.readdirSync('node_modules'), (x) => ['.bin'].indexOf(x) === -1),
                      (modules, mod) => Object.assign(modules, { [mod]: `commonjs ${mod}` }),
                      {}
                    );

module.exports = {
  context: ROOT,
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  entry: {
    server: [
      path.join(ROOT, config.path.app, 'server')
    ]
  },
  output: {
    path: path.join(ROOT, config.path.build),
    publicPath: config.path.assets,
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  externals: [
    nodeModules,
    function(context, request, callback) {
      const external = 'external!';

      return (new RegExp(`^${external}`)).test(request)
        ? callback(null, `commonjs ${path.resolve(context, request.substr(external.length))}`)
        : callback();
    }
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg|ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        loader: `css/locals${config.cssModules}`
      },
      {
        test: /\.less$/,
        loader: `css/locals${config.cssModules}!less`
      },
      {
        test: /\.scss$/,
        loader: `css/locals${config.cssModules}!sass`
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.RUNTIME_ENV': "'server'"
    })
  ]
};
