'use strict';

import koa   from 'koa';
import chalk from 'chalk';

export default function(app) {
  app.use(function *(next){
    yield next;

    console.log(`${chalk.green(`${this.method} ${this.response.status}`)} ${chalk.blue(this.url)}`);
  });
}
