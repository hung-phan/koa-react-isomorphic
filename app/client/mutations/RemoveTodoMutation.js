/* @flow */
import { graphql } from "react-relay";
import { Api } from "../helpers/singletons";
import createClientMutationId from "../helpers/createClientMutationId";
import type { RemoveTodoMutationVariables } from "./__generated__/RemoveTodoMutation.graphql";

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

export const commit = (id: string) => {
  const variables: RemoveTodoMutationVariables = {
    input: {
      id,
      clientMutationId: createClientMutationId()
    }
  };

  Api.commitMutation({
    mutation,
    variables,
    configs: [
      {
        type: "NODE_DELETE",
        deletedIDFieldName: "id"
      }
    ]
  });
};
