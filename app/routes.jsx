import React from 'react';
import { createRoutes, Route, IndexRoute } from 'react-router';
import ViewerQuery from 'client/queries/viewer';
import Todos from './client/components/todos';
import StaticPage from './client/components/static-page';

export default createRoutes(
  <Route path="/">
    <IndexRoute component={Todos} queries={ViewerQuery} />
    <Route path="static-page" component={StaticPage} />
  </Route>
);
