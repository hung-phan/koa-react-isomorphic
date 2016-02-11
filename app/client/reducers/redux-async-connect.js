/* eslint new-cap: [0] */
import {
  BEGIN_GLOBAL_LOAD,
  END_GLOBAL_LOAD,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  CLEAR,
} from 'redux-async-connect';
import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({ loaded: false });

export default createReducer(initialState, {
  [BEGIN_GLOBAL_LOAD]: (state) => state.set('loaded', false),
  [END_GLOBAL_LOAD]: (state) => state.set('loaded', true),
  [LOAD]: (state, { key }) => state.mergeIn(key, fromJS({ loading: true, loaded: false })),
  [LOAD_SUCCESS]: (state, { key, data }) => state.mergeIn(key, fromJS({ loading: false, loaded: true, data })),
  [LOAD_FAIL]: (state, { key, error }) => state.mergeIn(key, fromJS({ loading: false, loaded: false, error })),
  [CLEAR]: (state, { key }) => state.set(key, fromJS({ loading: false, loaded: false })),
});
