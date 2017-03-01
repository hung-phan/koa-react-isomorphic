// @flow
import { provideHooks } from 'redial';
import mapValues from 'lodash/mapValues';

export const FETCH_DATA_HOOK = 'FETCH_DATA_HOOK';
export const INJECT_PRELOAD_LINK_HOOK = 'INJECT_PRELOAD_LINK_HOOK';

export default (hooks: Object) => (ComposedComponent: ReactClass<*>) =>
  provideHooks(
    mapValues(hooks, callback => (...args) => callback(...args))
  )(ComposedComponent);
