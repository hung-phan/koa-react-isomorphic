/* @flow */
import { graphql } from "react-relay";
import Api from "../../shared/helpers/api";
import createClientMutationId from "./createClientMutationId";

const mutation = graphql`
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

export default (id: string) => Api.commitMutation({
  mutation,
  variables: { id, clientMutationId: createClientMutationId() }
});
