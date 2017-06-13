import React from "react";
import { mount } from "enzyme";
import faker from "faker";
import TodosAdd, { __RewireAPI__ as Module } from "../TodosAdd";

describe("Component: TodosAdd", () => {
  let viewer;
  let component;
  let Relay;
  let relay;
  let addTodoMutation;
  let randomUUID;

  beforeEach(() => {
    randomUUID = faker.random.uuid();
    Relay = {
      Store: {
        commitUpdate: jest.fn()
      }
    };
    relay = { setVariables: jest.fn() };
    addTodoMutation = jest.fn(() => ({ randomUUID }));
    viewer = { numberOfTodos: 100 };

    Module.__Rewire__("Relay", Relay);
    component = mount(<TodosAdd viewer={viewer} relay={relay} />);
  });

  afterEach(() => {
    Module.__ResetDependency__("Relay");
  });

  it("should define default value for 'state.todo'", () => {
    expect(component.state().todo).toEqual("");
  });

  describe("# click on 'Add Todo' button", () => {
    let button;

    beforeEach(() => {
      Module.__Rewire__("AddTodoMutation", addTodoMutation);
      component.setState({ todo: randomUUID });

      button = component.find("button");
      button.simulate("click");
    });

    afterEach(() => {
      Module.__ResetDependency__("AddTodoMutation");
    });

    it("should call 'AddTodoMutation' with 'viewer', and 'text'", () => {
      expect(addTodoMutation).toBeCalledWith({ viewer, text: randomUUID });
    });

    it("should call 'Relay.Store.commitUpdate' with 'AddTodoMutation'", () => {
      expect(Relay.Store.commitUpdate).toBeCalledWith({ randomUUID });
    });

    it("should reset 'state.todo'", () => {
      expect(component.state().todo).toEqual("");
    });
  });
});
