/* @flow */
/* global process */
const { ROOT, PUBLIC } = global.nodeRequire('./config/path-helper');

// default settings
const settings = {
  path: {
    ROOT,
    PUBLIC,
    TEMPLATES_DIR: 'app/server/application/templates',
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
  assetManifest: (global.webpackIsomorphicTools && global.webpackIsomorphicTools.assets()) || {},
};

// ignore assets build for test
if (process.env.NODE_ENV === 'test') {
  settings.assetManifest = {
    javascript: {},
    styles: {},
  };
}

export default settings;
