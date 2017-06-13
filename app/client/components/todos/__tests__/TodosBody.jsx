import React from "react";
import { mount } from "enzyme";
import { noop } from "lodash";
import TodosBody from "../TodosBody";

describe("Component: TodosBody", () => {
  const todos = [
    { text: "Todo 1", complete: false },
    { text: "Todo 2", complete: false },
    { text: "Todo 3", complete: false },
    { text: "Todo 4", complete: false }
  ];

  it("should display a list of todos", () => {
    const component = mount(
      <TodosBody todos={todos} removeTodo={noop} completeTodo={noop} />
    );
    const trComponents = component.find("tr");

    expect(trComponents).toHaveLength(todos.length);
  });

  it("should call 'removeTodo' when click on the delete button", () => {
    const removeTodo = jest.fn();
    const component = mount(
      <TodosBody todos={todos} removeTodo={removeTodo} completeTodo={noop} />
    );
    const trComponents = component.find("tr");

    trComponents.forEach((tr, index) => {
      const removeButton = tr.find(".btn-danger");
      removeButton.simulate("click");

      expect(removeTodo.mock.calls[index][0]).toBe(index);
    });
    expect(removeTodo.mock.calls.length).toEqual(todos.length);
  });

  it("should call 'completeTodo' when click on the complete button", () => {
    const completeTodo = jest.fn();
    const component = mount(
      <TodosBody todos={todos} removeTodo={noop} completeTodo={completeTodo} />
    );
    const trComponents = component.find("tr");

    trComponents.forEach((tr, index) => {
      const completeButton = tr.find(".btn-success");
      completeButton.simulate("click");

      expect(completeTodo.mock.calls[index][0]).toBe(index);
    });
    expect(completeTodo.mock.calls.length).toEqual(todos.length);
  });
});
