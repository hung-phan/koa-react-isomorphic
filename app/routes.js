'use strict';

import React    from 'react';
import {
  Route,
  DefaultRoute,
  NotFoundRoute
}               from 'react-router';
import App      from './client/components/app/app';
import Home     from './client/components/home/home';
import NotFound from './client/components/not-found/not-found';

const routes = (
  <Route handler={App}>
    <Route path='/' handler={Home} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

export default routes;
