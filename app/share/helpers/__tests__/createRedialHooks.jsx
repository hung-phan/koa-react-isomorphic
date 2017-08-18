import _ from "lodash";
import faker from "faker";
import React from "react";
import { render } from "enzyme";
import { trigger } from "redial";
import createMockingComponent from "../createMockingComponent";
import redialEnhancer from "../createRedialHooks";

describe("createRedialHooks", () => {
  let Handler;
  let Component;
  let callback;

  beforeEach(() => {
    callback = jest.fn();
    Handler = createMockingComponent("Handler", ["message"]);
    Component = redialEnhancer({ callback })(Handler);
  });

  it("should 'trigger' the 'callback' function with arguments", async () => {
    const args = _.range(4).map(() => faker.random.uuid());
    await trigger("callback", Component, args);
    expect(callback).toBeCalledWith(args);
  });

  it("should render component", () => {
    expect(render(<Component message="Hello world" />)).toMatchSnapshot();
  });
});
