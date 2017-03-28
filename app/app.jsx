/* @flow */
/* global process */
import './client/helpers/loadExternalLibs';
import renderComponents from './client/helpers/fetchData';
import routes from './routes';

const appDOM = document.getElementById('app');

renderComponents(routes, appDOM);

if (process.env.NODE_ENV === 'development' && module.hot) {
  // $FlowFixMe
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;

    renderComponents(newRoutes, appDOM);
  });
}

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}
