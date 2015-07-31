'use strict';

import 'babel/polyfill';

import koa              from 'koa';
import debug            from 'debug';
import nunjucksSetup    from 'config/initializers/nunjucks';
import middlewaresSetup from 'config/middlewares/index';

const PORT: number = process.env.PORT || 3000;
const app: Object = koa();

nunjucksSetup();
middlewaresSetup(app);

// response
app.use(function* () {
  this.body = this.prerender('application/index.html');
});

app.on('error', function(error) {
  debug('error')(error);
});

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);

export default app;
