import 'babel/polyfill';
import './client/lib/index';

import $ from 'jquery';
import React from 'react';
import Router from 'react-router';
import app from 'app/client/components/main/app';
import routes from './routes';
import configureStore from './client/stores/index';

$(document).ready(() => {
  const appDOM = document.getElementById('app');
  const store = configureStore(window.__data);

  if (process.env.NODE_ENV === 'development') {
    const fetchData = require('./client/helpers/fetch-data');
    let areFetchedData = false;

    Router.run(routes, Router.HistoryLocation, (Handler, routerState) => {
      if (!areFetchedData) {
        fetchData(store, routerState);
        areFetchedData = true;
      }
      React.render(app(store, Handler, routerState), appDOM);
    });
  } else {
    Router.run(routes, Router.HistoryLocation, (Handler, routerState) => {
      React.render(app(store, Handler, routerState), appDOM);
    });
  }
});
