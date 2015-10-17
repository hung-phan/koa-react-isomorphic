import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import root from './../reducers/index';

let finalCreateStore;

if (process.env.NODE_ENV === 'development' && !process.env.SERVER_RENDERING) {
  const createLogger = require('redux-logger');
  const logger = createLogger({
    level: 'info'
  });

  finalCreateStore = compose(
    applyMiddleware(
      logger,
      thunkMiddleware
    ),
    require('redux-devtools').devTools()
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware
    )
  )(createStore);
}

export default function configureStore(initialState = {}) {
  return finalCreateStore(root, initialState);
}
