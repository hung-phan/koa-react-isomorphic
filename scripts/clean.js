'use strict';

const path = require('path');
const rimraf = require('rimraf');
const configuration = require('../config');
const ROOT = require('../config/path-helper').ROOT;

const removeDirectory = glob => {
  rimraf(glob, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Deleted files/folders: ${glob}`);
    }
  });
};

removeDirectory(path.join(ROOT, configuration.path.build));
removeDirectory(path.join(ROOT, configuration.path.publicAssets));
