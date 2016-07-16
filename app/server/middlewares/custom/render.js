import path from 'path';
import marko from 'marko';
import settings from 'server/initializers/settings';

export default async (ctx, next) => {
  ctx.render = ctx.render ||
    function (template: string, parameters: Object = {}) {
      ctx.type = 'text/html';

      return new Promise(resolve => {
        const templatePath = path.join(settings.path.ROOT, `${settings.path.TEMPLATES_DIR}/${template}`);
        const currentTemplate = process.env.NODE_ENV === 'production'
                                  ? global.nodeRequire(`${templatePath}.js`)
                                  : marko.load(templatePath);

        resolve(
          currentTemplate.stream({
            ...settings,
            ...parameters,
            csrf: ctx.csrf,
          })
        );
      });
    };

  await next();
};
