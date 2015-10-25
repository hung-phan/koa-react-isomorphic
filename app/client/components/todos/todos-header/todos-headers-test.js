import 'app/client/components/helpers/jsdom-support.js';

import { assert } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TodosHeader from './todos-header';

describe('Component: TodosHeader', () => {
  it('should be a function', () => {
    assert.ok(TodosHeader);
    assert.isFunction(TodosHeader);
  });

  it("should render 'TodosHeader' component", () => {
    const component = TestUtils.renderIntoDocument(<TodosHeader />);
    assert.ok(component);
  });

  it("should have title 'Todos List'", () => {
    const component = TestUtils.renderIntoDocument(<TodosHeader />);
    const innerHTML = ReactDOM.findDOMNode(component).innerHTML;

    assert.include(innerHTML, 'Todos List');
  });
});
