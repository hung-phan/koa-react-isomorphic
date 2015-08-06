'use strict';

import koa                from 'koa';
import nunjucks           from 'nunjucks';
import settingsConfig     from './settings';
import React              from 'react';
import Router             from 'react-router';
import routes             from 'app/routes';

const options = {
  autoescape: true
};

export default function(app : koa) {
  const env = nunjucks.configure('app/server/templates', options);

  env.addFilter('json', JSON.stringify);

  app.use(function* (next) {
    this.render = this.render || function(template: string, parameters: Object = {}) {
      return nunjucks.render(template, {
        ...parameters, ...settingsConfig, csrf: this.csrf
      });
    };

    this.prerender = this.prerender || function(template: string, parameters: Object = {}) {
      let prerenderComponent;

      Router.run(routes, this.request.path, (Handler) => {
        prerenderComponent = React.renderToString(<Handler />);
      });

      return nunjucks.render(template, {
        ...parameters, ...settingsConfig, prerenderComponent, csrf: this.csrf
      });
    };

    yield next;
  });
}
