'use strict';

import koa from 'koa';
import nunjucksConfig from 'config/initializers/nunjucks';
import middlewaresConfig from 'config/initializers/middlewares';

const app = koa();

middlewaresConfig(app);
nunjucksConfig(app);

// response
app.use(function* () {
  this.body = this.render('application/index.html');
});

const PORT = env.get('PORT') || 3000;

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);

export default app;