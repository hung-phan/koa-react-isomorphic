import React from "react";
import faker from "faker";
import { mount } from "enzyme";

jest.mock("react-relay", () => jest.genMockFromModule("react-relay"));
jest.mock("../../../mutations/AddTodoMutation", () =>
  jest.genMockFromModule("../../../mutations/AddTodoMutation")
);

describe("Component: TodosAdd", () => {
  let TodosAdd;
  let AddTodoMutation;
  let component;
  let randomUUID;
  let viewerID;

  beforeEach(() => {
    viewerID = faker.random.uuid();
    randomUUID = faker.random.uuid();
    AddTodoMutation = require("../../../mutations/AddTodoMutation");
    TodosAdd = require("../TodosAdd").default;

    component = mount(
      <TodosAdd
        viewer={{ id: viewerID, numberOfTodos: 100 }}
        relay={{ fetch: jest.fn() }}
      />
    );
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

    it("should call 'AddTodoMutation.commit'", () => {
      expect(AddTodoMutation.commit).toHaveBeenCalledWith(randomUUID, viewerID);
    });

    it("should reset 'state.todo'", () => {
      expect(component.state().todo).toEqual("");
    });
  });
});
