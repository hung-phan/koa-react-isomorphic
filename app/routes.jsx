import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory, createMemoryHistory, Router, Route } from 'react-router';

export const getClientHistory = (store) =>
  syncHistoryWithStore(browserHistory, store);

export const getServerHistory = (store, url) =>
  syncHistoryWithStore(createMemoryHistory(url), store);

export const getRoutes = (history, options = {}) => (
  <Router history={history} {...options}>
    <Route
      path="/"
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./client/components/todos').default);
        });
      }}
    />
    <Route
      path="/static-page"
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./client/components/static-page').default);
        });
      }}
    />
  </Router>
);
