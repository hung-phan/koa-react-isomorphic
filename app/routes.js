import React     from 'react';
import { Route } from 'react-router';
import Todos     from './client/components/containers/todos';

export default (
  <Route>
    <Route path='/' handler={Todos} />
  </Route>
);
