/* @flow */
import React from "react";
import Relay from "react-relay/classic";
import { compose } from "recompose";
import TodosHeader from "./TodosHeader";
import TodosAdd from "./TodosAdd";
import TodosBody from "./TodosBody";
import TodosFooter from "./TodosFooter";
import type { ViewerType } from "./types";
import createRedialHooks from "../../helpers/createRedialHooks";
import { UPDATE_HEADER_HOOK } from "../../helpers/fetchData";
import AddTodoMutation from "../../mutations/AddTodoMutation";
import RemoveTodoMutation from "../../mutations/RemoveTodoMutation";
import CompleteTodoMutation from "../../mutations/CompleteTodoMutation";

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
            ${AddTodoMutation.getFragment("viewer")}
            ${RemoveTodoMutation.getFragment("viewer")}
            ${CompleteTodoMutation.getFragment("viewer")}
          }
        `
    }
  })
);

export default enhance(Todos);
