import React from 'react';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import { browserHistory, createMemoryHistory, Router, Route, applyRouterMiddleware } from 'react-router';

import ViewerQuery from 'client/queries/viewer';
import Todos from 'client/components/todos/index.jsx';
import StaticPage from 'client/components/static-page/index.jsx';

export const getClientHistory = () =>
  browserHistory;

export const getServerHistory = (url) =>
  createMemoryHistory(url);

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
