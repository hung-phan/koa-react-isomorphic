import './client/lib/index';

import $ from 'jquery';
import { getRoutes, getClientHistory } from 'app/routes';
import { init } from 'client/helpers/inject-data-utils';

$(document).ready(() => {
  init(
    getRoutes(getClientHistory()),
    document.getElementById('app')
  );
});
