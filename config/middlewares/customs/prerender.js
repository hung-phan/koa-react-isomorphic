'use strict';

import nunjucks from 'nunjucks';
import React    from 'react';
import Router   from 'react-router';
import routes   from 'app/routes';
import settings from 'config/initializers/settings';

export default function* (next) {
  this.prerender = this.prerender ||
    (process.env.SERVER_RENDERING ?
      function (template: string, parameters: Object = {}) {
        let prerenderComponent;

        Router.run(routes, this.request.path, (Handler) => {
          prerenderComponent = React.renderToString(<Handler />);
        });

        return nunjucks.render(template, {
          ...parameters, ...settings, prerenderComponent, csrf: this.csrf
        });
      } : this.render
    );

  yield next;
}
