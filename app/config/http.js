const PUBLIC_PATH = './public'

const middlewares = {
  orders: [
    'bodyparser',
    'logger',
    'compress',
    'favicon',
    'koa-html-minifier',
    'staticCache',
    'csrf',
    'cookieSession'
  ],

  favicon: [PUBLIC_PATH],

  'koa-html-minifier': [{
    collapseWhitespace: true,
    removeComments: true,
    preserveLineBreaks: process.env.NODE_ENV === 'development'
  }],

  cookieSession: (app) => {
    return [app]
  }
}

export default {
  middlewares,
  port: process.env.PORT || 3000
}