'use strict';

const options = {
  autoescape: true
};

export default function(nunjucks) {
  const env = nunjucks.configure('app/server/templates', options);

  env.addFilter('json', JSON.stringify);
}
