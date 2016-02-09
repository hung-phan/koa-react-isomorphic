import React from 'react';

export default function (callback) {
  return ComposedComponent => class extends ComposedComponent {
    static reduxAsyncConnect() {
      return callback(...arguments);
    }

    render() {
      return (
        <ComposedComponent { ...this.props } />
      );
    }
  };
}
