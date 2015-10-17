if (process.env.SERVER_RENDERING) {
  const nunjucks                 = require('nunjucks');
  const React                    = require('react');
  const { renderToString }       = require('react-dom/server');
  const { match, RoutingContext} = require('react-router');
  const routes                   = require('app/routes');
  const App                      = require('app/client/components/main/app');
  const fetchData                = require('app/client/helpers/fetch-data');
  const settings                 = require('config/initializers/settings');
  const configureStore           = require('app/client/stores/index');

  module.exports = function* (next) {
    this.prerender = this.prerender ||
      function(template: string, initialState: Object = {}, parameters: Object = {}) {
        const store = configureStore(initialState);

        return new Promise((resolve, reject) => {
          match({ routes, location: this.req.url }, (error, redirectLocation, renderProps) => {
            const currentRoutes = <RoutingContext { ...renderProps } />;
            const prerenderComponent = renderToString(<App store={store} routes={currentRoutes} />);
            const prerenderData = store.getState();

            resolve(
              nunjucks.render(template, {
                ...parameters, ...settings, prerenderComponent, prerenderData, csrf: this.csrf
              })
            );
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
