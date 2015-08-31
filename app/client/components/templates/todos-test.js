import 'app/client/components/helpers/jsdom-support.js';

import { assert }        from 'chai';
import React, { addons } from 'react/addons';
import configureStore    from 'app/client/stores/index';
import ProviderMock      from 'app/client/components/helpers/provider-mock';
import Todos             from './todos';
import TodosHeader       from './../todos/todos-header/todos-header';
import TodosAdd          from './../todos/todos-add/todos-add';
import TodosBody         from './../todos/todos-body/todos-body';

describe('Component: Todos', () => {
  const { TestUtils } = addons;
  const todos = [{ text: 'Todo 1', complete: false }];
  const store = configureStore({ todos });
  let Component;
  let component;

  beforeEach(() => {
    Component = (
      <ProviderMock store={store}>
        {() => <Todos />}
      </ProviderMock>
    );
    component = TestUtils.renderIntoDocument(Component);
  });

  it('should be defined', () => {
    assert.ok(Todos);
    assert.isFunction(Todos);
  });

  it("should render 'Todos' component", () => {
    assert.ok(component);
  });

  it("should have static 'fetchData' method", () => {
    assert.ok(Todos.fetchData);
    assert.isFunction(Todos.fetchData);
  });

  it("should have props 'todos'", () => {
    const todosComponent = TestUtils.findRenderedComponentWithType(component, Todos);

    // mocking react-redux object
    assert.deepProperty(todosComponent, 'state.stateProps.todos');
    assert.deepPropertyVal(todosComponent, 'state.stateProps.todos', todos);
  });

  it("should have props 'actions.addTodo'", () => {
    const todosComponent = TestUtils.findRenderedComponentWithType(component, Todos);

    assert.deepProperty(todosComponent, 'state.dispatchProps.actions.addTodo');
  });

  it("should have props 'actions.removeTodo'", () => {
    const todosComponent = TestUtils.findRenderedComponentWithType(component, Todos);

    assert.deepProperty(todosComponent, 'state.dispatchProps.actions.removeTodo');
  });

  it("should have props 'actions.completeTodo'", () => {
    const todosComponent = TestUtils.findRenderedComponentWithType(component, Todos);

    assert.deepProperty(todosComponent, 'state.dispatchProps.actions.completeTodo');
  });

  it("should have 'TodosHeader' component", () => {
    const headerComponent = TestUtils.findRenderedComponentWithType(component, TodosHeader);

    assert.ok(headerComponent);
  });

  it("should have 'TodosAdd' component", () => {
    const todosAddComponent = TestUtils.findRenderedComponentWithType(component, TodosAdd);

    assert.ok(todosAddComponent);
  });

  it("should have 'TodosBody' component", () => {
    const todosBodyComponent = TestUtils.findRenderedComponentWithType(component, TodosBody);

    assert.ok(todosBodyComponent);
  });
});
