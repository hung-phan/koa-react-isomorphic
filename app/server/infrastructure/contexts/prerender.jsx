/* @flow */
/* global process */
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../../../share/components/app";

let getRouter = require("../../helpers/getRouter").default;

if (process.env.NODE_ENV === "development" && module.hot) {
  // $FlowFixMe
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

  return getRouter(ctx.req.url).then(({ Api, redirect, status, element }) => {
    if (redirect) {
      return ctx.redirect(redirect.url);
    } else if ([404, 500].includes(status)) {
      return ctx.throw(status);
    }

    const prerenderComponent = renderToString(<App router={element} />);
    const prerenderData = Api.fetcher.toJSON();

    return ctx.render(template, {
      ...parameters,
      prerenderComponent,
      prerenderData
    });
  });
}
