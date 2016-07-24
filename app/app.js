import './client/libs';

import $ from 'jquery';
import React from 'react';
import { getRoutes, getClientHistory } from 'app/routes';
import { init } from 'client/helpers/inject-data-utils';

if (process.env.NODE_ENV === 'development') {
  const { whyDidYouUpdate } = require('why-did-you-update');

  whyDidYouUpdate(React, {
    exclude: /^(StaticContainer|Relay|IsomorphicRelayRouterContext)/,
  });
}

$(document).ready(() => {
  init(
    getRoutes(getClientHistory()),
    document.getElementById('app')
  );
});
