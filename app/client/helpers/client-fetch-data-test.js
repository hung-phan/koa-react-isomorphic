import { assert } from 'chai';
import sinon from 'sinon';

describe('Helper: clientFetchData', () => {
  const requireSubvert = require('require-subvert')(__dirname);
  let stub;

  beforeEach(() => {
    stub = sinon.stub();
    requireSubvert.subvert('./fetch-data', stub);
  });

  afterEach(() => {
    requireSubvert.cleanUp();
  });

  it('should call fetchData function only once', () => {
    const clientFetchData = requireSubvert.require('./client-fetch-data');
    const dummyStore = { key: 'value' };
    const dummyRouterState = { path: '/' };

    clientFetchData(dummyStore, dummyRouterState);
    clientFetchData(dummyStore, dummyRouterState);

    assert(stub.called);
    assert(stub.callCount === 1);
  });
});
