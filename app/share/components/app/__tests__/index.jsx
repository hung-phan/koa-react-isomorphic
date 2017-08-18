import React from "react";
import { shallow } from "enzyme";
import createStore from "../../../createStore";
import App from "..";

test("App in development mode", () => {
  const NODE_ENV = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";

  expect(
    shallow(<App store={createStore()} routes="New Routes" />)
  ).toMatchSnapshot();

  process.env.NODE_ENV = NODE_ENV;
});

test("App in production mode", () => {
  expect(
    shallow(<App store={createStore()} routes="New Routes" />)
  ).toMatchSnapshot();
});
