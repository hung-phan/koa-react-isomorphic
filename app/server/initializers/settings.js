const { ROOT, PUBLIC } = global.nodeRequire('./config/path-helper');

// default settings
const settings = {
  path: {
    ROOT,
    PUBLIC,
    TEMPLATES_DIR: 'app/server/templates',
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
  assetManifest: (global.webpackIsomorphicTools && global.webpackIsomorphicTools.assets()) || {},
};

// ignore assets build for test
if (process.env.NODE_ENV === 'test') {
  settings.assetManifest = {
    javascript: {
      app: `localhost:${process.env.PORT}/app.bundle.js`,
    },
    styles: {
      app: `localhost:${process.env.PORT}/app.css`,
    },
  };
}

export default settings;
