'use strict';

import 'babel/polyfill';
import './client/lib/index';

import $                                    from 'jquery';
import React                                from 'react';
import Router                               from 'react-router';
import { Provider }                         from 'react-redux';
import routes                               from './routes';
import configureStore                       from './client/stores/index';

$(document).ready(function() {
  const store = configureStore(window.__data);

  Router.run(routes, Router.HistoryLocation, function(Handler, routerState) {
    React.render(
      <div>
        <Provider key='provider' store={store}>
          {() => <Handler routerState={routerState} />}
        </Provider>

        {process.env.NODE_ENV === 'development' && (function() {
          const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');

          return (
            <DebugPanel top right bottom>
              <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
          );
        })()}
      </div>,
      document.getElementById('app')
    );
  });
});
