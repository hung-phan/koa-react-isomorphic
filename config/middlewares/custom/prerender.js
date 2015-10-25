if (process.env.SERVER_RENDERING) {
  const nunjucks = require('nunjucks');
  const React = require('react');
  const { renderToString } = require('react-dom/server');
  const { match, RoutingContext} = require('react-router');
  const fetchData = require('app/client/helpers/fetch-data');
  const routes = require('app/routes');
  const App = require('app/client/components/main/app');
  const settings = require('config/initializers/settings');
  const configureStore = require('app/client/stores/index');

  module.exports = function* (next) {
    this.prerender = this.prerender ||
      function(template: string, initialState: Object = {}, parameters: Object = {}) {
        const store = configureStore(initialState);

        return new Promise((resolve, reject) => {
          match({ routes, location: this.req.url }, (error, redirectLocation, renderProps) => {
            if (error) {
              this.throw(500, error.message);
            } else if (redirectLocation) {
              this.redirect(redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
              fetchData(store, store.getState().router)
                .then(() => {
                  const prerenderData = store.getState();
                  const currentRoutes = <RoutingContext { ...renderProps } />;
                  const prerenderComponent = renderToString(<App store={store} routes={currentRoutes} />);

                  resolve(
                    nunjucks.render(template, {
                      ...settings,
                      ...parameters,
                      prerenderComponent,
                      prerenderData,
                      csrf: this.csrf
                    })
                  );
                });
            } else {
              this.throw(404);
            }
          });
        });
      };
    yield next;
  }
} else {
  module.exports = function* (next) {
    this.prerender = this.render;
    yield next;
  }
}
