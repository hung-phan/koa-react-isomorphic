'use strict';

import 'babel/polyfill';
import './client/lib/index';

import $              from 'jquery';
import React          from 'react';
import Router         from 'react-router';
import { Provider }   from 'react-redux';
import routes         from './routes';
import configureStore from './client/stores/index';

$(document).ready(function() {
  const store = configureStore(window.__data);

  Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(
      <Provider key='provider' store={store}>
        {() => <Handler />}
      </Provider>,
      document.getElementById('app')
    );
  });
});
