'use strict';

import nconf from 'nconf';

nconf
  .env()
  .argv();

export default nconf;
