import React from 'react';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import { Router, Route, applyRouterMiddleware } from 'react-router';
import ViewerQuery from './client/queries/viewer';
import Todos from 'client/components/todos';
import StaticPage from 'client/components/static-page';

export const getClientHistory = () =>
  require('react-router').browserHistory;

export const getServerHistory = (url) =>
  require('react-router').createMemoryHistory(url);

export const getRoutes = (history) => (
  <Router
    history={history}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  >
    <Route path="/" component={Todos} queries={ViewerQuery} />
    <Route path="/static-page" component={StaticPage} />
  </Router>
);
