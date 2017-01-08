require('babel-register');
require('jsdom-global')();

global.nodeRequire = require;

const noop = (module, file) => {
  module._compile('', file);
};

[
  '.css', '.less', '.scss',
  '.gif', '.jpg', '.png', '.svg',
  '.ttf', '.eot', '.woff', '.woff2',
].forEach((extension) => {
  require.extensions[extension] = noop;
});
