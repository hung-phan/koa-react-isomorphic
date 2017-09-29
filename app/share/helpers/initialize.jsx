/* @flow */
import React from "react";
import ReactDOM from "react-dom";
import App from "../components/app";
import createRouter from "./createRouter";

const renderComponent = (router: Object, domNode: Object) => {
  if (process.env.SERVER_RENDERING) {
    ReactDOM.hydrate(<App router={router} />, domNode);
  } else {
    ReactDOM.render(<App router={router} />, domNode);
  }
};

export default async (_domNode: ?Object) => {
  if (!_domNode) {
    throw new Error("Cannot initialise application");
  }

  const domNode = _domNode;

  renderComponent(await createRouter(), domNode);

  if (process.env.NODE_ENV === "development" && module.hot) {
    // $FlowFixMe
    module.hot.accept("./createRouter", async () => {
      renderComponent(await require("./createRouter").default(), domNode);
    });
  }
};
