import React from 'react';
import { Route } from 'react-router';
import IsomorphicRouter from 'isomorphic-relay-router';
import ViewerQuery from './client/queries/viewer';
import Todos from 'client/components/todos';

export function getClientHistory() {
  return require('react-router').browserHistory;
}

export function getServerHistory(url) {
  return require('react-router').createMemoryHistory(url);
}

export function getRoutes(history) {
  return (
    <IsomorphicRouter.Router history={history}>
      <Route path='/' component={Todos} queries={ViewerQuery} />
    </IsomorphicRouter.Router>
  );
}
