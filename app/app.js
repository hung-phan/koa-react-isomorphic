'use strict';

require('babel/polyfill');
require('./client/lib/index');

import $     from 'jquery';
import React from 'react/addons';

$(document).ready(function() {
  require.ensure(['./client/components/greeting'], function(require) {
    var Greeting = require('./client/components/greeting');

    React.render(<Greeting />, document.getElementById('app'));
  });
});
