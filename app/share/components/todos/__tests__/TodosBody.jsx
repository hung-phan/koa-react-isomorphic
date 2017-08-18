import _ from "lodash";
import React from "react";
import { mount } from "enzyme";
import TodosBody from "../TodosBody";

describe("Component: TodosBody", () => {
  const viewer = {
    todos: {
      edges: _(4)
        .range()
        .map(value => ({
          node: {
            id: value,
            text: `Todo ${value + 1}`,
            complete: false
          }
        }))
        .value()
    }
  };
  let component;

  beforeEach(() => {
    component = mount(<TodosBody viewer={viewer} />);
  });

  it("should render component", () => {
    expect(component).toMatchSnapshot();
  });
});
