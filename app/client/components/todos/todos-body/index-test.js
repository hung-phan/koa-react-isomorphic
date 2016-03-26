import _ from 'lodash';
import { assert } from 'chai';
import sinon from 'sinon';
import faker from 'faker';
import React from 'react';
import { mount } from 'enzyme';
import TodosBody from './index';

describe('Component: TodosBody', () => {
  const viewer = {
    todos: {
      edges: _(4).range().map((value) => ({
        node: {
          id: value,
          text: `Todo ${ value + 1}`,
          complete: false,
        },
      })).value(),
    },
  };
  let Relay;
  let component;
  let randomUUID;

  beforeEach(() => {
    randomUUID = faker.random.uuid();
    component = mount(
      <TodosBody viewer={viewer} />
    );
    Relay = {
      Store: {
        commitUpdate: sinon.spy(),
      },
    };
    TodosBody.__Rewire__('Relay', Relay);
  });

  afterEach(() => {
    TodosBody.__ResetDependency__('Relay');
  });

  it('should display a list of todos', () => {
    const trComponents = component.find('tr');
    assert.lengthOf(trComponents, viewer.todos.edges.length);
  });

  context('# when click on delete button', () => {
    let RemoveTodoMutation;

    beforeEach(() => {
      RemoveTodoMutation = sinon.stub();
      RemoveTodoMutation.returns({ randomUUID });
      TodosBody.__Rewire__('RemoveTodoMutation', RemoveTodoMutation);
    });

    afterEach(() => {
      TodosBody.__ResetDependency__('RemoveTodoMutation');
    });

    it(`should call 'removeTodo'`, () => {
      const trComponents = component.find('tr');

      trComponents.forEach((tr) => {
        const removeButton = tr.find('.btn-danger');
        removeButton.simulate('click');

        assert.ok(removeButton);
        sinon.assert.calledWith(Relay.Store.commitUpdate, { randomUUID });
      });
      assert.equal(Relay.Store.commitUpdate.callCount, viewer.todos.edges.length);
    });
  });

  context('# when click on complete button', () => {
    let CompleteTodoMutation;

    beforeEach(() => {
      CompleteTodoMutation = sinon.stub();
      CompleteTodoMutation.returns({ randomUUID });
      TodosBody.__Rewire__('CompleteTodoMutation', CompleteTodoMutation);
    });

    afterEach(() => {
      TodosBody.__ResetDependency__('CompleteTodoMutation');
    });

    it(`should call 'completeTodo'`, () => {
      const trComponents = component.find('tr');

      trComponents.forEach((tr) => {
        const completeButton = tr.find('.btn-success');
        completeButton.simulate('click');

        assert.ok(completeButton);
        sinon.assert.calledWith(Relay.Store.commitUpdate, { randomUUID });
      });
      assert.equal(Relay.Store.commitUpdate.callCount, viewer.todos.edges.length);
    });
  });
});
