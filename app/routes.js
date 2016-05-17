import React from 'react';
import { Store } from 'react-relay';
import useRelay from 'react-router-relay';
import { Router, Route, applyRouterMiddleware } from 'react-router';
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
    <Router
      history={history}
      render={applyRouterMiddleware(useRelay)}
      environment={Store}
    >
      <Route path="/" component={Todos} queries={ViewerQuery} />
    </Router>
  );
}
