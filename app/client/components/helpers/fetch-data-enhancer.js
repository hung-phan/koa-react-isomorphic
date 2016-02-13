import React from 'react';
import { provideHooks } from 'redial';

/* eslint-disable */
export default function (callback) {
  return ComposedComponent => {
    class FetchDataEnhancer extends ComposedComponent {
      render() {
        return (
          <ComposedComponent { ...this.props } />
        );
      }
    }

    return provideHooks({
      fetchData() {
        return callback(...arguments);
      },
    })(FetchDataEnhancer);
  };
}
