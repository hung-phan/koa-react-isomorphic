import get from 'lodash/get';

const fromRoot = (path, selector) => (state, ...args) => selector(get(state, path), ...args);

export default (selectors, path) =>
  Object.keys(selectors).reduce(
    (final, key) => ({ ...final, [key]: fromRoot(path, selectors[key]) }),
    {}
  );
