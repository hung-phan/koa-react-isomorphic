import React from 'react';
import { Router, Route } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';
import Todos from './client/components/templates/todos';

const history = process.env.RUNTIME_ENV === 'client'
                  ? require('react-router').browserHistory
                  : require('history/lib/createLocation')();

function render(props) {
  return <ReduxAsyncConnect { ...props } />;
}

export default (
  <Router history={ history } render={ render }>
    <Route path='/' component={ Todos } />
  </Router>
);
