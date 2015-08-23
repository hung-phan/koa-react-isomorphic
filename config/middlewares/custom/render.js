import nunjucks from 'nunjucks';
import settings from 'config/initializers/settings';

export default function* (next) {
  this.render = this.render || function(template: string, parameters: Object = {}) {
    return nunjucks.render(template, {
      ...parameters, ...settings, csrf: this.csrf
    });
  };

  yield next;
}
