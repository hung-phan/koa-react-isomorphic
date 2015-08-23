import React     from 'react';
import { Route } from 'react-router';
import App       from './client/components/app';
import Todos     from './client/components/containers/todos';

export default (
  <Route handler={App}>
    <Route path='/' handler={Todos} />
  </Route>
);
