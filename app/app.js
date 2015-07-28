'use strict';

require('expose?jQuery!expose?$!jquery');
require('expose?React!react/addons');

import React from 'react/addons';

$(document).ready(function() {
  require.ensure(['./components/greeting'], function(require) {
    var Greeting = require('./components/greeting');

    React.render(<Greeting />, document.getElementById('app'));
  });
});
