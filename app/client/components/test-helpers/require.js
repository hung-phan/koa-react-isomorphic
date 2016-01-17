import _ from 'lodash';

export default function(fakeRequire, fakeDeps, module) {
  _.forEach(fakeDeps, (value, key) =>
    fakeRequire.subvert(key, value)
  );

  return fakeRequire.require(module);
}
