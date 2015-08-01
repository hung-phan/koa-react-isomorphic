'use strict';

export default function(nunjucks) {
  const Template = nunjucks.configure('views', { autoescape: true });

  Template.addFilter('json', (obj) => JSON.stringify(obj));
}
