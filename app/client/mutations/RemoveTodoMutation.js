/* @flow */
import { graphql } from "react-relay";
import { Api } from "../helpers/initialize";
import createClientMutationId from "./createClientMutationId";

export const mutation = graphql`
  mutation RemoveTodoMutation($input: RemoveTodoMutationInput!) {
    removeTodo(input: $input) {
      id
      viewer {
        numberOfTodos 
      }
    }
  }
`;

export const commit = (id: string) => Api.commitMutation({
  mutation,
  variables: { id, clientMutationId: createClientMutationId() }
});
