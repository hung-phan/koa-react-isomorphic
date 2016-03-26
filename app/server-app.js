import koa from 'koa';
import debug from 'debug';
import * as config from 'server/middlewares';
import apis from 'server/apis/base';
import schema from 'database/schema';
import controllers from 'server/controllers/base';

const app = koa();

// setup middlewares
config.loggingLayer(app);
config.graphQLLayer(app, schema);
config.initialLayer(app);
config.errorLayer(app);
config.apiLayer(app, apis);
config.securityLayer(app);
config.renderLayer(app, controllers);

// error logs
app.on('error', (error) => {
  debug('error')(error);
});

export default app;
