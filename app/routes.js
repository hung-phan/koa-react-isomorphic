'use strict';

import React     from 'react';
import { Route } from 'react-router';
import App       from './client/components/app';
import Home      from './client/components/home/home';

export default (
  <Route handler={App}>
    <Route path='/' handler={Home} />
  </Route>
);
