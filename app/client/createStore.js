/* @flow */
/* global process */
import { fromJS } from "immutable";
import { combineReducers } from "redux-immutable";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise";
import { createLogger } from "redux-logger";
import reducers from "./createReducer";

const middlewares = [thunkMiddleware, promiseMiddleware];
const enhancers = [];

// support for development
if (
  process.env.NODE_ENV === "development" && process.env.RUNTIME_ENV === "client"
) {
  const loggerMiddleware = createLogger({
    level: "info",
    stateTransformer: state => state.toJS()
  });

  middlewares.push(loggerMiddleware);
}

// support redux-devtools
if (process.env.RUNTIME_ENV === "client" && window.devToolsExtension) {
  enhancers.push(window.devToolsExtension());
}

export default (initialState: Object = {}) => {
  const store = createStore(
    combineReducers(reducers),
    fromJS(initialState),
    compose(applyMiddleware(...middlewares), ...enhancers)
  );

  // enable async reducers for each page load
  store.reducers = reducers;

  if (process.env.NODE_ENV === "development" && module.hot) {
    // $FlowFixMe
    module.hot.accept("./createReducer", () =>
      store.replaceReducer(require("./createReducer").default));
  }

  return store;
};
