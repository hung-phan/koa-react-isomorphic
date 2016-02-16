import React from 'react';
import { Route } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import ViewerQuery from './client/queries/viewer';
import Todos from './client/components/templates/todos';

const history = process.env.RUNTIME_ENV === 'client'
                  ? require('react-router').browserHistory
                  : require('history/lib/createLocation')();

export default (
  <RelayRouter history={history}>
    <Route path='/' component={Todos} queries={ViewerQuery} />
  </RelayRouter>
);
