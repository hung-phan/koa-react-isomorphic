import React from "react";
import { shallow } from "enzyme";
import StaticPage from "../index";

describe("Component: StaticPage", () => {
  let component;

  beforeEach(() => {
    component = shallow(<StaticPage />);
  });

  it("should render component", () => {
    expect(component).toMatchSnapshot();
  });
});
