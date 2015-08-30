import 'app/client/components/helpers/jsdom-support.js';

import { assert }        from 'chai';
import React, { addons } from 'react/addons';
import configureStore    from 'app/client/stores/index';
import ProviderMock      from 'app/client/components/helpers/provider-mock';
import Todos             from './todos';

describe('Component: Todos', () => {
  const { TestUtils } = addons;
  const todos = [{ text: 'Todo 1', complete: false }];
  const store = configureStore({ todos });
  let Component;

  beforeEach(() => {
    Component = (
      <ProviderMock store={store}>
        {() => <Todos />}
      </ProviderMock>
    );
  });

  it('should be defined', () => {
    assert.ok(Todos);
    assert.isFunction(Todos);
  });

  it("should render 'Todos' component", () => {
    const component = TestUtils.renderIntoDocument(Component);
    assert.ok(component);
  });

  it("should have title 'Todos List'", () => {
    const component = TestUtils.renderIntoDocument(Component);
    const innerHTML = React.findDOMNode(component).innerHTML;

    assert.include(innerHTML, 'Todos List');
  });

  it("should have static 'fetchData' method", () => {
    assert.ok(Todos.fetchData);
    assert.isFunction(Todos.fetchData);
  });

  it("should have props 'todos' and 'dispatch' after rendering", () => {
    const component = TestUtils.renderIntoDocument(Component);
    const todosComponent = TestUtils.findRenderedComponentWithType(component, Todos);

    // mocking redux object
    assert.property(todosComponent.state.stateProps, 'todos');
    assert.propertyVal(todosComponent.state.stateProps, 'todos', todos);
    assert.property(todosComponent.state.dispatchProps, 'dispatch');
  });
});
