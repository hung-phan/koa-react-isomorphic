import React from "react";
import { Link } from "found";
import { shallow } from "enzyme";
import TodosFooter from "../TodosFooter";

jest.mock("found", () => ({
  Link: require("../../../helpers/createMockingComponent").default("Link", [
    "children"
  ])
}));

describe("Component: TodosFooter", () => {
  let component;

  beforeEach(() => {
    component = shallow(<TodosFooter />);
  });

  it("should render 'Go to static page' link", () => {
    expect(component.html()).toContain("Go to static page");
  });
});
