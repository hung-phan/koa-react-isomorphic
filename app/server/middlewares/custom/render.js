import marko from 'marko';
import settings from 'server/initializers/settings';

export default function* (next) {
  this.render = this.render ||
    function (template: string, parameters: Object = {}) {
      this.type = 'text/html';

      return new Promise(resolve => {
        resolve(
          marko
            .load(`${settings.templatesDir}/${template}`)
            .stream({
              ...settings,
              ...parameters,
              csrf: this.csrf,
            })
        );
      });
    };

  yield next;
}
