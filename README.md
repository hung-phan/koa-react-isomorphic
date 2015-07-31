# React and Koa boilerplate

The ideas of this repository are to try out all new concepts and libraries which work great with React.js.
Additionally, this will be the boilerplate for koa isomorphic or universal application.

## Why another one

Main purpose is to learn actually. However, I just luckily to gather best practices from the community.
Also I think that I will explain the structure and configuration in details.

## Development

Single run

```bash
$ npm run watch
$ npm start # or npm start development 3000
```

Or with hot reload

```bash
$ npm run watch
$ gulp dev-server # start server
$ gulp dev-server-delete # kill server
```

See [pm2](https://github.com/Unitech/pm2) for more info

## Build

```bash
$ gulp build
$ SECRET_KEY=your_env_key npm start # or start pm2
```

## Production

export SECRET_KEY in production

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

## Working on
- E2E testing
- API

## Structure

```
- app/
 |- client/
  |- components/
   |- home/
    |  home-test.js
    |  home.js
  |- lib/
   |  font-awesome.js
   |  index.js
   |  twitter-bootstrap.js
 |- server/
  |- models/
  |- templates/
   |+ application/
   |+ helpers/
   |- layouts/
    |  application.html
 |  app.js
 |  server.js
+ bower_components/
+ build/
- config/
 |- initializers/
  |  middlewares.js
  |  nunjucks.js
  |  settings.js
 |- pm2/
  |  development.json
  |  production.json
 |- webpack/
  |- client/
   |  default.js
   |  development.js
   |  production.js
  |- server/
   |  default.js
   |  development.js
   |  production.js
 |  config.json
 |  path-helper.js
+ node_modules/
+ public/
- scripts/
 |  build
  bower.json
  compiler.js
  gulpfile.js
  LICENSE
  npm-debug.log
  package.json
  README.md
```
