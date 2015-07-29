'use strict';

import path           from 'path';
import koa            from 'koa';
import middlewares    from 'koa-middlewares';
import htmlMinifier   from 'koa-html-minifier';
import nunjucks       from 'nunjucks';
import serverSettings from './server/settings';

const PORT = 3000;
const app = koa();
const nunjucksEnv = nunjucks.configure('views', {
                      autoescape: true
                    });

// template filters
nunjucksEnv.addFilter('json', obj => JSON.stringify(obj));

// settings
middlewares.csrf(app);
app.use(middlewares.bodyParser());
app.use(middlewares.logger());
app.use(middlewares.compress());
app.use(htmlMinifier({ collapseWhitespace: true, removeComments: true}));
app.use(middlewares.staticCache(path.join(__dirname, './../public'), { gzip: true }));
app.use(middlewares.csrf.middleware);

// response
app.use(function* () {
  this.body = nunjucks.render('application/index.html', serverSettings);
});

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);

export default app;
