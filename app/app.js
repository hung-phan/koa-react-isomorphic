'use strict';

require('babel/polyfill');
require('./client/lib/index');

import $      from 'jquery';
import React  from 'react';
import Router from 'react-router';
import routes from './routes';

$(document).ready(function() {
  Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler />, document.getElementById('app'));
  });
});
