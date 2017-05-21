import td from "testdouble";
import faker from "faker";
import React from "react";
import { mount } from "enzyme";
import propName from "redial/lib/propName";
import mockingComponent from "../createMockingComponent";
import Provider from "../FakeReduxProvider";
import redialEnhancer from "../createRedialHooks";

describe("Helper: createRedialHooks", () => {
  let Handler;
  let callback1;
  let callback2;

  beforeEach(() => {
    Handler = mockingComponent("Handler", ["message"]);
    callback1 = td.function();
    callback2 = td.function();
  });

  it("should be a function", () => {
    expect(redialEnhancer).toBeDefined();
    expect(typeof redialEnhancer === "function");
  });

  describe("# component", () => {
    let Component;
    let component;
    let store;

    beforeEach(() => {
      Component = redialEnhancer({ callback1, callback2 })(Handler);
      store = { data: faker.random.uuid() };
      component = mount(
        <Provider store={store}>
          <Component message="Hello world" />
        </Provider>
      );
    });

    it(
      `should define static "${propName}.callback1" and "${propName}.callback2"`,
      () => {
        expect(typeof Component[propName].callback1 === "function");
        expect(typeof Component[propName].callback2 === "function");
      }
    );

    it("should call the 'callback' function with arguments", () => {
      const args = [
        faker.random.uuid(),
        faker.random.uuid(),
        faker.random.uuid(),
        faker.random.uuid()
      ];

      Component[propName].callback1(...args);
      Component[propName].callback2(...args);

      td.verify(callback1(...args));
      td.verify(callback2(...args));
    });

    it("should render message", () => {
      expect(component.text()).toContain("Hello world");
    });
  });
});
