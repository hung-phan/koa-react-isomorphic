import React from 'react';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Todos from 'app/client/components/templates/todos';

export default function getRoutes(store) {
  const history = do {
    let _history;

    if (process.env.RUNTIME_ENV === 'client') {
      _history = require('react-router').browserHistory;
    } else {
      _history = require('react-router').createMemoryHistory();
    }

    syncHistoryWithStore(_history, store);
  };

  return (
    <Router history={ history }>
      <Route path='/' component={ Todos } />
    </Router>
  );
}
