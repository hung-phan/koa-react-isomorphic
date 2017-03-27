/* @flow */
/* global process */
import cors from 'koa-cors';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import htmlMinifier from 'koa-html-minifier';
import router from 'koa-router';
import conditionalGet from 'koa-conditional-get';
import etag from 'koa-etag';
import CSRF from 'koa-csrf';
import convert from 'koa-convert';
import session from 'koa-generic-session';
import compress from 'koa-compress';
import helmet from 'koa-helmet';
import settings from '../settings';
import render from './render';
import prerender from './prerender';
import error from './error';

export const loggingLayer = (app: Object) =>
  app
    .use(logger()); // https://github.com/koajs/logger

export const initialLayer = (app: Object) =>
  app
    .use(bodyParser()) // https://github.com/koajs/bodyparser
    .use(conditionalGet()) // https://github.com/koajs/conditional-get
    .use(etag()); // https://github.com/koajs/etag

export const apiLayer = (app: Object, apiRoutes: Function) => {
  const newRouter = router();

  newRouter
    .use(convert(cors())); // https://github.com/koajs/cors

  apiRoutes(newRouter);

  app
    .use(newRouter.routes())
    .use(newRouter.allowedMethods());

  return newRouter;
};

export const assetsLayer = (app: Object) => {
  if (!process.env.SERVER_STATIC_ASSETS) {
    const staticAssets = require('koa-static');

    app
      .use(staticAssets(settings.path.PUBLIC, { gzip: true, maxage: 31536000 })); // https://github.com/koajs/static
  }
};

export const securityLayer = (app: Object) => {
  app.keys = [process.env.SECRET_KEY];

  app
    .use(convert(session())) // https://github.com/koajs/session
    .use(new CSRF({
      invalidSessionSecretMessage: 'Invalid session secret',
      invalidSessionSecretStatusCode: 403,
      invalidTokenMessage: 'Invalid CSRF token',
      invalidTokenStatusCode: 403,
      excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
      disableQuery: false,
    })) // https://github.com/koajs/csrf
    .use(helmet()); // https://github.com/venables/koa-helmet
};

export const renderLayer = (app: Object, templateRoutes: Function) => {
  const newRouter = router();

  newRouter
    .use(render)
    .use(prerender)
    .use(convert(htmlMinifier({
      collapseWhitespace: true,
      removeComments: true,
      preserveLineBreaks: false,
      removeEmptyAttributes: false,
      removeIgnored: true,
    }))) // https://github.com/kangax/html-minifier
    .use(compress()); // https://github.com/koajs/compress

  templateRoutes(newRouter);

  app
    .use(newRouter.routes())
    .use(newRouter.allowedMethods());

  return newRouter;
};

export const errorLayer = (app: Object) =>
  app
    .use(error);
