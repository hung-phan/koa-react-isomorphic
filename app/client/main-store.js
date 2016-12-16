import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import loggerMiddleware from 'redux-logger';
import { persistState } from 'redux-devtools';
import reducers from './main-reducer';

let middlewares = [
  thunkMiddleware,
  promiseMiddleware,
];
let enhancers = [];

// support for development
if (process.env.NODE_ENV === 'development' && process.env.RUNTIME_ENV === 'client') {
  const logger = loggerMiddleware({ level: 'info' });

  middlewares = [
    ...middlewares,
    logger,
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

export default function (initialState = {}) {
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middlewares),
    ...enhancers
  ));

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./main-reducer', () =>
      store.replaceReducer(require('./main-reducer').default)
    );
  }

  return store;
}
