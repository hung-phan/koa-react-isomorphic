import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter, ReduxRouter } from 'redux-router';
import thunkMiddleware from 'redux-thunk';
import transitionMiddleware from './../middlewares/transition-middleware';
import routes from 'app/routes';
import root from './../reducers/index';

let middlewares = [thunkMiddleware, transitionMiddleware];
let developmentMiddlewares = [];

if (process.env.NODE_ENV === 'development' && !process.env.SERVER_RENDERING) {
  const logger = require('redux-logger')({ level: 'info' });

  middlewares = [logger, ...middlewares];
  developmentMiddlewares = [require('redux-devtools').devTools()];
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
  return finalCreateStore(root, initialState);
}
