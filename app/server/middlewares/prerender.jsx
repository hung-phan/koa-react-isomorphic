// @flow
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { serverFetchData } from 'client/helpers/fetch-data';
import configureStore from 'client/main-store';
import App from 'client/components/main/app.jsx';

const routesModule = require('app/routes.jsx');

const getServerHistory = routesModule.getServerHistory;
let getRoutes = routesModule.getRoutes;

if (process.env.NODE_ENV === 'development' && module.hot) {
  // $FlowFixMe
  module.hot.accept('./../../routes.jsx', () => {
    getRoutes = require('./../../routes.jsx').getRoutes;
  });
}

export default async (ctx: Object, next: Function) => {
  if (process.env.SERVER_RENDERING) {
    ctx.prerender = (template: string, parameters: Object = {}, initialState: Object = {}) => {
      const store = configureStore(initialState);
      const history = getServerHistory(store, ctx.req.url);
      const routes = getRoutes(history);

      return new Promise((resolve, reject) => {
        match({ routes, history }, (error, redirectLocation, renderProps) => {
          if (error) {
            ctx.throw(500, error.message);
          } else if (redirectLocation) {
            ctx.redirect(redirectLocation.pathname + redirectLocation.search);
          } else if (renderProps) {
            serverFetchData(renderProps, store)
              .then(() => {
                const currentRoutes = <RouterContext {...renderProps} />;
                const prerenderComponent = renderToString(
                  <App store={store} routes={currentRoutes} />
                );
                const prerenderData = store.getState().toJS();

                ctx.render(template, {
                  ...parameters,
                  prerenderComponent,
                  prerenderData,
                }).then(resolve).catch(reject);
              });
          } else {
            ctx.throw(404);
          }
        });
      });
    };
    await next();
  } else {
    ctx.prerender = ctx.render;
    await next();
  }
};
