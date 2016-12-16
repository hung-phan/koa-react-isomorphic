// @flow
import fetch from 'isomorphic-fetch';
import { List, fromJS } from 'immutable';
import identity from 'lodash/identity';
import { createAction, handleActions } from 'redux-actions';
import getUrl from 'client/helpers/get-url';
import globalizeSelectors from 'client/helpers/globalize-selectors';
import type {
  TodoType,
  AddTodoActionType,
  RemoveTodoActionType,
  CompleteTodoActionType,
  SetTodosActionType,
} from './types';

export const mountPoint = 'todos';

export const selectors = globalizeSelectors({
  getTodos: identity,
}, mountPoint);

export const ADD_TODO = 'todos/ADD_TODO';
export const REMOVE_TODO = 'todos/REMOVE_TODO';
export const COMPLETE_TODO = 'todos/COMPLETE_TODO';
export const SET_TODOS = 'todos/SET_TODOS';

export const addTodo: AddTodoActionType = createAction(ADD_TODO);
export const removeTodo: RemoveTodoActionType = createAction(REMOVE_TODO);
export const completeTodo: CompleteTodoActionType = createAction(COMPLETE_TODO);
export const setTodos: SetTodosActionType = createAction(SET_TODOS);
export const fetchTodos = () => (dispatch: Function): Promise<TodoType[]> =>
  fetch(getUrl('/api/v1/todos'))
    .then(res => res.json())
    .then((res: TodoType[]) => dispatch(setTodos(res)));

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
