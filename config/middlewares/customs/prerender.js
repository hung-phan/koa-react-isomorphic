'use strict';

import nunjucks       from 'nunjucks';
import settings       from 'config/initializers/settings';
import configureStore from 'app/client/stores/index';

export default function* (next) {
  if (process.env.SERVER_RENDERING) {
    const React        = require('react');
    const Router       = require('react-router');
    const { Provider } = require('react-redux');
    const routes       = require('app/routes');

    this.prerender = this.prerender ||
      function(template: string, store = configureStore(), parameters: Object = {}) {
        let prerenderComponent;
        let prerenderData;

        Router.run(routes, this.request.path, (Handler) => {
          prerenderComponent = React.renderToString(
            <Provider key='provider' store={store}>
              {() => <Handler />}
            </Provider>
          );
          prerenderData = store.getState();
        });

        return nunjucks.render(template, {
            ...parameters, ...settings, prerenderComponent, prerenderData, csrf: this.csrf
        });
      };
  } else {
    this.prerender = this.prerender || this.render;
  }

  yield next;
}
