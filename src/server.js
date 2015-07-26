'use strict';

import koa from 'koa';
import nunjucks from 'nunjucks';

// config nunjucks
nunjucks.configure('views', { autoescape: true });

const app = koa();

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response
app.use(function *(){
  this.body = nunjucks.render('index.html');
});

app.listen(3000);
console.log('Server listening on port 3000');
