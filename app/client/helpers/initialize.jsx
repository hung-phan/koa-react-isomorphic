/* @flow */
import React from "react";
import ReactDOM from "react-dom";
import createApi from "../../shared/helpers/createApi";
import createRouter from "./createRouter";
import App from "../components/app";

export const Api = createApi();

const renderComponent = (router: Object, domNode: Object) => {
  ReactDOM.render(<App router={router} />, domNode);
};

export default async (domNode: Object) => {
  renderComponent(await createRouter(Api), domNode);

  if (process.env.NODE_ENV === "development" && module.hot) {
    // $FlowFixMe
    module.hot.accept("./createRouter", async () => {
      renderComponent(await require("./createRouter").default(Api), domNode);
    });
  }
};
