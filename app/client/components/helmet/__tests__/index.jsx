import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import createStore from "../../../createStore";
import Helmet from "..";

test("Helmet", () => {
  expect(
    mount(
      <Provider key="provider" store={createStore()}>
        <div>
          <Helmet />
        </div>
      </Provider>
    )
  ).toMatchSnapshot();
});
