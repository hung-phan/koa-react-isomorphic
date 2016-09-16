import 'client/libs';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { getRoutes, getClientHistory } from 'app/routes.jsx';
import App from 'client/components/main/app.jsx';
import configureStore from 'client/main-store';
import { clientFetchData } from 'client/helpers/fetch-data';
import { whyDidYouUpdate } from 'why-did-you-update';

function render(store, routes, appDOM) {
  ReactDOM.render(<App store={store} routes={routes} />, appDOM);
}

if (process.env.NODE_ENV === 'development') {
  whyDidYouUpdate(React, {
    exclude: /^(Connect|DockMonitor|onlyUpdateForKeys)/,
  });
}

$(document).ready(() => {
  const appDOM = document.getElementById('app');
  const store = configureStore(window.prerenderData);
  const history = getClientHistory(store);
  const routes = getRoutes(history);

  clientFetchData(history, routes, store);
  render(store, routes, appDOM);
});
