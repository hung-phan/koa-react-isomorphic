import React from "react";
import { shallow } from "enzyme";
import TodosFooter from "../TodosFooter";

describe("Component: TodosFooter", () => {
  let component;

  beforeEach(() => {
    component = shallow(<TodosFooter />);
  });

  it("should render 'Go to static page' link", () => {
    expect(component.html()).toContain("Go to static page");
  });
});
