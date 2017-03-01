// @flow
import React from 'react';
import { provideHooks } from 'redial';
import mapValues from 'lodash/mapValues';

export const INJECT_PRELOAD_LINK_HOOK = 'INJECT_PRELOAD_LINK_HOOK';

export default (hooks: Object) => (ComposedComponent: ReactClass<*>) =>
  provideHooks(
    mapValues(hooks, callback => (...args) => callback(...args))
  )(ComposedComponent);
