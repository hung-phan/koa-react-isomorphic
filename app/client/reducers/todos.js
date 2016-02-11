/* eslint new-cap: [0] */
import {
  ADD_TODO,
  REMOVE_TODO,
  COMPLETE_TODO,
  SET_TODOS,
} from './../actions/todos';
import { List, fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';

const initialState = List();

export default createReducer(initialState, {
  [ADD_TODO]: (state, { text }) => state.push(
    fromJS({ text, complete: false })
  ),
  [REMOVE_TODO]: (state, { index }) => state.delete(index),
  [COMPLETE_TODO]: (state, { index }) => state.updateIn(
    [index, 'complete'], () => !state.getIn([index, 'complete'])
  ),
  [SET_TODOS]: (state, { todos }) => fromJS(todos),
});
