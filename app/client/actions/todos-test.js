import { assert } from 'chai';
import {
  addTodo,
  removeTodo,
  completeTodo
} from './todos';

describe('Todo actions', () => {
  it('should define addTodo', () => {
    assert.ok(addTodo);
  });

  it("should return action when calls addTodo with 'do chore'", () => {
    assert.deepEqual(addTodo('do chore'), {
      type: 'ADD_TODO',
      text: 'do chore'
    });
  });

  it('should define removeTodo', () => {
    assert.ok(removeTodo);
  });

  it("should return action when calls removeTodo with 1", () => {
    const index = 1;
    assert.deepEqual(removeTodo(index), {
      type: 'REMOVE_TODO',
      index
    });
  });

  it('should define completeTodo', () => {
    assert.ok(completeTodo);
  });

  it("should return action when calls completeTodo with 1", () => {
    const index = 1;
    assert.deepEqual(completeTodo(index), {
      type: 'COMPLETE_TODO',
      index
    });
  });
});
