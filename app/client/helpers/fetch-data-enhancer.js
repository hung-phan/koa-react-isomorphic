import React from 'react';
import { provideHooks } from 'redial';

export default (callback) => (ComposedComponent) =>
  provideHooks({
    fetchData(...args) {
      return callback(...args);
    },
  })(
    props => <ComposedComponent {...props} />
  );
