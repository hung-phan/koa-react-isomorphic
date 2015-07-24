'use strict';

require('expose?jQuery!expose?$!jquery');
require('expose?React!react/addons');

import React from 'react/addons';
import Greeting from './components/greeting';


$(document).ready(function() {
  React.render(<Greeting />, document.getElementById('app'));
});
