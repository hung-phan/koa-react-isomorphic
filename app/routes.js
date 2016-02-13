import React from 'react';
import { Router, Route } from 'react-router';
import Todos from './client/components/templates/todos';

const history = process.env.RUNTIME_ENV === 'client'
                  ? require('react-router').browserHistory
                  : require('history/lib/createLocation')();

export default (
  <Router history={ history }>
    <Route path='/' component={ Todos } />
  </Router>
);
