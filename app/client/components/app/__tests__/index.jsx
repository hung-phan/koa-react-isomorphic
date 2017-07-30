import React from "react";
import { shallow } from "enzyme";
import App from "..";

test("App in development mode", () => {
  const NODE_ENV = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";

  expect(
    shallow(<App routes="New Routes" />)
  ).toMatchSnapshot();

  process.env.NODE_ENV = NODE_ENV;
});

test("App in production mode", () => {
  expect(
    shallow(<App routes="New Routes" />)
  ).toMatchSnapshot();
});
