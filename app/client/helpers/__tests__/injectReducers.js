import { createAction, handleAction } from "redux-actions";
import createStore from "../../createStore";
import injectReducers from "../injectReducers";

describe("Helper: injectReducers", () => {
  const NEW_ACTION = "action/NEW_ACTION";
  const newAction = createAction(NEW_ACTION);
  const newReducers = {
    newReducer: handleAction(
      NEW_ACTION,
      {
        next: (state, { payload }) => payload
      },
      null
    )
  };
  let store;

  beforeEach(() => {
    store = createStore();
  });

  it("should not contain 'newReducer' state", () => {
    expect(store.getState().toJS()).not.toHaveProperty("newReducer");
  });

  describe("injectReducers", () => {
    beforeEach(() => {
      injectReducers(store, newReducers);
    });

    it("should inject 'newReducer'", () => {
      expect(store.getState().toJS()).toHaveProperty("newReducer");
    });

    it("should have default state", () => {
      expect(store.getState().toJS().newReducer).toEqual(null);
    });

    it("should work when dispatch 'NEW_ACTION'", () => {
      const data = Symbol("data");
      store.dispatch(newAction(data));

      expect(store.getState().toJS().newReducer).toEqual(data);
    });
  });
});
