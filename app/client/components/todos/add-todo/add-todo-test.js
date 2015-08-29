import 'app/client/components/helpers/jsdom-support.js';

import { assert }        from 'chai';
import sinon             from 'sinon';
import React, { addons } from 'react/addons';
import stubRouterContext from 'app/client/components/helpers/stub-router-context';
import AddTodo           from './add-todo';

describe('Component: AddTodo', () => {
  const { TestUtils } = addons;

  it('should be defined', () => {
    const component = TestUtils.renderIntoDocument(<AddTodo />);

    assert.ok(component);
  });

  it('should define state.todo', () => {
    const component = TestUtils.renderIntoDocument(<AddTodo />);

    assert.equal(component.state.todo, '');
  });

  it("should call the addTodo action when click on the 'Add Todo' button", () => {
    const callback = sinon.spy();
    const component = TestUtils.renderIntoDocument(<AddTodo addTodo={callback} />);
    const input = React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(component, 'input'));
    const button = React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(component, 'button'));

    input.value = 'do chore';
    TestUtils.Simulate.change(input);
    assert.equal(component.state.todo, 'do chore');

    TestUtils.Simulate.click(button);
    assert(callback.called);
    assert(callback.calledWith('do chore'));
    assert.equal(component.state.todo, '');
  });
});
