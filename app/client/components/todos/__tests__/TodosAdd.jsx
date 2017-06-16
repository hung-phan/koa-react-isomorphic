import React from "react";
import { mount } from "enzyme";

describe("Component: TodosAdd", () => {
  let TodosAdd;
  let Relay;
  let AddTodoMutation;
  let component;
  let randomUUID;

  beforeEach(() => {
    jest.mock("react-relay", () => jest.genMockFromModule("react-relay"));
    jest.mock("../../../mutations/AddTodoMutation", () =>
      jest.genMockFromModule("../../../mutations/AddTodoMutation")
    );

    Relay = require("react-relay");
    AddTodoMutation = require("../../../mutations/AddTodoMutation").default;
    TodosAdd = require("../TodosAdd").default;

    component = mount(
      <TodosAdd
        viewer={{ numberOfTodos: 100 }}
        relay={{ setVariables: jest.fn() }}
      />
    );
  });

  afterEach(() => {
    jest.unmock("react-relay");
    jest.unmock("../../../mutations/AddTodoMutation");
  });

  it("should define default value for 'state.todo'", () => {
    expect(component.state().todo).toEqual("");
  });

  describe("# click on 'Add Todo' button", () => {
    let button;

    beforeEach(() => {
      component.setState({ todo: randomUUID });

      button = component.find("button");
      button.simulate("click");
    });

    it("should call 'Relay.Store.commitUpdate' with 'AddTodoMutation'", () => {
      expect(
        Relay.Store.commitUpdate.mock.calls[0][0] instanceof AddTodoMutation
      );
    });

    it("should reset 'state.todo'", () => {
      expect(component.state().todo).toEqual("");
    });
  });
});
