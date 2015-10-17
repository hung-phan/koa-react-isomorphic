import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Todos from './client/components/templates/todos';

export default (
  <Router history={createBrowserHistory()}>
    <Route path='/' component={Todos} />
  </Router>
);
