'use strict';

var _             = require('lodash');
var webpack       = require('webpack');
var defaultConfig = require('./default');

module.exports = _.merge(defaultConfig, {
  devtool: false,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['GeneratorFunction', 'GeneratorFunctionPrototype']
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.NO_SERVER_RENDERING': false
    })
  ]
}, function(obj1, obj2) {
  return _.isArray(obj2) ? obj2.concat(obj1) : undefined;
});
