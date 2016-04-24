import fs from 'fs';

// default settings
const settings = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
  assetManifest: global.webpackIsomorphicTools && global.webpackIsomorphicTools.assets() || {},
  templatesDir: './app/server/templates',
};

// manage public assets in production mode
if (process.env.NODE_ENV === 'production') {
  settings.commonManifest = fs.existsSync('./public/assets/webpack-common-manifest.json')
                              ? require('external!./public/assets/webpack-common-manifest.json')
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
