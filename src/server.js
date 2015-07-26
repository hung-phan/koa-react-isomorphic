'use strict';

import koa            from 'koa';
import nunjucks       from 'nunjucks';
import logger         from './server/logger';
import nunjucksConfig from './server/nunjucks-config';

const app = koa();

// settings
logger(app);
nunjucksConfig(nunjucks);

// response
app.use(function *(){
  this.body = nunjucks.render('index.html');
});

app.listen(3000);
console.log('Server listening on port 3000');

export default app;
