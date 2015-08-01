'use strict';

/**
 * @author Hung Phan
 *           _   _   _
 *          | | | | (_)
 *  ___  ___| |_| |_ _ _ __   __ _ ___
 * / __|/ _ \ __| __| | '_ \ / _` / __|
 * \__ \  __/ |_| |_| | | | | (_| \__ \
 * |___/\___|\__|\__|_|_| |_|\__, |___/
 *                            __/ |
 *                           |___/
 */

import fs from 'fs';

let settings = {
  env: process.env.NODE_ENV
};

// manage public assets in production mode
if (process.env.NODE_ENV === 'production') {
  settings['assetManifest'] = require('external!./public/assets/webpack-asset-manifest.json');
  settings['commonManifest'] = fs.existsSync('./public/assets/webpack-common-manifest.json')
                                 ? require('external!./public/assets/webpack-common-manifest.json')
                                 : {};
}

export default settings;
