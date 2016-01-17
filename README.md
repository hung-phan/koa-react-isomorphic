# React and Koa boilerplate

[![build status](https://secure.travis-ci.org/hung-phan/koa-react-isomorphic.svg)](http://travis-ci.org/hung-phan/koa-react-isomorphic/)
[![Dependency Status](https://david-dm.org/hung-phan/koa-react-isomorphic.svg)](https://david-dm.org/hung-phan/koa-react-isomorphic)
[![devDependency Status](https://david-dm.org/hung-phan/koa-react-isomorphic/dev-status.svg)](https://david-dm.org/hung-phan/koa-react-isomorphic#info=devDependencies)

The idea of this repository are to try out all new concepts and libraries which work great for React.js.
Additionally, this will be the boilerplate for koa isomorphic (or universal) application.

So far, I manage to put together these following technologies:

* [Koa.js](https://github.com/koajs/koa)
* [Webpack](https://github.com/webpack/webpack)
* [Babel](https://babeljs.io/)
* [Flowtype](http://flowtype.org/)
* [Nunjucks](https://mozilla.github.io/nunjucks/)
* [Bootstrap](http://getbootstrap.com/css/) and [FontAwesome](https://fortawesome.github.io/Font-Awesome/)
* [Redux](https://github.com/rackt/redux)
* [PostCSS](https://github.com/postcss/postcss)
* [CSSNext](http://cssnext.io/)
* [CSSNano](http://cssnano.co/)
* [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), [Sinon](http://sinonjs.org/), [Nock](https://github.com/pgte/nock) and [Istanbul](https://github.com/gotwarlost/istanbul)

## Explanation

What initially gets run is `build/server.js`, which is complied by Webpack to utilise the power of ES6 and ES7 in server-side code.
In `server.js`, I initialse all middlewares from `config/middleware/config`, then start server at `localhost:3000`. API calls
from client side eventually will request to `/api/*`, which are created by `app/server/apis`. Rendering tasks will be delegated to
[React-Router](https://github.com/rackt/react-router) to do server rendering for React.

### Require assets in server

Leverage the power of [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to hack `require` module with
the support of external webpack.

```javascript
    function(context, request, callback) {
      const style = '(.css|.less|.scss|.gif|.jpg|.jpeg|.png|.svg|.ttf|.eot|.woff|.woff2)';

      return (new RegExp(`${style}$`)).test(request)
        ? callback(null, `commonjs ${path.resolve(context, request)}`)
        : callback();
    },
```

### app/route.js

Contains all components and routing.

### app/app.js

Binds root component to `<div id='app'></div>`, and prepopulate redux store with server-rendering data from `window.__data`

### app/server.js

Handles routing for server, and generates page which will be returned by react-router and nunjucks. I make a facade `getUrl` for data fetching in both client and server.
Then performs server-side process.

### Server-side data fetching

We ask react-router for a list of all the routes that match the current request and we check to see if any of the matched routes has a static `fetchData()` function.
If it does, we pass the redux dispatcher to it and collect the promises returned. Those promises will be resolved when each matching route has loaded its
necessary data from the API server.

Takes a look at `templates/todos`, we will have sth like `@fetchDataEnhancer(store => store.dispatch(fetchTodos()))` to let the server calls `fetchData()` function
on a component from the server.

## Features

* Immutablejs: Available on [features/immutablejs](https://github.com/hung-phan/koa-react-isomorphic/tree/features/immutable-js)

## Upcoming

* Rxjs
* Relay

## Development

```bash
$ git clone git@github.com:hung-phan/koa-react-isomorphic.git
$ cd koa-react-isomorphic
$ npm install
```

### Hot reload

```bash
$ npm run watch
$ npm run dev
```

### With server rendering - encourage for testing only

```bash
$ SERVER_RENDERING=true npm run watch
$ npm run dev
```

## Test

```bash
$ npm run test:watch
$ npm run test:lint
```

## Production

### Normal run

```bash
$ gulp build
$ SECRET_KEY=your_env_key npm start
```

### With pm2

```bash
$ gulp build
$ SECRET_KEY=your_env_key gulp pro-server
```

## Testing

```bash
$ npm test
$ npm run coverage
```

### Phusion Passenger server with Nginx

Upcoming

## Application structure

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
 |  server-init.js
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
  package.json
  prod-server.log
  README.md
```
