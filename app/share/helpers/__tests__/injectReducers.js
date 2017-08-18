import { createAction, handleActions } from "redux-actions";
import createStore from "../../createStore";
import injectReducers from "../injectReducers";

describe("injectReducers", () => {
  const mountPoint = "newReducer";
  const NEW_ACTION = "action/NEW_ACTION";
  const newAction = createAction(NEW_ACTION);
  const newReducer = {
    [mountPoint]: handleActions(
      {
        [NEW_ACTION]: (state, { payload }) => payload
      },
      null
    )
  };
  let store;

  beforeEach(() => {
    store = createStore();
  });

  it(`should not contain '${mountPoint}' state`, () => {
    expect(store.getState().toJS()).not.toHaveProperty(mountPoint);
  });

  describe("injecting", () => {
    beforeEach(() => {
      injectReducers(store, newReducer);
    });

    it(`should inject '${mountPoint}'`, () => {
      expect(store.getState().toJS()).toHaveProperty(mountPoint);
    });

    it("should have default state", () => {
      expect(store.getState().toJS()[mountPoint]).toEqual(null);
    });

    it("should work when dispatch 'NEW_ACTION'", () => {
      const data = Symbol("data");
      store.dispatch(newAction(data));

      expect(store.getState().toJS()[mountPoint]).toEqual(data);
    });
  });
});
