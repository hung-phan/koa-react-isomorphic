/* @flow */
/* global process */
import path from "path";
import marko from "marko";
import settings from "../settings";

export default function(
  template: string,
  parameters: Object = {}
): Promise<string> {
  this.type = "text/html";

  const templatePath = path.join(
    settings.path.ROOT,
    `${settings.path.TEMPLATES_DIR}/${template}`
  );
  const currentTemplate =
    process.env.NODE_ENV === "production"
      ? global.nodeRequire(`${templatePath}.js`)
      : marko.load(templatePath);

  return currentTemplate.stream({
    ...settings,
    ...parameters,
    csrf: this.csrf
  });
}
