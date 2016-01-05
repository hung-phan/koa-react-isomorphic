'use strict';

require('babel-core/register');
require('babel-polyfill');

// jsdom for testing
if (typeof document === 'undefined') {
  const jsdom = require('jsdom').jsdom;
  global.document = jsdom('<html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = window.navigator;
}

var noop = function(module, file) {
  module._compile('', file);
};

[
  '.css', '.less', '.scss',
  '.gif', '.jpg', '.png', '.svg',
  '.ttf', '.eot', '.woff', '.woff2'
].forEach(function(extension) {
  require.extensions[extension] = noop;
});
