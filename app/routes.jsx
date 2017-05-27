/* @flow */
import React from "react";
import { createRoutes, Route, IndexRoute } from "react-router";
import ViewerQuery from "./client/queries/viewer";

export default createRoutes(
  <Route path="/">
    <IndexRoute
      getComponent={(nextState, cb) => {
        // $FlowFixMe
        require.ensure(
          [],
          require => {
            cb(null, require("./client/components/todos").default);
          },
          "todos-page"
        );
      }}
      queries={ViewerQuery}
    />
    <Route
      path="static-page"
      getComponent={(nextState, cb) => {
        // $FlowFixMe
        require.ensure(
          ["./client/components/static-page"],
          require => {
            cb(null, require("./client/components/static-page").default);
          },
          "static-page"
        );
      }}
    />
  </Route>
);
