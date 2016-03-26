/* eslint prefer-const: [0] */
import fs from 'fs';
import nunjucks from 'nunjucks';

nunjucks
  .configure('app/server/templates', { autoescape: true })
  .addFilter('json', JSON.stringify);

// default settings
const settings = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
  assetManifest: global.webpackIsomorphicTools && global.webpackIsomorphicTools.assets(),
};

// manage public assets in production mode
if (process.env.NODE_ENV === 'production') {
  settings.commonManifest = fs.existsSync('./public/assets/webpack-common-manifest.json')
                              ? require('external!./public/assets/webpack-common-manifest.json')
                              : {};
}

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
