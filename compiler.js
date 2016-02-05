'use strict';

require('babel-core/register');
require('babel-polyfill');
require('jsdom-global')();

const noop = (module, file) => {
  module._compile('', file);
};

[
  '.css', '.less', '.scss',
  '.gif', '.jpg', '.png', '.svg',
  '.ttf', '.eot', '.woff', '.woff2'
].forEach((extension) => {
  require.extensions[extension] = noop;
});
