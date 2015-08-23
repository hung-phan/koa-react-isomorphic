export const ADD_TODO = 'ADD_TODO';

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text
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
