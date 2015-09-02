import React from 'react';
import { Route } from 'react-router';
import Todos from './client/components/templates/todos';

export default (
  <Route>
    <Route path='/' handler={Todos} />
  </Route>
);
