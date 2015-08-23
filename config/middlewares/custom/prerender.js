import nunjucks from 'nunjucks';
import settings from 'config/initializers/settings';

export default function* (next) {
  if (process.env.SERVER_RENDERING) {
    const React          = require('react');
    const Router         = require('react-router');
    const { Provider }   = require('react-redux');
    const routes         = require('app/routes');
    const configureStore = require('app/client/stores/index');

    this.prerender = this.prerender ||
      function(template: string, state: Object = {}, parameters: Object = {}) {
        const store = configureStore(state);
        let prerenderComponent;
        let prerenderData;

        Router.run(routes, this.request.path, (Handler, routerState) => {
          prerenderComponent = React.renderToString(
            <div>
              <Provider key='provider' store={store}>
                {() => <Handler routerState={routerState} />}
              </Provider>
            </div>
          );
          prerenderData = store.getState();
        });

        return nunjucks.render(template, {
            ...parameters, ...settings, prerenderComponent, prerenderData, csrf: this.csrf
        });
      };
  } else {
    this.prerender = this.render;
  }

  yield next;
}
