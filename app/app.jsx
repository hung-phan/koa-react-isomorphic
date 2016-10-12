import 'client/libs';

import renderComponents from './client/helpers/inject-data-utils';
import routes from './routes';

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

const appDOM = document.getElementById('app');

renderComponents(routes, appDOM);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;

    renderComponents(newRoutes, appDOM);
  });
}
