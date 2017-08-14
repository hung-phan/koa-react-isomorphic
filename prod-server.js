const path = require("path");
const ROOT = require("./config/path-helper").ROOT;
const WebpackIsomorphicTools = require("webpack-isomorphic-tools");

require("source-map-support").install({ environment: "node" });

global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  require("./config/webpack/webpack-isomorphic-tools")
);

// to get the node require instead of dynamic require by webpack
global.nodeRequire = require;

global.webpackIsomorphicTools
  .server(ROOT, () => {
    if (process.env.NODE_DEBUGGER) {
      // Define require.ensure and require.include
      const proto = Object.getPrototypeOf(require);

      // eslint-disable-next-line no-prototype-builtins
      if (!proto.hasOwnProperty("ensure")) {
        Object.defineProperties(proto, {
          "ensure": {
            value: function ensure(modules, callback) {
              callback(this);
            },
            writable: false
          },
          "include": {
            value: function include() {
            },
            writable: false
          }
        });
      }

      require("babel-core/register");
      require("./app/server");
    } else {
      require("./build/server");
    }

    if (process.env.NODE_ENV === "development") {
      require("marko/hot-reload").enable();
      require("chokidar")
        .watch("./app/server/application/templates/**/*.marko")
        .on("change", filename => {
          require("marko/hot-reload").handleFileModified(path.join(ROOT, filename));
        });
    }
  });
