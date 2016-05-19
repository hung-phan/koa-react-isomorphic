import cors from 'koa-cors';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import staticCache from 'koa-static-cache';
import htmlMinifier from 'koa-html-minifier';
import router from 'koa-router';
import conditionalGet from 'koa-conditional-get';
import etag from 'koa-etag';
import csrf from 'koa-csrf';
import cookieSession from 'koa-session';
import compress from 'koa-compress';
import helmet from 'koa-helmet';
import settings from 'server/initializers/settings';
import render from './custom/render';
import prerender from './custom/prerender';
import error from './custom/error';

export function loggingLayer(app) {
  app.use(logger()); // https://github.com/koajs/logger
}

export function initialLayer(app) {
  app.use(bodyParser()); // https://github.com/koajs/bodyparser

  // remove this appConfig if you have nginx already serves the public folder
  // in production mode
  app.use(staticCache(settings.path.PUBLIC, { gzip: true })); // https://github.com/koajs/static-cache
}

export function apiLayer(app, apiRoutes) {
  const newRouter = router();

  newRouter.use(
    conditionalGet(), // https://github.com/koajs/conditional-get
    etag(), // https://github.com/koajs/etag
    cors() // https://github.com/koajs/cors
  );

  apiRoutes(newRouter);
  app.use(newRouter.routes());

  return newRouter;
}

export function securityLayer(app) {
  /* eslint no-param-reassign: [0] */
  const newRouter = router();

  app.keys = [process.env.SECRET_KEY];
  csrf(app);

  newRouter.use(
    cookieSession(app), // https://github.com/koajs/session
    csrf.middleware // https://github.com/koajs/csrf
  );

  app.use(newRouter.routes());
  app.use(helmet()); // https://github.com/venables/koa-helmet

  return newRouter;
}

export function renderLayer(app, templateRoutes) {
  const newRouter = router();

  newRouter.use(
    render,
    prerender,
    htmlMinifier({
      collapseWhitespace: true,
      removeComments: true,
      preserveLineBreaks: false,
      removeEmptyAttributes: false,
      removeIgnored: true,
    }), // https://github.com/kangax/html-minifier
    compress() // https://github.com/koajs/compress
  );
  templateRoutes(newRouter);
  app.use(newRouter.routes());

  return newRouter;
}

export function errorLayer(app) {
  app.use(error());
}
