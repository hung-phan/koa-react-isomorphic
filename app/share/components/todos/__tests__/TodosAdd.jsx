import React from "react";
import { mount } from "enzyme";
import TodosAdd from "../TodosAdd";

describe("Component: TodosAdd", () => {
  it("should define state.todo", () => {
    const component = mount(<TodosAdd />);

    expect(component.state().todo).toEqual("");
  });

  it("should call the addTodo action when click on the 'Add Todo' button", () => {
    const callback = jest.fn();
    const component = mount(<TodosAdd addTodo={callback} />);
    const input = component.find("input");
    const button = component.find("button");

    input.simulate("change", {
      target: {
        value: "do chore"
      }
    });
    expect(component.state().todo).toEqual("do chore");

    button.simulate("click");
    expect(callback).toBeCalledWith("do chore");
    expect(component.state().todo).toEqual("");
  });
});
