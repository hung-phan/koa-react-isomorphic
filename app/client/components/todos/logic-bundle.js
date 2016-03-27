import fetch from 'isomorphic-fetch';
import { List, fromJS } from 'immutable';
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

const initialState = List(); // eslint-disable-line new-cap

export default handleActions({
  [ADD_TODO]: (state, { payload: text }) => state.push(
    fromJS({ text, complete: false })
  ),
  [REMOVE_TODO]: (state, { payload: index }) => state.delete(index),
  [COMPLETE_TODO]: (state, { payload: index }) => state.updateIn(
    [index, 'complete'], () => !state.getIn([index, 'complete'])
  ),
  [SET_TODOS]: (state, { payload: todos }) => fromJS(todos),
}, initialState);
