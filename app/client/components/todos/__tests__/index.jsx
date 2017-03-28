import { assert } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { Todos } from '../index';
import TodosHeader from '../TodosHeader';
import TodosAdd from '../TodosAdd';
import TodosBody from '../TodosBody';

describe('Component: Todos', () => {
  const viewer = {
    todos: {
      edges: [
        {
          node: {
            id: 1,
            text: 'Todo 1',
            complete: false,
          },
        },
      ],
    },
    numberOfTodos: 10,
  };
  const relay = {};
  let component;

  beforeEach(() => {
    component = shallow(<Todos viewer={viewer} relay={relay} />);
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
