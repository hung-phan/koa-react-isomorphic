const path = require('path');
const ROOT = path.join(__dirname);
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  require('./config/webpack/webpack-isomorphic-tools')
);

global.webpackIsomorphicTools
  .development(process.env.NODE_ENV === 'development')
  .server(ROOT, () => {
    require('./build/server');
  });
