import fs from 'fs';
import path from 'path';
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
  assetManifest: global.webpackIsomorphicTools && global.webpackIsomorphicTools.assets() || {},
};

// manage public assets in production mode
if (process.env.NODE_ENV === 'production') {
  settings.commonManifest = fs.existsSync(path.join(settings.path.PUBLIC, 'assets/webpack-common-manifest.json'))
                              ? global.nodeRequire(`${path.join(settings.path.PUBLIC, 'assets/webpack-common-manifest.json')}`)
                              : {};
} else if (process.env.NODE_ENV === 'test') {
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
