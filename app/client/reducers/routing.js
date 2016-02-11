/* eslint new-cap: [0] */
import { UPDATE_LOCATION } from 'react-router-redux';
import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';

const initialState = fromJS({ location: undefined });

export default createReducer(initialState, {
  [UPDATE_LOCATION]: (state, { payload }) => state.set('location', fromJS(payload)),
});
