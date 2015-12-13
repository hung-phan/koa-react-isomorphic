var path = require('path');
var ROOT = path.join(__dirname);
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  require('config/webpack/webpack-isomorphic-tools')
);

webpackIsomorphicTools
  .development(process.env.NODE_ENV === 'development')
  .server(ROOT, function() {
    require('./build/server');
  });
