'use strict';

require('babel/register');

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
