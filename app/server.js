'use strict';

import path           from 'path';
import koa            from 'koa';
import middlewares    from 'koa-middlewares';
import htmlMinifier   from 'koa-html-minifier';
import nunjucks       from 'nunjucks';
import nunjucksEnv    from './server/nunjucks-settings';
import serverSettings from './server/settings';

const PORT = 3000;
const app = koa();

// settings
app.use(middlewares.bodyParser());
app.use(middlewares.logger());
app.use(middlewares.compress());
app.use(htmlMinifier({
  collapseWhitespace: true,
  removeComments: true,
  preserveLineBreaks: process.env.NODE_ENV === 'development'
}));
app.use(middlewares.staticCache(
  path.join(__dirname, './../public'), { gzip: true }
));
middlewares.csrf(app);
app.use(middlewares.csrf.middleware);

// response
app.use(function* () {
  this.body = nunjucks.render('application/index.html', serverSettings);
});

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);

export default app;
