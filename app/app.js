import './client/lib/index';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import { getRoutes, getClientHistory } from 'app/routes';

$(document).ready(() => {
  if (process.env.SERVER_RENDERING) {
    const IsomorphicRelay = require('isomorphic-relay').default;

    IsomorphicRelay.injectPreparedData(window.__data);
  }

  ReactDOM.render(getRoutes(getClientHistory()), document.getElementById('app'));
});
