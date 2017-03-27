/* @flow */
import { provideHooks } from 'redial';

export default (hooks: { [key: string]: Function }): Function =>
  (ComposedComponent: ReactClass<any>): ReactClass<any> =>
    provideHooks(
      Object.keys(hooks).reduce(
        (obj: Object, key: string) => {
          obj[key] = (...args) => hooks[key](...args);
          return obj;
        },
        {}
      )
    )(ComposedComponent);
