/* @flow */
import { provideHooks } from "redial";

export default (hooks: { [key: string]: Function }): Function => (
  ComposedComponent: React$Component<Object>
): React$Component<Object> =>
  provideHooks(
    Object.keys(hooks).reduce((obj: Object, key: string) => {
      obj[key] = (...args) => hooks[key](...args);
      return obj;
    }, {})
  )(ComposedComponent);
