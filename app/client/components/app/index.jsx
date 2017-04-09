/* @flow */
/* global process */
import React from "react";
import { Router } from "react-router";
import Helmet from "../helmet";

export default (props: Object) => {
  let Component = (
    <div>
      <Helmet />
      <Router {...props} />
    </div>
  );

  if (process.env.NODE_ENV === "development") {
    const { AppContainer } = require("react-hot-loader");

    Component = (
      <AppContainer>
        {Component}
      </AppContainer>
    );
  }

  return Component;
};
