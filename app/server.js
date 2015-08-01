'use strict';

import koa               from 'koa';
import nunjucks          from 'nunjucks';
import nunjucksConfig    from 'config/initializers/nunjucks';
import middlewaresConfig from 'config/initializers/middlewares';
import settings          from 'config/initializers/settings';

const app = koa();

middlewaresConfig(app);
nunjucksConfig(nunjucks);

// response
app.use(function* () {
  this.body = nunjucks.render('application/index.html', {
    ...settings, csrf: this.csrf
  });
});

app.listen(3000);
console.log('Server listening on port 3000');

export default app;
