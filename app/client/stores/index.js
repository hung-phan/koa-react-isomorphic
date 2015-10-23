import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter, ReduxRouter } from 'redux-router';
import thunkMiddleware from 'redux-thunk';
import transitionMiddleware from './../middlewares/transition-middleware';
import routes from 'app/routes';
import root from './../reducers/index';

const createHistory = process.env.RUNTIME_ENV === 'client'
                      ? require('history/lib/createBrowserHistory')
                      : require('history/lib/createMemoryHistory');
let finalCreateStore;

if (process.env.NODE_ENV === 'development' && !process.env.SERVER_RENDERING) {
  const logger = require('redux-logger')({ level: 'info' });
  const devTools = require('redux-devtools').devTools();

  finalCreateStore = compose(
    applyMiddleware(
      logger,
      thunkMiddleware
    ),
    reduxReactRouter({ routes, createHistory }),
    devTools
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware
    ),
    reduxReactRouter({ routes, createHistory })
  )(createStore);
}

export default function configureStore(initialState = {}) {
  return finalCreateStore(root, initialState);
}
