'use strict';

import debug   from 'debug';
import configs from './config';

export default function(app) {
  configs
    .filter((middleware: Object) => middleware.enable)
    .forEach((middleware: Object) => {
      debug('middleware')(`${middleware.name}: ON`);
      middleware.setup(app);
    });
}
