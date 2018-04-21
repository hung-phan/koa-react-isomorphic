const path = require("path");
const { ROOT } = require("./config/path-helper");
const startServer = require("universal-webpack/server");

// expose node require function
global.nodeRequire = require;

// enable source-map support
require("source-map-support").install({ environment: "node" });

// enable hot-reload for template on development
if (process.env.NODE_ENV === "development") {
  require("marko/hot-reload").enable();
  require("chokidar")
    .watch("./app/server/application/templates/**/*.marko")
    .on("change", filename => {
      require("marko/hot-reload").handleFileModified(path.join(ROOT, filename));
    });
}

startServer(
  require("./config/webpack/default-config"),
  require("./config/webpack/universal-webpack-settings")
);

// if (process.env.NODE_DEBUGGER) {
//   // Define require.ensure and require.include
//   const proto = Object.getPrototypeOf(require);
//
//   // eslint-disable-next-line no-prototype-builtins
//   if (!proto.hasOwnProperty("ensure")) {
//     Object.defineProperties(proto, {
//       "ensure": {
//         value: function ensure(modules, callback) {
//           callback(this);
//         },
//         writable: false
//       },
//       "include": {
//         value: function include() {
//         },
//         writable: false
//       }
//     });
//   }
//
//   require("babel-core/register");
//   require("./app/server");
// } else {
//   require("./build/server");
// }
