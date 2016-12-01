import td from 'testdouble';
import faker from 'faker';
import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import propName from 'redial/lib/propName';
import mockingComponent from './../../test-helpers/mocking-component';
import Provider from './../../test-helpers/provider-mock';
import fetchDataEnhancer from './../fetch-data-enhancer';

describe('Helper: fetchDataEnhancer', () => {
  let Handler;
  let callback;

  beforeEach(() => {
    Handler = mockingComponent('Handler', ['message']);
    callback = td.function();
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
        <Provider store={store}>
          <Component message="Hello world" />
        </Provider>
      );
    });

    it(`should define static "${propName}.fetchData"`, () => {
      assert.ok(Component[propName].fetchData);
      assert.isFunction(Component[propName].fetchData);
    });

    it('should call the "callback" function with arguments', () => {
      const args = [
        faker.random.uuid(),
        faker.random.uuid(),
        faker.random.uuid(),
        faker.random.uuid(),
      ];

      Component[propName].fetchData(...args);

      td.verify(callback(...args));
    });

    it('should render message', () => {
      assert.include(component.text(), 'Hello world');
    });
  });
});
