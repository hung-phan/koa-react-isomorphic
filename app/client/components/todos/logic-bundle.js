// @flow
import fetch from 'isomorphic-fetch';
import { List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import getUrl from 'client/helpers/get-url';
import type { Todo } from './types';

export const ADD_TODO = 'todos/ADD_TODO';
export const REMOVE_TODO = 'todos/REMOVE_TODO';
export const COMPLETE_TODO = 'todos/COMPLETE_TODO';
export const SET_TODOS = 'todos/SET_TODOS';

export type AddTodoAction = (text: string) => { payload: string };
export type RemoveTodoAction = (index: number) => { payload: number };
export type CompleteTodoAction = (index: number) => { payload: number };
export type SetTodosAction = (todos: Todo[]) => { payload: Todo[] };

export const addTodo: AddTodoAction = createAction(ADD_TODO);
export const removeTodo: RemoveTodoAction = createAction(REMOVE_TODO);
export const completeTodo: CompleteTodoAction = createAction(COMPLETE_TODO);
export const setTodos: SetTodosAction = createAction(SET_TODOS);
export const fetchTodos = () => (dispatch: Function): Promise<Todo[]> =>
  fetch(getUrl('/api/v1/todos'))
    .then(res => res.json())
    .then((res: Todo[]) => dispatch(setTodos(res)));

export default handleActions({
  [ADD_TODO]: (state, { payload: text }) => state.push(
    fromJS({ text, complete: false })
  ),
  [REMOVE_TODO]: (state, { payload: index }) => state.delete(index),
  [COMPLETE_TODO]: (state, { payload: index }) => state.updateIn(
    [index, 'complete'], () => !state.getIn([index, 'complete'])
  ),
  [SET_TODOS]: (state, { payload: todos }) => fromJS(todos),
}, new List());
