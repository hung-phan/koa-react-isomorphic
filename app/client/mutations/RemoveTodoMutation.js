/* @flow */
import { graphql } from "react-relay";
import Api from "../../shared/helpers/api";
import createClientMutationId from "./createClientMutationId";

const mutation = graphql`
  mutation RemoveTodoMutation($input: RemoveTodoMutationInput!) {
    removeTodo(input: $input) {
      id
      viewer {
        numberOfTodos 
      }
    }
  }
`;

export default (id: string) => Api.commitMutation({
  mutation,
  variables: { id, clientMutationId: createClientMutationId() }
});
