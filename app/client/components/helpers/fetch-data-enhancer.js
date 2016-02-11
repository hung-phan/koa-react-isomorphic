import React from 'react';

/* eslint-disable */
export default function (callback) {
  return ComposedComponent => class extends ComposedComponent {
    static reduxAsyncConnect(params, store, helpers) {
      if (!store.getState().toJS().reduxAsyncConnect.loaded) {
        return callback(params, store, helpers);
      }
    }

    render() {
      return (
        <ComposedComponent { ...this.props } />
      );
    }
  };
}
