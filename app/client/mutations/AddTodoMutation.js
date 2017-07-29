/* @flow */
import { graphql } from "react-relay";
import { Api } from "../helpers/singletons";
import createClientMutationId from "../helpers/createClientMutationId";
import type { AddTodoMutationVariables } from "./__generated__/AddTodoMutation.graphql";

export const mutation = graphql`
  mutation AddTodoMutation($input: AddTodoMutationInput!) {
    addTodo(input: $input) {
      todoEdge {
        node {
          id
          text
          complete
        }
      }
      viewer {
        numberOfTodos
      }
    }
  }
`;

export const commit = (text: string, parentID: string) => {
  const variables: AddTodoMutationVariables = {
    input: {
      text,
      clientMutationId: createClientMutationId()
    }
  };

  Api.commitMutation({
    mutation,
    variables,
    configs: [{
      type: "RANGE_ADD",
      parentID,
      connectionInfo: [{
        key: "AllTodos_todos",
        rangeBehavior: "append",
      }],
      edgeName: "todoEdge",
    }]
  });
};
