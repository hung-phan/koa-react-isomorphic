/* @flow */
/* global process */
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../../../share/components/app";

let getRouter = require("../../helpers/getRouter").default;

// $FlowFixMe
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("../../helpers/getRouter", () => {
    getRouter = require("../../helpers/getRouter").default;
  });
}

export default function(
  template: string,
  parameters: Object = {}
): Promise<string | void> {
  if (!process.env.SERVER_RENDERING) {
    return this.render(template, parameters);
  }

  return getRouter(this.req.url).then(({ Api, redirect, status, element }) => {
    if (redirect) {
      return this.redirect(redirect.url);
    } else if ([404, 500].includes(status)) {
      return this.throw(status);
    }

    const prerenderComponent = renderToString(<App router={element} />);
    const prerenderData = Api.fetcher.toJSON();

    return this.render(template, {
      ...parameters,
      prerenderComponent,
      prerenderData
    });
  });
}
