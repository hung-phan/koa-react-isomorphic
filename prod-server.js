const path = require('path');
const ROOT = path.join(__dirname);
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

global.webpackIsomorphicTools
  .development(process.env.NODE_ENV === 'development')
  .server(ROOT, () => {
    if (process.env.NODE_ENV === 'development') {
      hotReloadTemplate('./app/server/templates/**/*.marko');
    }

    if (process.env.NODE_DEBUGGER) {
      require('babel-core/register');
      require('./app/server');
    } else {
      require('./build/server');
    }
  });
