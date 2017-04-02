/* @flow */
/* global process */
import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import App from '../../../client/components/app';
import createStore from '../../../client/createStore';
import { serverFetchData } from '../../../client/helpers/fetchData';

let routesModule = require('../../../routes');

if (process.env.NODE_ENV === 'development' && module.hot) {
  // $FlowFixMe
  module.hot.accept('../../../routes', () => {
    routesModule = require('../../../routes');
  });
}

export default async (ctx: Object, next: Function) => {
  if (process.env.SERVER_RENDERING) {
    ctx.prerender = (template: string, parameters: Object = {}, initialState: Object = {}) => {
      const store = createStore(initialState);
      const history = routesModule.getServerHistory(store, ctx.req.url);
      const routes = routesModule.getRoutes(history, store);

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
                const prerenderData = store.getState();

                // prevent memory leak
                Helmet.rewind();

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
