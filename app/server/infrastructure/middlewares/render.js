/* @flow */
/* global process */
import path from "path";
import marko from "marko";
import settings from "../settings";

export default async (ctx: Object, next: Function) => {
  ctx.render = (template: string, parameters: Object = {}) => {
    ctx.type = "text/html";

    return new Promise((resolve, reject) => {
      const templatePath = path.join(
        settings.path.ROOT,
        `${settings.path.TEMPLATES_DIR}/${template}`
      );
      const currentTemplate = process.env.NODE_ENV === "production"
        ? global.nodeRequire(`${templatePath}.js`)
        : marko.load(templatePath);

      try {
        resolve(
          currentTemplate.stream({
            ...settings,
            ...parameters,
            csrf: ctx.csrf
          })
        );
      } catch (e) {
        reject(e);
      }
    });
  };

  await next();
};
