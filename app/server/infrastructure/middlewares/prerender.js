/* @flow */
/* global process */
import Helmet from "react-helmet";
import { match } from "react-router";
import { renderToString } from "react-dom/server";

let routes = require("../../../routes").default;

if (process.env.NODE_ENV === "development" && module.hot) {
  // $FlowFixMe
  module.hot.accept("../../../routes", () => {
    routes = require("../../../routes").default;
  });
}

export default async (ctx: Object, next: Function) => {
  if (process.env.SERVER_RENDERING) {
    ctx.prerender = (template: string, parameters: Object = {}) =>
      new Promise((resolve, reject) => {
        match(
          { routes, location: ctx.req.url },
          (error, redirectLocation, renderProps) => {
            if (error) {
              ctx.throw(500, error.message);
            } else if (redirectLocation) {
              ctx.redirect(redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
              serverFetchData(renderProps, store).then(() => {
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
              });
            } else {
              ctx.throw(404);
            }
          }
        );
      });
    await next();
  } else {
    ctx.prerender = ctx.render;
    await next();
  }
};
