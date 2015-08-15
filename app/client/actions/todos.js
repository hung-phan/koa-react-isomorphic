'use strict';

export const ADD_TODO = 'ADD_TODO';

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    todo
  };
}

export const REMOVE_TODO = 'REMOVE_TODO';

export function removeTodo(index) {
  return {
    type: REMOVE_TODO,
    index
  };
}

export const COMPLETE_TODO = 'COMPLETE_TODO';

export function completeTodo(index) {
  return {
    type: COMPLETE_TODO,
    index
  };
}
