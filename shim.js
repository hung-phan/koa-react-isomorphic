global.nodeRequire = require;
global.requestAnimationFrame = cb => {
  setTimeout(cb, 0);
};
