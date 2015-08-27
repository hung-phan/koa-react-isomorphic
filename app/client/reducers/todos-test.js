import { assert } from 'chai';
import reducer from './todos';
import {
  addTodo,
  removeTodo,
  completeTodo
} from './../actions/todos';

describe('Todo reducer', () => {
  it('should return the default state for reducer', () => {
    assert.deepEqual(reducer([], {
      type: 'ANOTHER_ACTION',
      random: 'random value'
    }), []);
  });

  it('should return todos list with one todo', () => {
    assert.deepEqual(reducer([], addTodo('do chore')), [
      {
        text: 'do chore',
        complete: false
      }
    ]);
  });

  it('should return empty todos list', () => {
    assert.deepEqual(reducer([
      {
        text: 'do chore',
        complete: false
      }
    ], removeTodo(0)), []);
  });

  it('should return todos list with one completed todo', () => {
    assert.deepEqual(reducer([
      {
        text: 'do chore',
        complete: false
      }
    ], completeTodo(0)), [
      {
        text: 'do chore',
        complete: true
      }
    ]);
  });
});
