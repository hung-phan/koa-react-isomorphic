import React from 'react';

export default function(fetchDataFunc) {
  return (ComposedComponent) => class extends ComposedComponent {
    static fetchData() {
      return fetchDataFunc(...arguments);
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  };
}
