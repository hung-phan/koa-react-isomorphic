import td from 'testdouble';
import { assert } from 'chai';
import { createAction, handleAction } from 'redux-actions';
import createStore from '../../createStore';
import injectReducers from '../injectReducers';

describe('Helper: injectReducers', () => {
  const NEW_ACTION = 'action/NEW_ACTION';
  const newAction = createAction(NEW_ACTION);
  const newReducers = {
    newReducer: handleAction(NEW_ACTION, {
      next: (state, { payload }) => payload,
    }, null),
  };
  let store;

  beforeEach(() => {
    store = createStore();
  });

  it("should not contain 'newReducer' state", () => {
    assert.notProperty(store.getState(), 'newReducer');
  });

  context('injectReducers', () => {
    beforeEach(() => {
      injectReducers(store, newReducers);
    });

    it("should inject 'newReducer'", () => {
      assert.property(store.getState(), 'newReducer');
    });

    it('should have default state', () => {
      assert.equal(store.getState().newReducer, null);
    });

    it("should work when dispatch 'NEW_ACTION'", () => {
      const data = Symbol('data');
      store.dispatch(newAction(data));

      assert.equal(store.getState().newReducer, data);
    });
  });
});
