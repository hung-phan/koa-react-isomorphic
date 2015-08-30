# React and Koa boilerplate

The ideas of this repository are to try out all new concepts and libraries which work great with React.js.
Additionally, this will be the boilerplate for koa isomorphic or universal application.

## Development
Clone this repo

```bash
$ git clone git@github.com:hung-phan/koa-react-isomorphic.git
$ cd koa-react-isomorphic
$ npm install
```

Single run

```bash
$ npm run watch
$ npm start # or npm start development 3000
```

Or with hot reload

```bash
$ npm run watch
$ npm run dev # start server
```

## Build

```bash
$ gulp build
$ SECRET_KEY=your_env_key npm start # or start pm2 in config/pm2/production.json
```

## Production

```bash
$ export SECRET_KEY=your_secret_key
```

## Current setup
- Koa.js server up and running
- Webpack bundle with hot reload for both server and client
- Utilize es6 syntax
- Flowtype checking using `babel-type-check`
- Nunjucks template and macro setups
- CSS prebundle with bootstrap and FontAwesome
- Mocha unit test
- Test coverage by Istanbul
- Server rendering
- Best practices for server and client
- Redux
- API
- Data fetching for redux
- E2E testing

## Structure

```
- app/
 |- client/
  |- actions/
   |  todos-test.js
   |  todos.js
  |- components/
   |+ helpers/
   |- main/
    |  app-test.js
    |  app.js
   |- templates/
    |  todos-test.js
    |  todos.js
   |- todos/
    |+ todos-add/
    |+ todos-body/
    |+ todos-header/
  |- helpers/
   |  fetch-data-test.js
   |  fetch-data.js
   |  get-url-test.js
   |  get-url.js
  |- lib/
   |  font-awesome.js
   |  index.js
   |  twitter-bootstrap.js
  |- reducers/
   |  index.js
   |  todos-test.js
   |  todos.js
  |- stores/
   |  index-test.js
   |  index.js
 |- server/
  |- apis/
   |+ v1/
   |  base.js
  |- controllers/
   |  application.js
   |  base.js
  |- models/
  |+ templates/
 |  app.js
 |  routes.js
 |  server.js
+ bower_components/
+ build/
- config/
 |- initializers/
  |  nunjucks.js
  |  settings.js
 |- middlewares/
  |- custom/
   |  error.js
   |  prerender.js
   |  render.js
  |  config.js
 |+ pm2/
 |+ webpack/
 |  config.json
 |  path-helper.js
+ node_modules/
+ public/
- scripts/
 |  build
 |  start
  bower.json
  compiler.js
  gulpfile.js
  LICENSE
  nodemon.json
  npm-debug.log
  package.json
  README.md
```
