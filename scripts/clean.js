const path = require("path");
const rimraf = require("rimraf");
const configuration = require("../config");
const { ROOT } = require("../config/path-helper");

const removeDirectory = glob => {
  rimraf(glob, err => {
    if (err) {
      console.error(err); // eslint-disable-line
    } else {
      console.log(`Deleted files/folders: ${glob}`); // eslint-disable-line
    }
  });
};

removeDirectory(path.join(ROOT, configuration.path.build));
removeDirectory(path.join(ROOT, configuration.path.publicAssets));
removeDirectory(path.join(ROOT, configuration.path.publicAssets, "../sw.js"));
removeDirectory(path.join(ROOT, configuration.path.publicAssets, "../sw.js.gz"));
