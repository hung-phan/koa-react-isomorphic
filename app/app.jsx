import 'client/libs';

import $ from 'jquery';
import React from 'react';
import { whyDidYouUpdate } from 'why-did-you-update';
import renderComponents from './client/helpers/inject-data-utils';
import routes from './routes';

if (process.env.NODE_ENV === 'development') {
  whyDidYouUpdate(React, {
    exclude: /^(StaticContainer|Relay|IsomorphicRelayRouterContext|onlyUpdateForKeys|pure)/,
  });
}

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

$(document).ready(() => {
  renderComponents(routes, document.getElementById('app'));
});
