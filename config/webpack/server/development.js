const _ = require("lodash");
const path = require("path");
const crypto = require("crypto");
const webpack = require("webpack");
const developmentConfig = require("./default");
const { ROOT } = require("../../path-helper");
const config = require("../..");

_.mergeWith(
  developmentConfig,
  {
    mode: "development",
    entry: {
      server: ["webpack/hot/poll?1000"]
    },
    recordsPath: path.join(ROOT, config.path.tmp, "server-records.json"),
    optimization: {
      noEmitOnErrors: true
    }
  },
  (obj1, obj2) => (_.isArray(obj2) ? obj2.concat(obj1) : undefined)
);

developmentConfig.plugins.push(
  new webpack.DefinePlugin({
    "process.env.SECRET_KEY": `"${crypto.randomBytes(8).toString("hex")}"`,
    "process.env.SERVER_RENDERING": process.env.SERVER_RENDERING || false
  }),
  new webpack.HotModuleReplacementPlugin()
);

module.exports = developmentConfig;
