import React from 'react';
import { createRoutes, Route, IndexRoute } from 'react-router';
import ViewerQuery from 'client/queries/viewer';
import Todos from 'client/components/todos/index.jsx';
import StaticPage from 'client/components/static-page/index.jsx';

export default createRoutes(
  <Route path="/">
    <IndexRoute component={Todos} queries={ViewerQuery} />
    <Route path="static-page" component={StaticPage} />
  </Route>
);
