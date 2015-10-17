import 'app/client/components/helpers/jsdom-support.js';

import { assert } from 'chai';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import wrapStateless from './../../helpers/stateless-wrapper';
import TodosBody from './todos-body';
import { noop } from 'node-noop';

describe('Component: TodosBody', () => {
  const todos = [
    { text: 'Todo 1', complete: false },
    { text: 'Todo 2', complete: false },
    { text: 'Todo 3', complete: false },
    { text: 'Todo 4', complete: false }
  ];

  it('should be a function', () => {
    assert.ok(TodosBody);
    assert.isFunction(TodosBody);
  });

  it('should display a list of todos', () => {
    const component = TestUtils.renderIntoDocument(
      <TodosBody todos={todos} removeTodo={noop} completeTodo={noop} />
    );
    const trComponents = TestUtils.scryRenderedDOMComponentsWithTag(component, 'tr');

    assert.lengthOf(trComponents, todos.length);
  });

  it("should call 'removeTodo' when click on the delete button", () => {
    const removeTodo = sinon.spy();
    const component = TestUtils.renderIntoDocument(
      <TodosBody todos={todos} removeTodo={removeTodo} completeTodo={noop} />
    );
    const trComponents = TestUtils.scryRenderedDOMComponentsWithTag(component, 'tr');

    trComponents.forEach((tr, index) => {
      const removeButton = tr.querySelector('.btn-danger');
      TestUtils.Simulate.click(removeButton);

      assert.ok(removeButton);
      assert(removeTodo.called);
      assert(removeTodo.calledWith(index));
    });
    assert.equal(removeTodo.callCount, todos.length);
  });

  it("should call 'completeTodo' when click on the complete button", () => {
    const completeTodo = sinon.spy();
    const component = TestUtils.renderIntoDocument(
      <TodosBody todos={todos} removeTodo={noop} completeTodo={completeTodo} />
    );
    const trComponents = TestUtils.scryRenderedDOMComponentsWithTag(component, 'tr');
    trComponents.forEach((tr, index) => {
      const completeButton = tr.querySelector('.btn-success');
      TestUtils.Simulate.click(completeButton);

      assert.ok(completeButton);
      assert(completeTodo.called);
      assert(completeTodo.calledWith(index));
    });
    assert.equal(completeTodo.callCount, todos.length);
  });
});
