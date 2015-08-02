# All Hail The R

The ideas of this repository are to try out all new concepts and libraries which work great with React.js.
Additionally, this will be the boilerplate for koa isomorphic or universal application.

## Why another one

Main purpose is to learn actually. However, I just luckily to gather best practices from the community.
Also I think that I will explain the structure and configuration in details.

## Adknowledgement
- https://github.com/jlongster/blog
- https://github.com/webpack/react-starter
- https://github.com/focusaurus/express_code_structure

## Development

Single run

```bash
$ npm run watch
$ npm start
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
$ npm start # or start pm2
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

## Working on
- Best practices for server and client
- E2E testing
- API
- Server rendering

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
