/* @flow */
/* global process */
import React from "react";
import Helmet from "../helmet";

export default ({ router }: { router: Object}) => {
  let Component = (
    <div>
      <Helmet />
      {router}
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
