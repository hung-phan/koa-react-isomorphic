import { List } from "immutable";
import td from "testdouble";
import React from "react";
import { shallow } from "enzyme";
import { Todos } from "../index";
import TodosHeader from "../TodosHeader";
import TodosAdd from "../TodosAdd";
import TodosBody from "../TodosBody";

describe("Component: Todos", () => {
  const todos = List([
    // eslint-disable-line new-cap
    { text: "Todo 1", complete: false },
    { text: "Todo 2", complete: false },
    { text: "Todo 3", complete: false },
    { text: "Todo 4", complete: false }
  ]);
  let actions;
  let component;

  beforeEach(() => {
    actions = {
      addTodo: td.function(),
      removeTodo: td.function(),
      completeTodo: td.function()
    };
    component = shallow(<Todos todos={todos} actions={actions} />);
  });

  it("should have 'TodosHeader' component", () => {
    expect(component.find(TodosHeader).node).toBeDefined();
  });

  it("should have 'TodosAdd' component", () => {
    expect(component.find(TodosAdd).node).toBeDefined();
  });

  it("should have 'TodosBody' component", () => {
    expect(component.find(TodosBody).node).toBeDefined();
  });
});
