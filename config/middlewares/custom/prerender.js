if (process.env.SERVER_RENDERING) {
  const nunjucks       = require('nunjucks');
  const React          = require('react');
  const Router         = require('react-router');
  const routes         = require('app/routes');
  const app            = require('app/client/components/main/app');
  const fetchData      = require('app/client/helpers/fetch-data');
  const settings       = require('config/initializers/settings');
  const configureStore = require('app/client/stores/index');

  module.exports = function* (next) {
    this.prerender = this.prerender ||
      function(template: string, initialState: Object = {}, parameters: Object = {}) {
        const store = configureStore(initialState);

        return new Promise((resolve, reject) => {
          Router.run(routes, this.request.path, (Handler, routerState) => {
            fetchData(store, routerState)
              .then(([data]) => {
                const prerenderComponent = React.renderToString(app(store, Handler, routerState));
                const prerenderData = store.getState();

                resolve(
                  nunjucks.render(template, {
                    ...parameters, ...settings, prerenderComponent, prerenderData, csrf: this.csrf
                  })
                );
              })
              .catch(error => {
                reject(error);
              });
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
