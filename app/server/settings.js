'use strict';

import fs from 'fs';

let settings = {
  env: process.env.NODE_ENV
};

if (process.env.NODE_ENV === 'production') {
  settings['assetManifest']  = require('external!./public/assets/webpack-asset-manifest.json');
  settings['commonManifest'] = fs.existsSync('./public/assets/webpack-common-manifest.json')
                                 ? require('external!./public/assets/webpack-common-manifest.json')
                                 : {};
}

export default settings;
