import nunjucks from 'nunjucks';
import settings from 'config/initializers/settings';

function render(template: string, parameters: Object = {}) {
  return new Promise(resolve => {
    resolve(
      nunjucks.render(template, {
        ...settings,
        ...parameters,
        csrf: this.csrf
      })
    );
  });
};

export default function*(next) {
  this.render = this.render || render;
  yield next;
}
