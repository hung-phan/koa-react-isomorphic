/* @flow */
import { graphql } from "react-relay";
import { Api } from "../helpers/initialize";
import createClientMutationId from "./createClientMutationId";

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

export const commit = (text: string) => Api.commitMutation({
  mutation,
  variables: { text, clientMutationId: createClientMutationId() }
});
