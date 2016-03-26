import React from 'react';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Todos from 'app/client/components/todos';

export default function getRoutes(store) {
  const history = do {
    let _history;

    if (process.env.RUNTIME_ENV === 'client') {
      _history = require('react-router').browserHistory;
    } else {
      _history = require('react-router').createMemoryHistory();
    }

    // The do syntax will return the result of syncHistoryWithStore
    syncHistoryWithStore(_history, store);
  };

  return (
    <Router history={ history }>
      <Route path='/' component={ Todos } />
    </Router>
  );
}
