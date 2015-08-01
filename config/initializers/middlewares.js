'use strict';

import path         from 'path';
import middlewares  from 'koa-middlewares';
import htmlMinifier from 'koa-html-minifier';
import {PUBLIC}     from 'config/path-helper';

export default function(app) {
  app.use(middlewares.bodyParser());
  app.use(middlewares.logger());
  app.use(middlewares.compress());
  app.use(middlewares.favicon(path.join(PUBLIC, 'favicon.ico')));
  app.use(htmlMinifier({
    collapseWhitespace: true,
    removeComments: true,
    preserveLineBreaks: process.env.NODE_ENV === 'development'
  }));
  app.use(middlewares.staticCache(PUBLIC, { gzip: true }));

  // csrf
  app.keys = ['session secret'];
  middlewares.csrf(app);
  app.use(middlewares.cookieSession(app));
  app.use(middlewares.csrf.middleware);
}
