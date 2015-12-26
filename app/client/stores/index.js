import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunkMiddleware from 'redux-thunk';
import routes from 'app/routes';
import reducers from './../reducers';

let middlewares = [thunkMiddleware];
let developmentMiddlewares = [];

if (process.env.NODE_ENV === 'development' && !process.env.SERVER_RENDERING) {
  const logger = require('redux-logger')({ level: 'info' });

  middlewares = [logger, ...middlewares];
  developmentMiddlewares = [require('./../components/main/debug').instrument()];
}

const createHistory = process.env.RUNTIME_ENV === 'client'
                      ? require('history/lib/createBrowserHistory')
                      : require('history/lib/createMemoryHistory');

const finalCreateStore = compose(
  applyMiddleware(...middlewares),
  reduxReactRouter({ routes, createHistory }),
  ...developmentMiddlewares
)(createStore);

export default function configureStore(initialState = {}) {
  const store = finalCreateStore(reducers, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}
