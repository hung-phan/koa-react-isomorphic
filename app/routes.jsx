import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory, createMemoryHistory, Router, Route } from 'react-router';
import { selectors } from './client/components/routing/logic-bundle';

export const getClientHistory = (store) =>
  syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectors.selectLocationState
  });

export const getServerHistory = (store, url) =>
  syncHistoryWithStore(createMemoryHistory(url), store, {
    selectLocationState: selectors.selectLocationState
  });

export const getRoutes = (history, options = {}) => (
  <Router history={history} {...options}>
    <Route
      path="/"
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./client/components/todos').default);
        }, 'todos-page');
      }}
    />
    <Route
      path="/static-page"
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./client/components/static-page').default);
        }, 'static-page');
      }}
    />
  </Router>
);
