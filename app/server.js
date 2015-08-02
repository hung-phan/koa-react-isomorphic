'use strict';

import koa               from 'koa';
import nunjucksConfig    from 'config/initializers/nunjucks';
import middlewaresConfig from 'config/initializers/middlewares';

const app = koa();

middlewaresConfig(app);
nunjucksConfig(app);

// response
app.use(function* () {
  this.body = this.render('application/index.html');
});

app.listen(3000);
console.log('Server listening on port 3000');

function __eval() {
  console.log('here and there');
}

export default app;
