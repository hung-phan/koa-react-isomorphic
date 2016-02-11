import React from 'react';

export default function (callback) {
  return ComposedComponent => class extends ComposedComponent {
    static reduxAsyncConnect(params, store, helpers) {
      if (!store.getState().reduxAsyncConnect.loaded) {
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
