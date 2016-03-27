import sinon from 'sinon';
import faker from 'faker';
import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import mockingComponent from 'client/test-helpers/mocking-component';
import Provider from 'client/test-helpers/provider-mock';
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

    it(`should define static '__redial_handlers__.fetchData'`, () => {
      assert.ok(Component.__redial_handlers__.fetchData);
      assert.isFunction(Component.__redial_handlers__.fetchData);
    });

    it(`should call the 'callback' function with arguments`, () => {
      const args = [
        faker.random.uuid(),
        faker.random.uuid(),
        faker.random.uuid(),
        faker.random.uuid(),
      ];

      Component.__redial_handlers__.fetchData(...args);

      sinon.assert.calledWith(callback, ...args);
    });

    it('should render message', () => {
      assert.include(component.text(), 'Hello world');
    });
  });
});
