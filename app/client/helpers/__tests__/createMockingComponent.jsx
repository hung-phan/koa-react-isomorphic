import React from "react";
import { render } from "enzyme";
import createMockingComponent from "../createMockingComponent";

test("createMockingComponent", () => {
  const Component = createMockingComponent("MockingComponent", ["prop1"]);

  expect(render(<Component prop1="value1" prop2="value2" />)).toMatchSnapshot();
});
