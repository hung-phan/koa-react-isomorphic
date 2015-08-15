'use strict';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware                                   from 'redux-thunk';
import loggerMiddleware                                  from 'redux-logger';
import root                                              from './../reducers/index';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

export default function configureStore(initialState = {}) {
  return createStoreWithMiddleware(root, initialState);
}
