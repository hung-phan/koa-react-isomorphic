import 'babel/polyfill';
import {
  initialLayer,
  apiLayer,
  securityLayer,
  renderLayer
} from 'config/middlewares/config';

import koa         from 'koa';
import debug       from 'debug';
import apis        from './server/apis/base';
import controllers from './server/controllers/base';

const PORT = process.env.PORT || 3000;
const app = koa();

// setup middlewares
initialLayer(app);
apiLayer(app, apis);
securityLayer(app);
renderLayer(app, controllers);

// error logs
app.on('error', function(error) {
  debug('error')(error);
});

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);

export default app;
