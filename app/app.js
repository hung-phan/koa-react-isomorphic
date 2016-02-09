import 'babel-polyfill';
import './client/lib/index';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/client/components/main/app';
import routes from './routes';
import configureStore from './client/stores/index';

$(document).ready(() => {
  ReactDOM.render(
    <App store={ configureStore(window.__data) } routes={ routes } />,
    document.getElementById('app')
  );
});
