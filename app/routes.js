'use strict';

import React                   from 'react/addons';
import { Route, DefaultRoute } from 'react-router';
import Home                    from './client/components/home/home';

const routes = (
  <Route name='main_page' path='/' handler={Home}></Route>
);

export default routes;
