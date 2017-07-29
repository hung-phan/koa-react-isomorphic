/**
 * @flow
 * @relayHash 7bec993cb59b1cb538214195d5c2ed26
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type RemoveTodoMutationVariables = {|
  input: {
    id: string;
    clientMutationId?: ?string;
  };
|};

export type RemoveTodoMutationResponse = {|
  +removeTodo: ?{|
    +id: ?string;
    +viewer: ?{|
      +numberOfTodos: ?number;
    |};
  |};
|};
*/


/*
mutation RemoveTodoMutation(
  $input: RemoveTodoMutationInput!
) {
  removeTodo(input: $input) {
    id
    viewer {
      numberOfTodos
      id
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "RemoveTodoMutationInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveTodoMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "RemoveTodoMutationInput!"
          }
        ],
        "concreteType": "RemoveTodoMutationPayload",
        "name": "removeTodo",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Viewer",
            "name": "viewer",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "numberOfTodos",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "RemoveTodoMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "RemoveTodoMutationInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "RemoveTodoMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "RemoveTodoMutationInput!"
          }
        ],
        "concreteType": "RemoveTodoMutationPayload",
        "name": "removeTodo",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Viewer",
            "name": "viewer",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "numberOfTodos",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation RemoveTodoMutation(\n  $input: RemoveTodoMutationInput!\n) {\n  removeTodo(input: $input) {\n    id\n    viewer {\n      numberOfTodos\n      id\n    }\n  }\n}\n"
};

module.exports = batch;
