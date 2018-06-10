/* @flow */
import React from "react";
import { graphql } from "react-relay";
import { Route, createRender, makeRouteConfig } from "found";

export const routeConfig = makeRouteConfig(
  <Route path="/">
    <Route
      getComponent={() =>
        import(/* webpackChunkName: "todos-page", webpackPreload: true */ "./share/components/todos").then(
          module => module.default
        )
      }
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
        import(/* webpackChunkName: "static-page", webpackPrefetch: true */ "./share/components/static-page").then(
          module => module.default
        )
      }
    />
  </Route>
);

export const render = createRender({
  renderError: (
    { error } // eslint-disable-line react/prop-types
  ) => <div>{error.status === 404 ? "Not found" : "Error"}</div>
});
