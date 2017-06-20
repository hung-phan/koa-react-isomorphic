/* @flow */
import { graphql } from "react-relay";
import { Api } from "../helpers/initialize";
import createClientMutationId from "./createClientMutationId";

export const mutation = graphql`
  mutation CompleteTodoMutation($input: CompleteTodoMutationInput!) {
    completeTodo(input: $input) {
      todo{
        id
        text
        complete
      }
    }
  }
`;

export const commit = (id: string) => Api.commitMutation({
  mutation,
  variables: { id, clientMutationId: createClientMutationId() }
});
