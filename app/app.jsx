import 'client/libs';

import $ from 'jquery';
import React from 'react';
import { getRoutes, getClientHistory } from 'app/routes.jsx';
import { init } from 'client/helpers/inject-data-utils.jsx';
import { whyDidYouUpdate } from 'why-did-you-update';

if (process.env.NODE_ENV === 'development') {
  whyDidYouUpdate(React, {
    exclude: /^(StaticContainer|Relay|IsomorphicRelayRouterContext|onlyUpdateForKeys|pure)/,
  });
}

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

$(document).ready(() => {
  init(
    getRoutes(getClientHistory()),
    document.getElementById('app')
  );
});
