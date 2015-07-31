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
  this.body = nunjucks.render('application/index.html', {
    ...settings, csrf: this.csrf
  });
});

app.listen(env.get('env:PORT'));
console.log(`Server listening on port ${env.get('env:PORT')}`);

export default app;
