/* @flow */
import React from "react";
import compose from "lodash/flowRight";
import { graphql, createRefetchContainer } from "react-relay";
import TodosHeader from "./TodosHeader";
import TodosAdd from "./TodosAdd";
import TodosBody from "./TodosBody";
import TodosFooter from "./TodosFooter";
import type { todos_viewer } from "./__generated__/todos_viewer.graphql";

export const Todos = ({ viewer, relay }: {
  viewer: todos_viewer,
  relay: Object
}) => (
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
  Component => createRefetchContainer(
    Component,
    {
      viewer: graphql.experimental`
        fragment todos_viewer on Viewer
        @argumentDefinitions(
          numberOfTodos: { type: "Int", defaultValue: 10 }
        ) {
          id
          todos(last: $numberOfTodos) @connection(key: "AllTodos_todos", filters: []) {
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
    },
    graphql.experimental`
      query todos_RefetchQuery($numberOfTodos: Int) {
        viewer {
          ...todos_viewer @arguments(numberOfTodos: $numberOfTodos)
        }
      }
    `
  )
)(Todos);
