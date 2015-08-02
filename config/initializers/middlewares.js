'use strict';

/**
 * @author Hung Phan
 *            _     _     _ _
 *           (_)   | |   | | |
 *  _ __ ___  _  __| | __| | | _____      ____ _ _ __ ___  ___
 * | '_ ` _ \| |/ _` |/ _` | |/ _ \ \ /\ / / _` | '__/ _ \/ __|
 * | | | | | | | (_| | (_| | |  __/\ V  V / (_| | | |  __/\__ \
 * |_| |_| |_|_|\__,_|\__,_|_|\___| \_/\_/ \__,_|_|  \___||___/
 */

import koa          from 'koa';
import path         from 'path';
import cors         from 'koa-cors';
import middlewares  from 'koa-middlewares';
import htmlMinifier from 'koa-html-minifier';
import {PUBLIC}     from 'config/path-helper';

const settings = {
  session: {
    // https://github.com/koajs/session
    enable: true
  },
  csrf: {
    // https://github.com/koajs/csrf
    // must also enable session to work correctly
    enable: true
  },
  bodyParser: {
    // https://github.com/koajs/bodyparser
    enable: true,
    params: []
  },
  conditional: {
    // https://github.com/koajs/conditional-get
    enable: false,
    params: []
  },
  etag: {
    // https://github.com/koajs/etag
    enable: false,
    params: []
  },
  cors: {
    // https://github.com/koajs/cors
    enable: false,
    params: []
  },
  favicon: {
    // https://github.com/koajs/favicon
    enable: true,
    params: [path.join(PUBLIC, 'favicon.ico')]
  },
  staticCache: {
    // https://github.com/koajs/static-cache
    enable: true,
    params: [PUBLIC, { gzip: true }]
  },
  htmlMinifier: {
    // https://github.com/kangax/html-minifier
    enable: true,
    params: [{
      collapseWhitespace: true,
      removeComments: true,
      preserveLineBreaks: process.env.NODE_ENV === 'development'
    }]
  },
  compress: {
    // https://github.com/koajs/compress
    enable: true,
    params: []
  },
  logger: {
    // https://github.com/koajs/logger
    enable: true,
    params: []
  }
};

function applyMiddlewares(app, middleware, options) {
  if (options.enable) {
    app.use(options.hasOwnProperty('params') ? middleware(...options.params) : middleware);
  }
}

export default function(app: koa) {
  // session and csrf
  if (settings.session.enable && settings.csrf.enable) {
    app.keys = ['read from env'];
    middlewares.csrf(app);

    applyMiddlewares(app, middlewares.cookieSession(app), settings.session);
    applyMiddlewares(app, middlewares.csrf.middleware, settings.csrf);
  }

  applyMiddlewares(app, middlewares.bodyParser, settings.bodyParser);
  applyMiddlewares(app, middlewares.conditional, settings.conditional);
  applyMiddlewares(app, middlewares.etag, settings.etag);
  applyMiddlewares(app, middlewares.cors, settings.cors);
  applyMiddlewares(app, middlewares.favicon, settings.favicon);
  applyMiddlewares(app, middlewares.staticCache, settings.staticCache);
  applyMiddlewares(app, htmlMinifier, settings.htmlMinifier);
  applyMiddlewares(app, middlewares.compress, settings.compress);
  applyMiddlewares(app, middlewares.logger, settings.logger);
}
