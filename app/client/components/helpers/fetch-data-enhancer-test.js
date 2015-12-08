import 'app/client/components/test-helpers/jsdom-support.js';

import sinon from 'sinon';
import React from 'react';
import { noop } from 'node-noop';
import { assert } from 'chai';
import { mount } from 'enzyme';
import mockingComponent from 'app/client/components/test-helpers/mocking-component';
import fetchDataEnhancer from './fetch-data-enhancer';

describe('Helper: fetchDataEnhancer', () => {
  let Handler;
  let callback;

  beforeEach(() => {
    Handler = mockingComponent('Handler', ['message']);
    callback = sinon.spy();
  });

  it('should be a function', () => {
    assert.ok(fetchDataEnhancer);
    assert.isFunction(fetchDataEnhancer);
  });

  it(`should define a static 'fetchData' method on ComposedComponent`, () => {
    assert.property(fetchDataEnhancer(callback)(Handler), 'fetchData');
  });

  it('should pass all properties from parent component to the ComposedComponent', () => {
    const Component = fetchDataEnhancer(noop)(Handler);
    const component = mount(<Component message='Hello world' />);

    assert.include(component.text(), 'Hello world');
  });

  it(`should passing 'store', and 'params' to the 'fetchData' function`, () => {
    const fakeStore = { todos: [] };
    const fakeParams = { query: '/' };
    const Component = fetchDataEnhancer(callback)(Handler);

    Component.fetchData(fakeStore, fakeParams);

    assert(callback.called);
    assert(callback.calledWith(fakeStore, fakeParams));
  });
});
