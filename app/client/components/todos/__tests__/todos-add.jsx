import { assert } from 'chai';
import td from 'testdouble';
import React from 'react';
import { mount } from 'enzyme';
import { TodosAdd } from './../todos-add';

describe('Component: TodosAdd', () => {
  it('should define state.todo', () => {
    const component = mount(<TodosAdd />);

    assert.equal(component.state().todo, '');
  });

  it('should call the addTodo action when click on the "Add Todo" button', () => {
    const callback = td.function();
    const component = mount(<TodosAdd addTodo={callback} />);
    const input = component.find('input');
    const button = component.find('button');

    input.node.value = 'do chore';
    input.simulate('change');
    assert.equal(component.state().todo, 'do chore');

    button.simulate('click');
    td.verify(callback('do chore'));
    assert.equal(component.state().todo, '');
  });
});
