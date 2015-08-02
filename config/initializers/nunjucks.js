'use strict';

import koa               from 'koa';
import nunjucks          from 'nunjucks';
import settingsConfig    from './settings';

const options = {
  autoescape: true
};

export default function(app : koa) {
  const env = nunjucks.configure('app/server/templates', options);

  env.addFilter('json', JSON.stringify);

  app.use(function* (next) {
    this.render = this.render || function(template, parameters = {}) {
      return nunjucks.render(template, {
        ...parameters, ...settingsConfig, csrf: this.csrf
      });
    };

    yield next;
  });
}
