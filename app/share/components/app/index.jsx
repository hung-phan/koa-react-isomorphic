/* @flow */
/* global process */
import React from "react";

export default ({ router }: { router: Object }) => {
  let Component = <div>{router}</div>;

  if (process.env.NODE_ENV === "development") {
    const { AppContainer } = require("react-hot-loader");

    Component = <AppContainer>{Component}</AppContainer>;
  }

  return Component;
};
