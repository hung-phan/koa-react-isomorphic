import React from 'react';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import { Router, Route, applyRouterMiddleware } from 'react-router';
import ViewerQuery from 'client/queries/viewer';
import Todos from 'client/components/todos/index.jsx';
import StaticPage from 'client/components/static-page/index.jsx';

export const getClientHistory = () =>
  require('react-router').browserHistory;

export const getServerHistory = (url) =>
  require('react-router').createMemoryHistory(url);

// workaround problem with webpack 2
export const getRenderer = () =>
  applyRouterMiddleware(
    process.env.RUNTIME_ENV === 'client' && process.env.NODE_ENV === 'development'
      ? useRelay.default
      : useRelay
  );

export const getRoutes = (history) => (
  <Router
    history={history}
    render={getRenderer()}
    environment={Relay.Store}
  >
    <Route path="/" component={Todos} queries={ViewerQuery} />
    <Route path="/static-page" component={StaticPage} />
  </Router>
);
