import 'babel-polyfill';
import './client/lib/index';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/client/components/main/app';
import getRoutes from 'app/routes';
import configureStore from 'app/client/stores/index';

function render(store, routes, appDOM) {
  ReactDOM.render(<App store={store} routes={routes} />, appDOM);
}

$(document).ready(() => {
  const appDOM = document.getElementById('app');
  const store = configureStore(window.__data);
  const routes = getRoutes(store);

  if (!process.env.SERVER_RENDERING) {
    const { clientFetchData } = require('./client/helpers/fetch-data');
    const location = store.getState().toJS().routing.locationBeforeTransitions;

    clientFetchData(routes, location, store).then(() => {
      render(store, routes, appDOM);
    });
  } else {
    render(store, routes, appDOM);
  }
});
