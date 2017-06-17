/* @flow */
/* global process */
import "./client/helpers/loadExternalLibs";
import renderComponents from "./client/helpers/fetchData";
import routes from "./routes";

const appDOM = document.getElementById("app");

if (!appDOM) {
  throw new Error("Cannot initialise application");
}

renderComponents(routes, appDOM);

if (process.env.NODE_ENV === "development" && module.hot) {
  // $FlowFixMe
  module.hot.accept("./routes", () => {
    const newRoutes = require("./routes").default;

    renderComponents(newRoutes, appDOM);
  });
}

if (process.env.NODE_ENV === "production") {
  const runtime = require("offline-plugin/runtime");

  runtime.install({
    onUpdating: () => {
      console.log("SW Event:", "onUpdating"); // eslint-disable-line
    },
    onUpdateReady: () => {
      console.log("SW Event:", "onUpdateReady"); // eslint-disable-line
      // Tells to new SW to take control immediately
      runtime.applyUpdate();
    },
    onUpdated: () => {
      console.log("SW Event:", "onUpdated"); // eslint-disable-line
      // Reload the webpage to load into the new version
      window.location.reload();
    },

    onUpdateFailed: () => {
      console.log("SW Event:", "onUpdateFailed"); // eslint-disable-line
    }
  });
}
