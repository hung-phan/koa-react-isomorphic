/* @flow */
export default (store: Object, reducers: Object): void => {
  store.attachReducers(reducers);
};
