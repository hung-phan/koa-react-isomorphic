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

export default async (ctx: Object, next: Function) => {
  if (process.env.SERVER_RENDERING) {
    ctx.prerender = (template: string, parameters: Object = {}) =>
      new Promise(async (resolve, reject) => {
        const { Api, redirect, status, element } = await getRouter(ctx.req.url);

        if (redirect) {
          ctx.redirect(redirect.url);
        } else if ([404, 500].includes(status)) {
          ctx.throw(status);
        } else {
          const prerenderComponent = renderToString(<App router={element} />);
          const prerenderData = Api.fetcher.toJSON();

          ctx
            .render(template, {
              ...parameters,
              prerenderComponent,
              prerenderData
            })
            .then(resolve)
            .catch(reject);
        }
      });
  } else {
    ctx.prerender = ctx.render;
  }

  await next();
};
