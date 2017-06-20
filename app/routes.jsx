/* @flow */
import React from "react";
import { Route } from "found";
import { graphql } from "react-relay";
import createRender from "found/lib/createRender";
import makeRouteConfig from "found/lib/makeRouteConfig";

export const routeConfig = makeRouteConfig(
  <Route path="/">
    <Route
      getComponent={() =>
        new Promise((resolve, reject) => {
          // $FlowFixMe
          require.ensure(
            [],
            require => {
              resolve(require("./client/components/todos").default);
            },
            reject,
            "todos-page"
          );
        })}
      query={graphql`
        query routes_TodoQuery {
          viewer {
            ...todos_viewer
          }
        }
      `}
    />
    <Route
      path="static-page"
      getComponent={() =>
        new Promise((resolve, reject) => {
          // $FlowFixMe
          require.ensure(
            [],
            require => {
              resolve(require("./client/components/static-page").default);
            },
            reject,
            "static-page"
          );
        })}
    />
  </Route>
);

export const render = createRender({});
