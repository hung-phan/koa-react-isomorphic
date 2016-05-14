import { assert } from 'chai';
import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import faker from 'faker';
import { TodosAdd } from './index';

describe('Component: TodosAdd', () => {
  let viewer;
  let component;
  let Relay;
  let relay;
  let AddTodoMutation;
  let randomUUID;

  beforeEach(() => {
    randomUUID = faker.random.uuid();
    Relay = {
      Store: {
        commitUpdate: sinon.spy(),
      },
    };
    relay = { setVariables: sinon.spy() };
    AddTodoMutation = sinon.stub();
    AddTodoMutation.returns({ randomUUID });
    viewer = { numberOfTodos: 100 };

    TodosAdd.__Rewire__('Relay', Relay);
    component = mount(<TodosAdd viewer={viewer} relay={relay} />);
  });

  afterEach(() => {
    TodosAdd.__ResetDependency__('Relay');
  });

  it(`should define default value for 'state.todo'`, () => {
    assert.equal(component.state().todo, '');
  });

  context(`# click on 'Add Todo' button`, () => {
    let button;

    beforeEach(() => {
      TodosAdd.__Rewire__('AddTodoMutation', AddTodoMutation);
      component.setState({ todo: randomUUID });

      button = component.find('button');
      button.simulate('click');
    });

    afterEach(() => {
      TodosAdd.__ResetDependency__('AddTodoMutation');
    });

    it(`should call 'AddTodoMutation' with 'viewer', and 'text'`, () => {
      sinon.assert.calledWith(AddTodoMutation, { viewer, text: randomUUID });
    });

    it(`should call 'Relay.Store.commitUpdate' with 'AddTodoMutation'`, () => {
      sinon.assert.calledWith(Relay.Store.commitUpdate, { randomUUID });
    });

    it(`should reset 'state.todo'`, () => {
      assert.equal(component.state().todo, '');
    });
  });
});
