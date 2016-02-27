import React from 'react';
import { Route } from 'react-router';
import IsomorphicRouter from 'isomorphic-relay-router';
import ViewerQuery from './client/queries/viewer';
import Todos from './client/components/templates/todos';

const history = process.env.RUNTIME_ENV === 'client'
                  ? require('react-router').browserHistory
                  : require('history/lib/createMemoryHistory')();

export default (
  <IsomorphicRouter.Router history={history}>
    <Route path='/' component={Todos} queries={ViewerQuery} />
  </IsomorphicRouter.Router>
);
