import React from 'react';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Todos from 'client/components/todos';

export function getClientHistory(store) {
  return syncHistoryWithStore(
    require('react-router').browserHistory,
    store
  );
}

export function getServerHistory(store, url) {
  return syncHistoryWithStore(
    require('react-router').createMemoryHistory(url),
    store
  );
}

export function getRoutes(history) {
  return (
    <Router history={ history }>
      <Route path='/' component={ Todos } />
    </Router>
  );
}
