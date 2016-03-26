import fetch from 'isomorphic-fetch';
import { createAction, handleActions } from 'redux-actions';
import getUrl from 'client/helpers/get-url';

export const ADD_TODO = 'todos/ADD_TODO';
export const REMOVE_TODO = 'todos/REMOVE_TODO';
export const COMPLETE_TODO = 'todos/COMPLETE_TODO';
export const SET_TODOS = 'todos/SET_TODOS';

export const addTodo = createAction(ADD_TODO);
export const removeTodo = createAction(REMOVE_TODO);
export const completeTodo = createAction(COMPLETE_TODO);
export const setTodos = createAction(SET_TODOS);

export const fetchTodos = () => dispatch =>
  fetch(getUrl('/api/v1/todos'))
    .then(res => res.json())
    .then(res => dispatch(setTodos(res)));

const initialState = [];

export default handleActions({
  [ADD_TODO]: (state, { payload: text }) => [
    ...state, { text, complete: false },
  ],
  [REMOVE_TODO]: (state, { payload: index }) => [
    ...state.slice(0, index),
    ...state.slice(index + 1),
  ],
  [COMPLETE_TODO]: (state, { payload: index }) => [
    ...state.slice(0, index),
    { ...state[index], complete: !state[index].complete },
    ...state.slice(index + 1),
  ],
  [SET_TODOS]: (state, { payload: todos }) => todos,
}, initialState);
