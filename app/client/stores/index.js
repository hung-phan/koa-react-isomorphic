'use strict';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware                                            from 'redux-thunk';
import loggerMiddleware                                           from 'redux-logger';
import root                                                       from './../reducers/index';

let finalCreateStore;

if (process.env.NODE_ENV === 'development') {
  finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ),
    require('redux-devtools').devTools(),
    createStore
  );
} else {
  finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware
    ),
    createStore
  );
}

export default function configureStore(initialState = {}) {
  return finalCreateStore(root, initialState);
}
