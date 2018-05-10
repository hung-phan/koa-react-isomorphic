/* @flow */
/* global process */
import _ from "lodash";
import { fromJS } from "immutable";
import { applyMiddleware, compose, createStore } from "redux";
import { combineReducers } from "redux-immutable";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import injectReducers from "./helpers/injectReducers";
import reducers from "./createReducer";

const middlewares = [thunkMiddleware];
const enhancers = [];

// support for development
if (process.env.RUNTIME_ENV === "client") {
  if (process.env.NODE_ENV === "development") {
    middlewares.push(
      createLogger({
        level: "info",
        stateTransformer: state => state.toJS()
      })
    );
  }

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(global.__REDUX_DEVTOOLS_EXTENSION__());
  }
}

export default (initialState: Object = {}) => {
  // preserve state in SSR
  const newReducers = _.reduce(
    Object.keys(initialState),
    (prev, key) => {
      if (!(key in prev)) {
        prev[key] = _.constant(fromJS(initialState[key]));
      }

      return prev;
    },
    reducers
  );

  const store = createStore(
    combineReducers(newReducers),
    fromJS(initialState),
    compose(applyMiddleware(...middlewares), ...enhancers)
  );

  store.reducers = newReducers;

  // $FlowFixMe
  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./createReducer", () =>
      injectReducers(store, combineReducers(require("./createReducer").default))
    );
  }

  return store;
};
