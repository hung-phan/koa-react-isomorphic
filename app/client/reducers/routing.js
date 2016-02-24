/* eslint new-cap: [0] */
import { LOCATION_CHANGE } from 'react-router-redux';
import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';

const initialState = fromJS({ location: undefined });

export default createReducer(initialState, {
  [LOCATION_CHANGE]: (state, { payload }) => state.set('locationBeforeTransitions', fromJS(payload)),
});
