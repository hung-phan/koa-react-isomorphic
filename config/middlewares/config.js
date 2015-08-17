'use strict';

import path         from 'path';
import { PUBLIC }   from 'config/path-helper';
import cors         from 'koa-cors';
import middlewares  from 'koa-middlewares';
import htmlMinifier from 'koa-html-minifier';
import helmet       from 'koa-helmet';
import render       from './custom/render';
import prerender    from './custom/prerender';
import error        from './custom/error';

export default [
  {
    // https://github.com/koajs/logger
    name: 'logger',
    enable: true,
    setup(app) {
      app.use(middlewares.logger());
    }
  },
  {
    // https://github.com/koajs/session
    // https://github.com/koajs/csrf
    enable: true,
    name: 'session, csrf',
    setup(app) {
      app.keys = [process.env.SECRET_KEY];
      middlewares.csrf(app);

      app.use(middlewares.cookieSession(app));
      app.use(middlewares.csrf.middleware);
    }
  },
  {
    // https://github.com/venables/koa-helmet
    enable: process.env.NODE_ENV === 'production',
    name: 'helmet',
    setup(app) {
      app.use(helmet());
    }
  },
  {
    // https://github.com/koajs/bodyparser
    enable: true,
    name: 'bodyParser',
    setup(app) {
      app.use(middlewares.bodyParser());
    }
  },
  {
    enable: true,
    name: 'render',
    setup(app) {
      app.use(render);
    }
  },
  {
    enable: true,
    name: 'prerender',
    setup(app) {
      app.use(prerender);
    }
  },
  {
    enable: true,
    name: 'errorHandler',
    setup(app) {
      app.use(error);
    }
  },
  {
    // https://github.com/koajs/conditional-get
    enable: process.env.NODE_ENV === 'production',
    name: 'conditional',
    setup(app) {
      app.use(middlewares.conditional());
    }
  },
  {
    // https://github.com/koajs/etag
    name: 'etag',
    enable: process.env.NODE_ENV === 'production',
    setup(app) {
      app.use(middlewares.conditional());
    }
  },
  {
    // https://github.com/koajs/cors
    name: 'cors',
    enable: false,
    setup(app) {
      app.use(middlewares.cors());
    }
  },
  {
    // https://github.com/koajs/favicon
    name: 'favicon',
    enable: true,
    setup(app) {
      app.use(middlewares.favicon(path.join(PUBLIC, 'favicon.ico')));
    }
  },
  {
    // https://github.com/koajs/static-cache
    name: 'staticCache',
    enable: true,
    setup(app) {
      app.use(middlewares.staticCache(PUBLIC, { gzip: true }));
    }
  },
  {
    // https://github.com/kangax/html-minifier
    name: 'htmlMinifier',
    enable: true,
    setup(app) {
      app.use(htmlMinifier({
        collapseWhitespace: true,
        removeComments: true,
        preserveLineBreaks: process.env.NODE_ENV === 'development'
      }));
    }
  },
  {
    // https://github.com/koajs/compress
    name: 'compress',
    enable: process.env.NODE_ENV === 'production',
    setup(app) {
      app.use(middlewares.compress());
    }
  }
];
