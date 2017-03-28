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
import schema from '../application/apis/graphqlSchema';
import controllers from '../application/controllers';

const app = new Koa();

// setup middlewares
loggingLayer(app);
initialLayer(app);
apiLayer(app, schema, apis);
assetsLayer(app);
securityLayer(app);
renderLayer(app, controllers);
errorLayer(app);

export default app;
