import React from 'react';
import { createRoutes, Route, IndexRoute } from 'react-router';
import ViewerQuery from 'client/queries/viewer';

export default createRoutes(
  <Route path="/">
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./client/components/todos').default);
        });
      }}
      queries={ViewerQuery}
    />
    <Route
      path="static-page"
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./client/components/static-page').default);
        });
      }}
    />
  </Route>
);
