'use strict';

import middlewares         from 'koa-middlewares';
import htmlMinifier        from 'koa-html-minifier';
import {PUBLIC_PATH, join} from './path';

export default function(app) {
  app.use(middlewares.bodyParser());
  app.use(middlewares.logger());
  app.use(middlewares.compress());
  app.use(middlewares.favicon(join(PUBLIC_PATH, 'favicon.ico')));
  app.use(htmlMinifier({
    collapseWhitespace: true,
    removeComments: true,
    preserveLineBreaks: process.env.NODE_ENV === 'development'
  }));
  app.use(middlewares.staticCache(PUBLIC_PATH, { gzip: true }));

  // csrf
  app.keys = ['session secret'];
  middlewares.csrf(app);
  app.use(middlewares.cookieSession(app));
  app.use(middlewares.csrf.middleware);
}
