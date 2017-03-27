/* @flow */
import Koa from 'koa';
import {
  apiLayer,
  assetsLayer,
  errorLayer,
  initialLayer,
  loggingLayer,
  renderLayer,
  securityLayer
} from './middlewares';
import apis from '../application/apis';
import controllers from '../application/controllers';

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
