import globalizeSelectors from "../globalizeSelectors";

test("globalizeSelectors", () => {
  const mountPoint = "todos";
  const selector1 = jest.fn();
  const selectors = globalizeSelectors({ selector1 }, mountPoint);
  const data = [
    { complete: false, text: "Todo 1" },
    { complete: false, text: "Todo 2" },
    { complete: false, text: "Todo 3" }
  ];

  selectors.selector1({ [mountPoint]: data });
  expect(selector1).toBeCalledWith(data);
});
