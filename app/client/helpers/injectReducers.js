/* @flow */
import { combineReducers } from 'redux';

export default (store: Object, reducers: Object) => {
  store.reducers = {
    ...store.reducers,
    ...reducers,
  };

  store.replaceReducer(combineReducers(store.reducers));
};
