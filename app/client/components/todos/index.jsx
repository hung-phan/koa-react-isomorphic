/* @flow */
import React from "react";
import compose from "lodash/flowRight";
import Relay from "react-relay/classic";
import TodosHeader from "./TodosHeader";
import TodosAdd from "./TodosAdd";
import TodosBody from "./TodosBody";
import TodosFooter from "./TodosFooter";
import type { ViewerType } from "./types";
import createRedialHooks from "../../helpers/createRedialHooks";
import { UPDATE_HEADER_HOOK } from "../../helpers/initialize";

export const Todos = (
  { viewer, relay }: { viewer: ViewerType, relay: Object }
) => (
  <div className="container">
    <div className="row">
      <TodosHeader />
      <TodosAdd relay={relay} viewer={viewer} />
      <TodosBody viewer={viewer} />
      <TodosFooter />
    </div>
  </div>
);

export default compose(
  createRedialHooks({
    [UPDATE_HEADER_HOOK]: ({ helmetObserver }) => {
      helmetObserver.next({
        link: [
          {
            rel: "prefetch",
            href: window.javascriptAssets["static-page"],
            as: "script"
          }
        ]
      });
    }
  }),
  Component => Relay.createContainer(Component, {
    initialVariables: {
      numberOfTodos: 10
    },
    fragments: {
      viewer: () => Relay.QL`
          fragment on Viewer {
            todos(last: $numberOfTodos) {
              edges {
                node {
                  id
                  text
                  complete
                }
              }
            }
            numberOfTodos
          }
        `
    }
  })
)(Todos);
