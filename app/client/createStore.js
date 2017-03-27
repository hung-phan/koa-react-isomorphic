/* @flow */
/* global process */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';
import { persistState } from 'redux-devtools';
import reducers from './createReducer';

let middlewares = [
  thunkMiddleware,
  promiseMiddleware,
];
let enhancers = [];

// support for development
if (process.env.NODE_ENV === 'development' && process.env.RUNTIME_ENV === 'client') {
  const loggerMiddleware = createLogger({ level: 'info' });

  middlewares = [
    ...middlewares,
    loggerMiddleware,
  ];

  enhancers = [
    ...enhancers,
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  ];
}

// support redux-devtools
if (process.env.RUNTIME_ENV === 'client' && window.devToolsExtension) {
  enhancers = [
    ...enhancers,
    window.devToolsExtension(),
  ];
}

export default function (initialState: Object = {}) {
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middlewares),
    ...enhancers
  ));

  if (process.env.NODE_ENV === 'development' && module.hot) {
    // $FlowFixMe
    module.hot.accept('./createReducer', () =>
      store.replaceReducer(require('./createReducer').default)
    );
  }

  return store;
}
