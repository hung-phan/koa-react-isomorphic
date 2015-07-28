'use strict';

import koa                  from 'koa';
import logger               from 'koa-logger';
import serveStatic          from 'koa-static';
import router               from 'koa-route';
import nunjucks             from 'nunjucks';
import serverSettings       from './server/settings';
import serverStatic         from './server/serve-static';
import serverNunjucksConfig from './server/nunjucks-config';

const app = koa();

// settings
app.use(logger());
app.use(router.get('/assets', serveStatic('./public/assets')));
nunjucks.configure('views', { autoescape: true });

// response
// app.use(function *(){
//   console.log(serverSettings);
//   this.body = nunjucks.render('application/index.html', serverSettings);
// });

app.listen(3000);
console.log('Server listening on port 3000');

export default app;
