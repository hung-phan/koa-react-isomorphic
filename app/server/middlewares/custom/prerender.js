export default async (ctx, next) => {
  if (process.env.SERVER_RENDERING) {
    const React = require('react');
    const { renderToString } = require('react-dom/server');
    const { match, RouterContext } = require('react-router');
    const { getRoutes, getServerHistory } = require('app/routes');
    const App = require('client/components/main/app').default;
    const { serverFetchData } = require('client/helpers/fetch-data');
    const configureStore = require('client/main-store').default;

    ctx.prerender = ctx.prerender ||
      function (template: string, parameters: Object = {}, initialState: Object = {}) {
        const store = configureStore(initialState);
        const routes = getRoutes(getServerHistory(store, ctx.req.url));

        return new Promise((resolve, reject) => {
          match({ routes, location: ctx.req.url }, (error, redirectLocation, renderProps) => {
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

                  ctx.render(template, {
                    ...parameters,
                    prerenderComponent,
                    prerenderData,
                  })
                  .then(resolve)
                  .catch(reject);
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
