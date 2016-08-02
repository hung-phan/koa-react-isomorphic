import { assert } from 'chai';
import { List } from 'immutable';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { Todos } from './index';
import TodosHeader from './todos-header';
import TodosAdd from './todos-add';
import TodosBody from './todos-body';

describe('Component: Todos', () => {
  const todos = List([ // eslint-disable-line new-cap
    { text: 'Todo 1', complete: false },
    { text: 'Todo 2', complete: false },
    { text: 'Todo 3', complete: false },
    { text: 'Todo 4', complete: false },
  ]);
  let actions;
  let component;

  beforeEach(() => {
    actions = {
      addTodo: sinon.spy(),
      removeTodo: sinon.spy(),
      completeTodo: sinon.spy(),
    };
    component = shallow(<Todos todos={todos} actions={actions} />);
  });

  it('should have "TodosHeader" component', () => {
    assert.ok(component.find(TodosHeader).node);
  });

  it('should have "TodosAdd" component', () => {
    assert.ok(component.find(TodosAdd).node);
  });

  it('should have "TodosBody" component', () => {
    assert.ok(component.find(TodosBody).node);
  });
});
