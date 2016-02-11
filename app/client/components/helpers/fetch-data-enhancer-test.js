import sinon from 'sinon';
import faker from 'faker';
import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import mockingComponent from 'app/client/components/test-helpers/mocking-component';
import Provider from 'app/client/components/test-helpers/provider-mock';
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

  context('# component', () => {
    let Component;
    let component;
    let store;

    beforeEach(() => {
      Component = fetchDataEnhancer(callback)(Handler);
      store = { data: faker.random.uuid() };
      component = mount(
        <Provider store={ store }>
          <Component message='Hello world' />
        </Provider>
      );
    });

    it(`should define static 'reduxAsyncConnect'`, () => {
      assert.ok(Component.reduxAsyncConnect);
      assert.isFunction(Component.reduxAsyncConnect);
    });

    it('should render message', () => {
      assert.include(component.text(), 'Hello world');
    });
  });
});
