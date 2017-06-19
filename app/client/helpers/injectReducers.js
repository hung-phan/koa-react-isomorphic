/* @flow */
import { combineReducers } from "redux-immutable";

export default (store: Object, reducers: Object): void => {
  store.reducers = {
    ...store.reducers,
    ...reducers
  };

  store.replaceReducer(combineReducers(store.reducers));
};
