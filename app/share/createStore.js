/* @flow */
/* global process */
import { fromJS } from "immutable";
import { applyMiddleware, compose } from "redux";
import { combineReducers } from "redux-immutable";
import { createStore } from "redux-dynamic-reducer";
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
  const store = createStore(
    combineReducers(reducers),
    fromJS(initialState),
    compose(applyMiddleware(...middlewares), ...enhancers)
  );

  // $FlowFixMe
  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./createReducer", () =>
      injectReducers(store, combineReducers(require("./createReducer").default))
    );
  }

  return store;
};
