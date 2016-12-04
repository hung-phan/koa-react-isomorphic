const fromRoot = (path, selector) => (state, ...args) => selector(state.get(path), ...args);

export default (selectors, path) =>
  Object.keys(selectors).reduce(
    (final, key) => ({ ...final, [key]: fromRoot(path, selectors[key]) }),
    {}
  );
