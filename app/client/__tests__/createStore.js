import createStore from "../createStore";

test("createStore default state", () => {
  expect(createStore().getState()).toMatchSnapshot();
});
