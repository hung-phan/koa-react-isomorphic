import './client/libs';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { getRoutes, getClientHistory } from 'app/routes';
import App from 'client/components/main/app';
import configureStore from 'client/main-store';
import { clientFetchData } from 'client/helpers/fetch-data';

function render(store, routes, appDOM) {
  ReactDOM.render(<App store={store} routes={routes} />, appDOM);
}

if (process.env.NODE_ENV === 'development') {
  const { whyDidYouUpdate } = require('why-did-you-update');

  whyDidYouUpdate(React, {
    exclude: /^(Connect|DockMonitor|shouldUpdate)/,
  });
}

$(document).ready(() => {
  const appDOM = document.getElementById('app');
  const store = configureStore(window.__data);
  const history = getClientHistory(store);
  const routes = getRoutes(history);

  clientFetchData(history, routes, store);
  render(store, routes, appDOM);
});
