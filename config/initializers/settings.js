/* eslint prefer-const: [0] */
import fs from 'fs';
import nunjucks from './nunjucks';

// initialize nunjucks template with predefined filter
nunjucks();

// default settings
let settings = {
  env: {
    NODE_ENV: process.env.NODE_ENV
  },
  assetManifest: global.webpackIsomorphicTools && global.webpackIsomorphicTools.assets() || {
    javascript: {
      app: 'localhost:3000/app.bundle.js'
    },
    styles: {
      app: 'localhost:3000/app.css'
    }
  }
};

// manage public assets in production mode
if (process.env.NODE_ENV === 'production') {
  settings.commonManifest = fs.existsSync('./public/assets/webpack-common-manifest.json')
                              ? require('external!./public/assets/webpack-common-manifest.json')
                              : {};
}

export default settings;
