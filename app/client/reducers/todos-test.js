import { fromJS, is } from 'immutable';
import { assert } from 'chai';
import reducer from './todos';
import {
  addTodo,
  removeTodo,
  completeTodo,
  setTodos,
} from './../actions/todos';

describe('Reducer: Todos', () => {
  it('should be a fucntion', () => {
    assert.ok(reducer);
    assert.isFunction(reducer);
  });

  it('should return the default state', () => {
    assert(is(
      reducer([], { type: 'ANOTHER_ACTION', random: 'random value' }),
      fromJS([])
    ));
  });

  it("should return a todos list with 1 todo item when calls 'addTodo' action", () => {
    assert(is(
      reducer([], addTodo('do chore')),
      fromJS([{ text: 'do chore', complete: false }])
    ));
  });

  it("should return an empty todos list when calls 'removeTodo' action", () => {
    assert(is(
      reducer([{ text: 'do chore', complete: false }], removeTodo(0)),
      fromJS([])
    ));
  });

  it("should return an todos list when calls 'setTodos' action", () => {
    assert(is(
      reducer([], setTodos([{ text: 'do chore', complete: false }])),
      fromJS([{ text: 'do chore', complete: false }])
    ));
  });

  it("should return a todos list with 1 completed todo when calls 'completeTodo' action", () => {
    assert(is(
      reducer([{ text: 'do chore', complete: false }], completeTodo(0)),
      fromJS([{ text: 'do chore', complete: true }])
    ));

    assert(is(
      reducer([{ text: 'do chore', complete: true }], completeTodo(0)),
      fromJS([{ text: 'do chore', complete: false }])
    ));
  });
});
