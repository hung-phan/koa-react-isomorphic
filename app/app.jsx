import 'client/libs';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/components/main/app';
import configureStore from './client/main-store';
import { clientFetchData } from './client/helpers/fetch-data';
import { getRoutes, getClientHistory } from './routes';

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

const appDOM = document.getElementById('app');
const store = configureStore(window.prerenderData);
const history = getClientHistory(store);
const routes = getRoutes(history);
const render = (_store, _routes, _appDOM) => {
  ReactDOM.render(<App store={_store} routes={_routes} />, _appDOM);
};

clientFetchData(history, routes, store);
render(store, routes, appDOM);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./routes', () => {
    const { getRoutes: newGetRoutes } = require('./routes');

    render(store, newGetRoutes(history), appDOM);
  });
}
