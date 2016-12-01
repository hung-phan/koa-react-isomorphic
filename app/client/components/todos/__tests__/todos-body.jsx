import { assert } from 'chai';
import { fromJS } from 'immutable';
import td from 'testdouble';
import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';
import TodosBody from './../todos-body';

describe('Component: TodosBody', () => {
  const todos = [
    { text: 'Todo 1', complete: false },
    { text: 'Todo 2', complete: false },
    { text: 'Todo 3', complete: false },
    { text: 'Todo 4', complete: false },
  ];

  it('should display a list of todos', () => {
    const component = mount(
      <TodosBody todos={fromJS(todos)} removeTodo={noop} completeTodo={noop} />
    );
    const trComponents = component.find('tr');

    assert.lengthOf(trComponents, todos.length);
  });

  it('should call "removeTodo" when click on the delete button', () => {
    const removeTodo = td.function();
    const component = mount(
      <TodosBody todos={fromJS(todos)} removeTodo={removeTodo} completeTodo={noop} />
    );
    const trComponents = component.find('tr');

    trComponents.forEach((tr, index) => {
      const removeButton = tr.find('.btn-danger');
      removeButton.simulate('click');

      assert.ok(removeButton);
      td.verify(removeTodo(index, td.matchers.anything()));
    });
    assert.equal(td.explain(removeTodo).callCount, todos.length);
  });

  it('should call "completeTodo" when click on the complete button', () => {
    const completeTodo = td.function();
    const component = mount(
      <TodosBody todos={fromJS(todos)} removeTodo={noop} completeTodo={completeTodo} />
    );
    const trComponents = component.find('tr');

    trComponents.forEach((tr, index) => {
      const completeButton = tr.find('.btn-success');
      completeButton.simulate('click');

      assert.ok(completeButton);
      td.verify(completeTodo(index, td.matchers.anything()));
    });
    assert.equal(td.explain(completeTodo).callCount, todos.length);
  });
});
