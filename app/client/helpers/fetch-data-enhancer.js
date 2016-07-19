// @flow
import React from 'react';
import { provideHooks } from 'redial';

export default (callback: Function) => (ComposedComponent: ReactClass<*>) =>
  provideHooks({
    fetchData(...args) {
      return callback(...args);
    },
  })(
    props => <ComposedComponent {...props} />
  );
