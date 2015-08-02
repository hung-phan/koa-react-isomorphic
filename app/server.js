'use strict';

import koa               from 'koa';
import nunjucks          from 'nunjucks';
import nunjucksConfig    from 'config/initializers/nunjucks';
import middlewaresConfig from 'config/initializers/middlewares';
import settingsConfig    from 'config/initializers/settings';

const app = koa();

middlewaresConfig(app);
nunjucksConfig(nunjucks);

// response
app.use(function* () {
  this.body = nunjucks.render('application/index.html', {
    ...settingsConfig, csrf: this.csrf
  });
});

app.listen(3000);
console.log('Server listening on port 3000');

function __eval() {
  console.log('here and there');
}

export default app;
