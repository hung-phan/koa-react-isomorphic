/* @flow */
import { graphql } from "react-relay";
import Api from "../../shared/helpers/api";
import createClientMutationId from "./createClientMutationId";

const mutation = graphql`
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

export default (text: string) => Api.commitMutation({
  mutation,
  variables: { text, clientMutationId: createClientMutationId() }
});
