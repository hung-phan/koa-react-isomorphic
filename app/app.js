import 'babel-polyfill';
import './client/lib/index';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import routes from './routes';

$(document).ready(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
