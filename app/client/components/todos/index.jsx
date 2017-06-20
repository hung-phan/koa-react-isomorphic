/* @flow */
import React from "react";
import compose from "lodash/flowRight";
import { graphql, createFragmentContainer } from "react-relay";
import TodosHeader from "./TodosHeader";
import TodosAdd from "./TodosAdd";
import TodosBody from "./TodosBody";
import TodosFooter from "./TodosFooter";
import createRedialHooks from "../../helpers/createRedialHooks";
import { UPDATE_HEADER_HOOK } from "../../helpers/fetchData";
import type { todos_viewer } from "./__generated__/todos_viewer.graphql";

export const Todos = (
  { viewer, relay }: { viewer: todos_viewer, relay: Object }
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
  Component => createFragmentContainer(Component, {
    viewer: graphql`
      fragment todos_viewer on Viewer {
        todos(last: 10) {
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
  })
)(Todos);
