import React from 'react';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Todos from 'client/components/todos';

function getHistory(store) {
  let history;

  if (process.env.RUNTIME_ENV === 'client') {
    history = require('react-router').browserHistory;
  } else {
    history = require('react-router').createMemoryHistory();
  }

  return syncHistoryWithStore(history, store);
}
export default function (store) {
  return (
    <Router history={ getHistory(store) }>
      <Route path='/' component={ Todos } />
    </Router>
  );
}
