/* @flow */
/* global process */
import React from "react";
import Helmet from "react-helmet";
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";
import App from "../../../share/components/app/index";
import createStore from "../../../share/createStore";
import { serverFetchData } from "../../../share/helpers/fetchData";

let routesModule = require("../../../routes");

if (process.env.NODE_ENV === "development" && module.hot) {
  // $FlowFixMe
  module.hot.accept("../../../routes", () => {
    routesModule = require("../../../routes");
  });
}

export default function(
  template: string,
  parameters: Object = {},
  initialState: Object = {}
) {
  const ctx = this;

  if (!process.env.SERVER_RENDERING) {
    return ctx.render.call(ctx, template, parameters, initialState);
  }

  return new Promise((resolve, reject) => {
    const store = createStore(initialState);
    const history = routesModule.getServerHistory(store, ctx.req.url);
    const routes = routesModule.getRoutes(history, store);

    match({ routes, history }, (error, redirectLocation, renderProps) => {
      if (error) {
        ctx.throw(500, error.message);
      } else if (redirectLocation) {
        ctx.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        serverFetchData(renderProps, store).then(() => {
          try {
            const currentRoutes = <RouterContext {...renderProps} />;
            const prerenderComponent = renderToString(
              <App store={store} routes={currentRoutes} />
            );
            const prerenderData = store.getState();

            // prevent memory leak
            Helmet.rewind();

            ctx
              .render(template, {
                ...parameters,
                prerenderComponent,
                prerenderData
              })
              .then(resolve)
              .catch(reject);
          } catch (e) {
            reject(e);
          }
        });
      } else {
        ctx.throw(404);
      }
    });
  });
}
