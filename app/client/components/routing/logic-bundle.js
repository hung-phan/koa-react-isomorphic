import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'react-router-redux';
import globalizeSelectors from 'client/helpers/globalize-selectors';

export const mountPoint = 'routing';

export const selectors = globalizeSelectors({
  selectLocationState: (state) => state.get('object'),
}, mountPoint);

export default handleActions({
  [LOCATION_CHANGE]: (state, { payload }) => state.set('object', {
    locationBeforeTransitions: payload,
  }),
}, new Map({
  object: { locationBeforeTransitions: null },
}));
