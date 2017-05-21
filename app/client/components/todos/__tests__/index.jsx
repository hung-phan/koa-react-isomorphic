import React from "react";
import { shallow } from "enzyme";
import { Todos } from "../index";
import TodosHeader from "../TodosHeader";
import TodosAdd from "../TodosAdd";
import TodosBody from "../TodosBody";

describe("Component: Todos", () => {
  const viewer = {
    todos: {
      edges: [
        {
          node: {
            id: 1,
            text: "Todo 1",
            complete: false
          }
        }
      ]
    },
    numberOfTodos: 10
  };
  const relay = {};
  let component;

  beforeEach(() => {
    component = shallow(<Todos viewer={viewer} relay={relay} />);
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
