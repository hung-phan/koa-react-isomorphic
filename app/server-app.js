import Koa from 'koa';
import {
  loggingLayer,
  initialLayer,
  apiLayer,
  graphQLLayer,
  securityLayer,
  assetsLayer,
  renderLayer,
  errorLayer,
} from 'server/middlewares';
import apis from 'server/apis/base';
import schema from 'database/schema';
import controllers from 'server/controllers/base';

const app = new Koa();

// setup middlewares
loggingLayer(app);
initialLayer(app);
graphQLLayer(app, schema);
apiLayer(app, apis);
assetsLayer(app);
securityLayer(app);
renderLayer(app, controllers);
errorLayer(app);

export default app;
