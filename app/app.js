'use strict';

require('babel/polyfill');
require('./client/lib/index');

import $          from 'jquery';
import { render } from 'react-dom';
import Router     from 'react-router';
import routes     from './routes';

$(document).ready(function() {
  Router.run(routes, Router.HistoryLocation, function(Handler) {
    render(<Handler />, document.getElementById('app'));
  });
});
