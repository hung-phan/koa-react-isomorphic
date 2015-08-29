import React from 'react';

export default function(callback) {
  return ComposedComponent => class extends ComposedComponent {
    static fetchData() {
      return callback(...arguments);
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
}
