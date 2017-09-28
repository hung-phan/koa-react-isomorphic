# React and Koa boilerplate
[![build status](https://secure.travis-ci.org/hung-phan/koa-react-isomorphic.svg)](http://travis-ci.org/hung-phan/koa-react-isomorphic/)
[![codecov](https://codecov.io/gh/hung-phan/koa-react-isomorphic/branch/master/graph/badge.svg)](https://codecov.io/gh/hung-phan/koa-react-isomorphic)
[![Dependency Status](https://david-dm.org/hung-phan/koa-react-isomorphic.svg)](https://david-dm.org/hung-phan/koa-react-isomorphic)
[![devDependency Status](https://david-dm.org/hung-phan/koa-react-isomorphic/dev-status.svg)](https://david-dm.org/hung-phan/koa-react-isomorphic#info=devDependencies)

The idea of this repository is to implement all new concepts and libraries which work great for React.js.

* [Koa.js](https://github.com/koajs/koa)
* [Webpack](https://github.com/webpack/webpack)
* [Babel](https://babeljs.io/)
* [Flowtype](http://flowtype.org/)
* [Marko](http://markojs.com/)
* [Bootstrap](http://getbootstrap.com/css/) and [FontAwesome](https://fortawesome.github.io/Font-Awesome/)
* [Redux](https://github.com/rackt/redux)
* [Relay](https://facebook.github.io/relay/)
* [Immutablejs](https://facebook.github.io/immutable-js/)
* [ServiceWorker and AppCache](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
* [PostCSS](https://github.com/postcss/postcss), [CSSNext](http://cssnext.io/), [CSSNano](http://cssnano.co/)
* [Jest](https://facebook.github.io/jest), [Nock](https://github.com/pgte/nock)

## Requirement
- Install [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) to have better experience when developing.
- Install [yarn](https://github.com/yarnpkg/yarn)

## Features
* Immutablejs: Available on [features/immutablejs](https://github.com/hung-phan/koa-react-isomorphic/tree/features/immutable-js)
* Relay: Available on [features/relay](https://github.com/hung-phan/koa-react-isomorphic/tree/features/relay)

## Explanation

### Templates
Templates are written in marko.js with predefined template helpers. To see its usage, please refer to `layout/application.marko`.

### Server side rendering
I use [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to support loading assets in
the server side. You can see the configuration file under `config` folder.

#### Fetch data
- For redux, data is fetched using redial hooks on the server side.

Takes a look at `templates/todos`, I will have sth like:

```javascript
  createRedialEnhancer({
    [FETCH_DATA_HOOK]: ({ store }) => store.dispatch(fetchTodos()),
    [UPDATE_HEADER_HOOK]: ({ store }) => store.dispatch(updateLink([
      // window.javascriptAssets will be injected to do preload link for optimizing route
      { rel: 'preload', href: window.javascriptAssets['static-page'], as: 'script' },
    ])),
  })
```

- For relay, data is fetched using isomorphic-relay-router on the server side.

### Default require for node
The default `require` node statement has been modified by webpack-isomorphic-tools, so I remap it with `nodeRequire`
under `global`. For example, you can use it like as below:

```javascript
const { ROOT, PUBLIC } = global.nodeRequire('./config/path-helper');
```

Note: `nodeRequire` will resolve the path from project root directory.


#### Preload assets via redial
To be able to support for asynchronous chunks loading using `<link rel='preload' ... />`, I returned the javascript
assets map for all the routes to the client via `window.javascriptAssets`.

You can use this to inject assets for the next page to improve performance. This is what I am trying to achieve
[preload-webpack-plugin](https://github.com/GoogleChrome/preload-webpack-plugin).

This will map the hook with the current component and trigger it (Note: This will only be applied to root component).

### Async react components
[react-loadable](https://github.com/thejameskyle/react-loadable)

### Idea to structure redux application
For now, the best way is to place all logic in the same place with components to make it less painful when scaling the application.
Current structure is the combination of ideas from [organizing-redux](http://jaysoo.ca/2016/02/28/organizing-redux-application/) and
[ducks-modular-redux](https://github.com/erikras/ducks-modular-redux). Briefly, I will have our reducer, action-types, and actions
in the same place with featured components.

![alt text](https://raw.githubusercontent.com/hung-phan/koa-react-isomorphic/master/redux-structure.png "redux structure")

#### Localize selectors
Some great ideas from [scoped-selectors-for-redux-modules](http://www.datchley.name/scoped-selectors-for-redux-modules/).
You can create a localized scope for selector using `globalizeSelectors`.


```javascript
export const mountPoint = 'todos';

export const selectors = globalizeSelectors({
  getTodos: identity, // it will also work with reselect library
}, mountPoint);
```

Then in main reducer, you can have sth like this, which helps reduce the coupling with React view

```javascript
/* @flow */
import { combineReducers } from 'redux';
import todosReducer, { mountPoint as todosMountPoint } from './components/todos/logicBundle';
import routingReducer, { mountPoint as routingMountPoint } from './components/routing/logicBundle';
import helmetReducer, { mountPoint as helmetMountPoint } from './components/helmet/logicBundle';

export default combineReducers({
  [todosMountPoint]: todosReducer,
  [routingMountPoint]: routingReducer,
  [helmetMountPoint]: helmetReducer,
});
```

Sample for logicBundle:

```javascript
export const mountPoint = "todos";

export const selectors = globalizeSelectors(
  {
    getTodos: identity
  },
  mountPoint
);

export const ADD_TODO = "todos/ADD_TODO";
export const REMOVE_TODO = "todos/REMOVE_TODO";
export const COMPLETE_TODO = "todos/COMPLETE_TODO";
export const SET_TODOS = "todos/SET_TODOS";

export const addTodo: AddTodoActionType = createAction(ADD_TODO);
export const removeTodo: RemoveTodoActionType = createAction(REMOVE_TODO);
export const completeTodo: CompleteTodoActionType = createAction(COMPLETE_TODO);
export const setTodos: SetTodosActionType = createAction(SET_TODOS);
export const fetchTodos = () =>
  (dispatch: Function): Promise<TodoType[]> =>
    fetch(getUrl("/api/v1/todos"))
      .then(res => res.json())
      .then((res: TodoType[]) => dispatch(setTodos(res)));

export default handleActions(
  {
    [ADD_TODO]: (state, { payload: text }) => update(state, {
      $push: [{ text, complete: false }]
    }),
    [REMOVE_TODO]: (state, { payload: index }) => update(state, {
      $splice: [[index, 1]]
    }),
    [COMPLETE_TODO]: (state, { payload: index }) => update(state, {
      $splice: [
        [index, 1],
        [index, 0, { ...state[index], complete: !state[index].complete }]
      ]
    }),
    [SET_TODOS]: (state, { payload: todos }) => todos
  },
  []
);
```

## Upcoming
* Phusion Passenger server with Nginx

## Development

```bash
$ git clone git@github.com:hung-phan/koa-react-isomorphic.git
$ cd koa-react-isomorphic
$ yarn install
```

### Hot reload

```bash
$ yarn run watch
$ yarn run dev
```

### With server rendering - encourage for testing only

```bash
$ SERVER_RENDERING=true yarn run watch
$ yarn run dev
```

### Enable flowtype in development
```bash
$ yarn run flow-watch
$ yarn run flow-stop # to terminate the server
```

You need to add annotation to the file to enable flowtype (`// @flow`)


## Test

```bash
$ yarn test
```

## Debug
```bash
$ yarn run watch
$ yarn run debug
```

## Production

### Start production server

```bash
$ yarn run build
$ SECRET_KEY=your_env_key yarn start
```

### Docker container

```bash
$ docker-compose build
$ docker-compose up
```

Access `http://localhost:3000` to see the application

## QA

Feel free to open an issue on the repo.
