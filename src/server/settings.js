'use strict';

export default function() {
  let settings = { env: process.env.NODE_ENV };

  if (process.env.NODE_ENV === 'production') {
    let productionEnv = {
      assetManifest:  require('external!./../../dist/webpack-asset-manifest.json'),
      commonManifest: require('external!./../../dist/webpack-common-manifest.json')
    };
    settings = {
      ...productionEnv
    };
  } else {
    let developementEnv = {};

    settings = {
      ...developementEnv
    };
  }

  return settings;
}
