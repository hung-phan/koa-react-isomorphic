import Koa from 'koa';
import {
  loggingLayer,
  initialLayer,
  apiLayer,
  securityLayer,
  assetsLayer,
  renderLayer,
  errorLayer,
} from 'server/middlewares';
import apis from 'server/apis/base';
import controllers from 'server/controllers/base';

const app = new Koa();

// setup middlewares
loggingLayer(app);
initialLayer(app);
apiLayer(app, apis);
assetsLayer(app);
securityLayer(app);
renderLayer(app, controllers);
errorLayer(app);

export default app;
