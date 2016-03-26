import { fromJS, is } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { assert } from 'chai';
import reducer from './routing';

describe('Reducer: Routing', () => {
  it('should be a function', () => {
    assert.ok(reducer);
    assert.isFunction(reducer);
  });

  it('should return the default state', () => {
    assert(is(
      reducer(fromJS({ location: undefined }), { type: 'ANOTHER_ACTION', random: 'random value' }),
      fromJS({ location: undefined })
    ));
  });

  it("should update location when calls 'LOCATION_CHANGE' action", () => {
    assert(is(
      reducer(fromJS({ locationBeforeTransitions: undefined }), { type: LOCATION_CHANGE, payload: { data: 1 } }),
      fromJS({ locationBeforeTransitions: { data: 1 } })
    ));
  });
});
