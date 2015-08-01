'use strict';

export default function(nunjucks) {
  const Template = nunjucks.configure('app/server/templates', { autoescape: true });

  Template.addFilter('json', (obj) => JSON.stringify(obj));
}
