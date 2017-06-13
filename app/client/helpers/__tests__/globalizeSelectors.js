import { Map } from "immutable";
import globalizeSelectors from "../globalizeSelectors";

describe("Helper: localize-module", () => {
  it("should return a selector function with state mounted to the local modules", () => {
    const mountPoint = "todos";
    const selector1 = jest.fn();
    const selectors = globalizeSelectors({ selector1 }, mountPoint);

    selectors.selector1(
      Map({
        [mountPoint]: [
          { complete: false, text: "Todo 1" },
          { complete: false, text: "Todo 2" },
          { complete: false, text: "Todo 3" }
        ]
      })
    );

    expect(selector1).toBeCalledWith([
      { complete: false, text: "Todo 1" },
      { complete: false, text: "Todo 2" },
      { complete: false, text: "Todo 3" }
    ]);
  });
});
