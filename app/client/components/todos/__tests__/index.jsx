import { List } from "immutable";
import React from "react";
import { render } from "enzyme";
import { Provider } from "react-redux";
import createStore from "../../../createStore";
import todosReducer, {
  mountPoint as todosMountPoint,
  setTodos
} from "../logicBundle";
import injectReducers from "../../../helpers/injectReducers";
import Todos from "..";

describe("Component: Todos", () => {
  let store;

  beforeEach(() => {
    store = createStore();
    injectReducers(store, { [todosMountPoint]: todosReducer });
    store.dispatch(
      setTodos(
        List([
          { text: "Todo 1", complete: false },
          { text: "Todo 2", complete: false },
          { text: "Todo 3", complete: false },
          { text: "Todo 4", complete: false }
        ])
      )
    );
  });

  it("should render component", () => {
    expect(
      render(
        <Provider key="provider" store={store}>
          <div>
            <Todos />
          </div>
        </Provider>
      )
    ).toMatchSnapshot();
  });
});
