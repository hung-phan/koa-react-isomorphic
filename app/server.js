'use strict';

import koa from 'koa';
import nunjucksConfig from 'config/initializers/nunjucks';
import middlewaresConfig from 'config/initializers/middlewares';

const app = koa();

middlewaresConfig(app);
nunjucksConfig(app);

// response
app.use(function* (next) {
  this.body = this.prerender('application/index.html');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);

export default app;
