import { assert } from 'chai';
import {
  addTodo,
  removeTodo,
  completeTodo,
  setTodos,
  fetchTodos
} from './todos';

describe('Action: Todos', () => {
  it("should define 'addTodo' function", () => {
    assert.ok(addTodo);
    assert.isFunction(addTodo);
  });

  it("should define 'removeTodo' function", () => {
    assert.ok(removeTodo);
    assert.isFunction(removeTodo);
  });

  it("should define 'completeTodo' function", () => {
    assert.ok(completeTodo);
    assert.isFunction(completeTodo);
  });

  it("should define 'setTodos' function", () => {
    assert.ok(setTodos);
    assert.isFunction(setTodos);
  });

  it("should define 'fetchTodos' function", () => {
    assert.ok(fetchTodos);
    assert.isFunction(fetchTodos);
  });

  it("should return action when calls 'addTodo' with 'do chore'", () => {
    assert.deepEqual(addTodo('do chore'), {
      type: 'ADD_TODO',
      text: 'do chore'
    });
  });

  it("should return action when calls 'removeTodo' with 1", () => {
    const index = 1;
    assert.deepEqual(removeTodo(index), {
      type: 'REMOVE_TODO',
      index
    });
  });

  it("should return action when calls 'completeTodo' with 1", () => {
    const index = 1;
    assert.deepEqual(completeTodo(index), {
      type: 'COMPLETE_TODO',
      index
    });
  });

  it("should return action when calls 'setTodos' with todos list", () => {
    const todos = [{ text: 'do chore', complete: false }];

    assert.deepEqual(setTodos(todos), {
      type: 'SET_TODOS',
      todos
    });
  });

  it("should return a function when calls 'fetchTodos'", () => {
    assert.ok(fetchTodos);
  });
});
