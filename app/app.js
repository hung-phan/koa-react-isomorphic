import 'babel-polyfill';
import './client/lib/index';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import routes from './routes';

$(document).ready(() => {
  if (process.env.SERVER_RENDERING) {
    const IsomorphicRelay = require('isomorphic-relay').default;

    IsomorphicRelay.injectPreparedData(window.__data);
  }

  ReactDOM.render(routes, document.getElementById('app'));
});
