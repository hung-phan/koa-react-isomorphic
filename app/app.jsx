import 'client/libs';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { whyDidYouUpdate } from 'why-did-you-update';
import App from './client/components/main/app';
import configureStore from './client/main-store';
import { clientFetchData } from './client/helpers/fetch-data';
import { getRoutes, getClientHistory } from './routes';

function render(store, routes, appDOM) {
  ReactDOM.render(<App store={store} routes={routes} />, appDOM);
}

if (process.env.NODE_ENV === 'development') {
  whyDidYouUpdate(React, {
    exclude: /^(Connect|DockMonitor|onlyUpdateForKeys)/,
  });
}

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}


$(document).ready(() => {
  const appDOM = document.getElementById('app');
  const store = configureStore(window.prerenderData);
  const history = getClientHistory(store);
  const routes = getRoutes(history);

  clientFetchData(history, routes, store);
  render(store, routes, appDOM);
});
