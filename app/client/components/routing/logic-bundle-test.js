import { Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { assert } from 'chai';
import reducer from './logic-bundle';

describe('Reducer: Routing', () => {
  it('should be a function', () => {
    assert.ok(reducer);
    assert.isFunction(reducer);
  });

  it('should return the default state', () => {
    assert.deepEqual(
      reducer(
        new Map({ object: { locationBeforeTransitions: null } }),
        { type: 'ANOTHER_ACTION', random: 'random value' }
      ).toJS(),
      (new Map({ object: { locationBeforeTransitions: null } })).toJS(),
    );
  });

  it("should update location when calls 'LOCATION_CHANGE' action", () => {
    assert.deepEqual(
      reducer(
        new Map({ object: { locationBeforeTransitions: null } }),
        { type: LOCATION_CHANGE, payload: { data: 1 } }
      ).toJS(),
      (new Map({ object: { locationBeforeTransitions: { data: 1 } } })).toJS(),
    );
  });
});
