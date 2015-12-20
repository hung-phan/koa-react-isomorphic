import nunjucks from 'nunjucks';

const options = {
  autoescape: true
};

export default function () {
  const env = nunjucks.configure('app/server/templates', options);

  env.addFilter('json', JSON.stringify);
}
