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
): Promise<string | void> {
  if (!process.env.SERVER_RENDERING) {
    return this.render(template, parameters);
  }

  return new Promise((resolve, reject) => {
    const store = createStore(initialState);
    const history = routesModule.getServerHistory(store, this.req.url);
    const routes = routesModule.getRoutes(history, store);

    match({ routes, history }, (error, redirectLocation, renderProps) => {
      if (error) {
        resolve(this.throw(500, error.message));
      } else if (redirectLocation) {
        resolve(this.redirect(redirectLocation.pathname + redirectLocation.search));
      } else if (renderProps) {
        serverFetchData(renderProps, store).then(() => {
          try {
            const currentRoutes = <RouterContext {...renderProps} />;
            const prerenderComponent = renderToString(
              <App store={store} routes={currentRoutes} />
            );
            const prerenderData = store.getState().toJS();

            // prevent memory leak
            Helmet.rewind();

            resolve(
              this
                .render(template, {
                  ...parameters,
                  prerenderComponent,
                  prerenderData
                })
            );
          } catch (e) {
            reject(e);
          }
        });
      } else {
        resolve(this.throw(404));
      }
    });
  });
}
