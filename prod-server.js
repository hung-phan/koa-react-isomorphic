const path = require('path');
const ROOT = require('./config/path-helper').ROOT;
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

function hotReloadTemplate(templatesDir) {
  require('marko/hot-reload').enable();
  require('chokidar')
    .watch(templatesDir)
    .on('change', filename => {
      require('marko/hot-reload').handleFileModified(path.join(ROOT, filename));
    });
}

global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  require('./config/webpack/webpack-isomorphic-tools')
);

// to get the node require instead of dynamic require by webpack
global.nodeRequire = require;

global.webpackIsomorphicTools
  .server(ROOT, () => {
    if (process.env.NODE_DEBUGGER) {
      require('babel-core/register');
      require('./app/server');
    } else {
      require('./build/server');
    }

    if (process.env.NODE_ENV === 'development') {
      hotReloadTemplate('./app/server/application/templates/**/*.marko');
    }
  });
