import fetch from 'isomorphic-fetch';
import getUrl from './../helpers/get-url';

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

export const SET_TODOS = 'SET_TODOS';
export function setTodos(todos) {
  return {
    type: SET_TODOS,
    todos
  };
}

export const FETCH_TODOS = 'FETCH_TODOS';
export function fetchTodos() {
  return dispatch => {
    return fetch(getUrl('/api/v1/todos'))
             .then(res => res.json())
             .then(res => dispatch(setTodos(res)));
  };
}
