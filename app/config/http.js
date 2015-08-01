const PUBLIC_PATH = './public'

const middlewares = {
  orders: [
    'bodyparser',
    'logger',
    'compress',
    'favicon',
    'staticCache',
    'csrf',
    'cookieSession'
  ],

  favicon: [PUBLIC_PATH],

  cookieSession: (app) => {
    return [app]
  }
}



export default {
  middlewares
}