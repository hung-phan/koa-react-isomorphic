'use strict';

let settings = { env: process.env.NODE_ENV };

if (process.env.NODE_ENV === 'production') {
  settings['assetManifest']  = require('external!./public/assets/webpack-asset-manifest.json');
  settings['commonManifest'] = require('external!./public/assets/webpack-common-manifest.json');
}

export default settings;
