import nunjucks from 'nunjucks';
import settings from 'config/initializers/settings';

export default function* (next) {
  if (process.env.SERVER_RENDERING) {
    const React          = require('react');
    const Router         = require('react-router');
    const app            = require('app/client/components/main/app');
    const fetchData      = require('app/client/helpers/fetch-data');
    const routes         = require('app/routes');
    const configureStore = require('app/client/stores/index');

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
  } else {
    this.prerender = this.render;
  }

  yield next;
}
