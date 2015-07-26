'use strict';

import koa            from 'koa';
import nunjucks       from 'nunjucks';
import logger         from './server/logger';
import nunjucksConfig from './server/nunjucks-config';
import settings       from './server/settings';

const app = koa();

// settings
logger(app);
nunjucksConfig(nunjucks);

// response
app.use(function *(){
  this.body = nunjucks.render('application/index.html', {
    env: process.env.NODE_ENV,
    ...settings()
  });
});

app.listen(3000);
console.log('Server listening on port 3000');

export default app;
