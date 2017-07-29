/**
 * @flow
 * @relayHash 9fe6b05bc87bd27d7275aff32bc168d1
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type CompleteTodoMutationVariables = {|
  input: {
    id: string;
    clientMutationId?: ?string;
  };
|};

export type CompleteTodoMutationResponse = {|
  +completeTodo: ?{|
    +todo: ?{|
      +id: string;
      +text: ?string;
      +complete: ?boolean;
    |};
  |};
|};
*/


/*
mutation CompleteTodoMutation(
  $input: CompleteTodoMutationInput!
) {
  completeTodo(input: $input) {
    todo {
      id
      text
      complete
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
        "type": "CompleteTodoMutationInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CompleteTodoMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "CompleteTodoMutationInput!"
          }
        ],
        "concreteType": "CompleteTodoMutationPayload",
        "name": "completeTodo",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Todo",
            "name": "todo",
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
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "text",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "complete",
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
  "name": "CompleteTodoMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "CompleteTodoMutationInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "CompleteTodoMutation",
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
            "type": "CompleteTodoMutationInput!"
          }
        ],
        "concreteType": "CompleteTodoMutationPayload",
        "name": "completeTodo",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Todo",
            "name": "todo",
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
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "text",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "complete",
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
  "text": "mutation CompleteTodoMutation(\n  $input: CompleteTodoMutationInput!\n) {\n  completeTodo(input: $input) {\n    todo {\n      id\n      text\n      complete\n    }\n  }\n}\n"
};

module.exports = batch;
