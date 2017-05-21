import React from "react";
import { shallow } from "enzyme";
import TodosHeader from "../TodosHeader";

describe("Component: TodosHeader", () => {
  it("should render 'TodosHeader' component", () => {
    expect(shallow(<TodosHeader />)).toBeDefined();
  });

  it("should have title 'Todos List'", () => {
    const component = shallow(<TodosHeader />);
    expect(component.text()).toEqual("Todos List");
  });
});
