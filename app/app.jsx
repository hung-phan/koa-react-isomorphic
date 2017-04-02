/* @flow */
/* global process */
import React from 'react';
import ReactDOM from 'react-dom';
import { match, Router } from 'react-router';
import App from './client/components/app';
import createStore from './client/createStore';
import { clientFetchData } from './client/helpers/fetchData';
import { getClientHistory } from './routes';
import './client/helpers/loadExternalLibs';

const appDOM = document.getElementById('app');
const store = createStore(window.prerenderData);
const history = getClientHistory(store);
let getRoutes = require('./routes').getRoutes;

function initialize() {
  const routes = getRoutes(history, store);

  clientFetchData(history, routes, store);

  if (process.env.SERVER_RENDERING) {
    match({ history, routes }, (error, redirectLocation, renderProps) => {
      ReactDOM.render(<App store={store} routes={<Router {...renderProps} />} />, appDOM);
    });
  } else {
    ReactDOM.render(<App store={store} routes={routes} />, appDOM);
  }
}

initialize();

if (process.env.NODE_ENV === 'development' && module.hot) {
  // $FlowFixMe
  module.hot.accept('./routes', () => {
    getRoutes = require('./routes').getRoutes;
    initialize();
  });
}

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}
