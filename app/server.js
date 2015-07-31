'use strict';

import koa      from 'koa';
import nunjucks from 'nunjucks';
import env      from './server/env';
import settings from './server/settings';

const app = koa();

require('./server/secret');
require('./server/middlewares')(app);
require('./server/nunjucks-settings')(nunjucks);

// response
app.use(function* () {
  console.log(settings);
  this.body = nunjucks.render('application/index.html', {
    ...settings, csrf: this.csrf
  });
});

app.listen(3000);
console.log('Server listening on port 3000');

export default app;
