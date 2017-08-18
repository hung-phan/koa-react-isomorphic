/* @flow */
import { graphql } from "react-relay";
import { Api } from "../helpers/singletons";
import createClientMutationId from "../helpers/createClientMutationId";
import type { CompleteTodoMutationVariables } from "./__generated__/CompleteTodoMutation.graphql";

export const mutation = graphql`
  mutation CompleteTodoMutation($input: CompleteTodoMutationInput!) {
    completeTodo(input: $input) {
      todo {
        id
        text
        complete
      }
    }
  }
`;

export const commit = (id: string) => {
  const variables: CompleteTodoMutationVariables = {
    input: {
      id,
      clientMutationId: createClientMutationId()
    }
  };

  Api.commitMutation({ mutation, variables });
};
