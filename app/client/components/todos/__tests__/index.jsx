import React from "react";
import { shallow } from "enzyme";
import Todos from "..";

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

  it("should render component", () => {
    expect(shallow(<Todos viewer={viewer} relay={relay} />)).toMatchSnapshot();
  });
});
