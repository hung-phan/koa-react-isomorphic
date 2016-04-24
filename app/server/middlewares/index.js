import cors from 'koa-cors';
import middlewares from 'koa-middlewares';
import htmlMinifier from 'koa-html-minifier';
import helmet from 'koa-helmet';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';
import settings from 'server/initializers/settings';
import render from './custom/render';
import prerender from './custom/prerender';
import error from './custom/error';

export function loggingLayer(app) {
  app.use(middlewares.logger()); // https://github.com/koajs/logger
}

export function graphQLLayer(app, schema) {
  app.use(
    mount('/graphql', graphqlHTTP({
      schema,
      graphiql: process.env.NODE_ENV === 'development',
      pretty: process.env.NODE_ENV === 'development',
    })
  ));
}

export function initialLayer(app) {
  app.use(middlewares.bodyParser()); // https://github.com/koajs/bodyparser

  // remove this appConfig if you have nginx already serves the public folder
  // in production mode
  app.use(middlewares.staticCache(settings.path.PUBLIC, { gzip: true })); // https://github.com/koajs/static-cache
}

export function apiLayer(app, apiRoutes) {
  const router = middlewares.router();

  router.use(
    middlewares.conditional(), // https://github.com/koajs/conditional-get
    middlewares.etag(), // https://github.com/koajs/etag
    cors() // https://github.com/koajs/cors
  );

  apiRoutes(router);
  app.use(router.routes());

  return router;
}

export function securityLayer(app) {
  /* eslint no-param-reassign: [0] */
  const router = middlewares.router();

  app.keys = [process.env.SECRET_KEY];
  middlewares.csrf(app);

  router.use(
    middlewares.cookieSession(app), // https://github.com/koajs/session
    middlewares.csrf.middleware // https://github.com/koajs/csrf
  );

  app.use(router.routes());
  app.use(helmet()); // https://github.com/venables/koa-helmet

  return router;
}

export function renderLayer(app, templateRoutes) {
  const router = middlewares.router();

  router.use(
    render,
    prerender,
    htmlMinifier({
      collapseWhitespace: true,
      removeComments: true,
      preserveLineBreaks: false,
      removeEmptyAttributes: false,
      removeIgnored: true,
    }), // https://github.com/kangax/html-minifier
    middlewares.compress() // https://github.com/koajs/compress
  );
  templateRoutes(router);
  app.use(router.routes());

  return router;
}

export function errorLayer(app) {
  app.use(error());
}
