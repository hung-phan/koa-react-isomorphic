import 'app/client/components/test-helpers/jsdom-support.js';

import { assert } from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'app/client/stores/index';
import ProviderMock from 'app/client/components/test-helpers/provider-mock';
import Todos from './todos';
import TodosHeader from './../todos/todos-header/todos-header';
import TodosAdd from './../todos/todos-add/todos-add';
import TodosBody from './../todos/todos-body/todos-body';

describe('Component: Todos', () => {
  const todos = [{ text: 'Todo 1', complete: false }];
  const store = configureStore({ todos });
  let component;

  beforeEach(() => {
    component = mount(
      <ProviderMock store={store}>
        <Todos />
      </ProviderMock>
    );
  });

  it(`should have static 'fetchData' method`, () => {
    assert.ok(Todos.fetchData);
    assert.isFunction(Todos.fetchData);
  });

  context('# Todos', () => {
    let todosComponent;

    beforeEach(() => {
      todosComponent = component.find(Todos).node;
    });

    it(`should have props 'todos'`, () => {
      assert.deepEqual(todosComponent.stateProps.todos.toJS(), todos);
    });

    it(`should have props 'actions.addTodo'`, () => {
      assert.ok(todosComponent.dispatchProps.actions.addTodo);
      assert.isFunction(todosComponent.dispatchProps.actions.addTodo);
    });

    it(`should have props 'actions.removeTodo'`, () => {
      assert.ok(todosComponent.dispatchProps.actions.removeTodo);
      assert.isFunction(todosComponent.dispatchProps.actions.removeTodo);
    });

    it(`should have props 'actions.completeTodo'`, () => {
      assert.ok(todosComponent.dispatchProps.actions.completeTodo);
      assert.isFunction(todosComponent.dispatchProps.actions.completeTodo);
    });
  });

  it(`should have 'TodosHeader' component`, () => {
    assert.ok(component.find(TodosHeader).node);
  });

  it(`should have 'TodosAdd' component`, () => {
    assert.ok(component.find(TodosAdd).node);
  });

  it(`should have 'TodosBody' component`, () => {
    assert.ok(component.find(TodosBody).node);
  });
});
