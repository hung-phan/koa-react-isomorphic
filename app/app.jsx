/* @flow */
/* global process */
import React from "react";
import ReactDOM from "react-dom";
import { match, Router } from "react-router";
import App from "./share/components/app";
import createStore from "./share/createStore";
import { clientFetchData } from "./share/helpers/fetchData";
import { getHistory } from "./routes";
import "./client/loadExternalLibs";

const appDOM = document.getElementById("app");

if (!appDOM) {
  throw new Error("Cannot initialise app");
}

const store = createStore(window.prerenderData);
const history = getHistory(store);
let { getRoutes } = require("./routes");

function initialize() {
  const routes = getRoutes(history, store);

  clientFetchData(history, routes, store);

  if (process.env.SERVER_RENDERING) {
    match({ history, routes }, (error, redirectLocation, renderProps) => {
      // $FlowFixMe
      ReactDOM.hydrate(
        <App store={store} routes={<Router {...renderProps} />} />,
        appDOM
      );
    });
  } else {
    ReactDOM.render(<App store={store} routes={routes} />, appDOM);
  }
}

// $FlowFixMe
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./routes", () => {
    ({ getRoutes } = require("./routes"));
    initialize();
  });
}

initialize();

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
