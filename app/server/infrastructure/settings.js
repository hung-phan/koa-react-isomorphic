/* @flow */
/* global process */
const { ROOT, PUBLIC } = require("../../../config/path-helper");

// default settings
const settings = {
  path: {
    ROOT,
    PUBLIC,
    TEMPLATES_DIR: "app/server/application/templates"
  },
  env: {
    NODE_ENV: process.env.NODE_ENV
  },
  assetManifest: {}
};

// ignore assets build for test
if (process.env.NODE_ENV === "test") {
  settings.assetManifest = {
    javascript: {},
    styles: {}
  };
} else {
  settings.assetManifest = global.nodeRequire("./public/assets/webpack-chunks.json");
}

export default settings;
