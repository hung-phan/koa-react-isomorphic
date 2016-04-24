if (process.env.SERVER_RENDERING) {
  const React = require('react');
  const { renderToString } = require('react-dom/server');
  const { match, RouterContext } = require('react-router');
  const { getRoutes, getServerHistory } = require('app/routes');
  const settings = require('server/initializers/settings').default;
  const App = require('client/components/main/app').default;
  const { serverFetchData } = require('client/helpers/fetch-data');
  const configureStore = require('client/main-store').default;

  module.exports = function* (next) {
    this.prerender = this.prerender ||
      function (template: string, parameters: Object = {}, initialState: Object = {}) {
        const store = configureStore(initialState);
        const routes = getRoutes(getServerHistory(store, this.req.url));

        return new Promise((resolve, reject) => {
          match({ routes, location: this.req.url }, (error, redirectLocation, renderProps) => {
            if (error) {
              this.throw(500, error.message);
            } else if (redirectLocation) {
              this.redirect(redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
              serverFetchData(renderProps, store)
                .then(() => {
                  const currentRoutes = <RouterContext { ...renderProps } />;
                  const prerenderComponent = renderToString(
                    <App store={store} routes={currentRoutes} />
                  );
                  const prerenderData = store.getState();

                  this.render(template, {
                    ...settings,
                    ...parameters,
                    prerenderComponent,
                    prerenderData,
                    csrf: this.csrf,
                  })
                  .then(resolve)
                  .catch(reject);
                });
            } else {
              this.throw(404);
            }
          });
        });
      };
    yield next;
  };
} else {
  module.exports = function* (next) {
    this.prerender = this.render;
    yield next;
  };
}
