import React from 'react';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Todos from 'client/components/todos';
import StaticPage from 'client/components/static-page';

const selectLocationState = (state) => state.get('routing').toJS();

export const getClientHistory = (store) =>
  syncHistoryWithStore(
    require('react-router').browserHistory,
    store, { selectLocationState }
  );

export const getServerHistory = (store, url) =>
  syncHistoryWithStore(
    require('react-router').createMemoryHistory(url),
    store, { selectLocationState }
  );

export const getRoutes = (history) => (
  <Router history={history}>
    <Route path="/" component={Todos} />
    <Route path="/static-page" component={StaticPage} />
  </Router>
);
