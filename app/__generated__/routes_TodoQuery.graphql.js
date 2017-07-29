/**
 * @flow
 * @relayHash 893c1bb7b68a6ca539715f5e42b14532
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type routes_TodoQueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query routes_TodoQuery {
  viewer {
    ...todos_viewer
    id
  }
}

fragment todos_viewer on Viewer {
  todos(last: 10) {
    edges {
      node {
        id
        text
        complete
      }
    }
  }
  numberOfTodos
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routes_TodoQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "todos_viewer",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "routes_TodoQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "routes_TodoQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "last",
                "value": 10,
                "type": "Int"
              }
            ],
            "concreteType": "TodoConnection",
            "name": "todos",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TodoEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Todo",
                    "name": "node",
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
            "storageKey": "todos{\"last\":10}"
          },
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
    ]
  },
  "text": "query routes_TodoQuery {\n  viewer {\n    ...todos_viewer\n    id\n  }\n}\n\nfragment todos_viewer on Viewer {\n  todos(last: 10) {\n    edges {\n      node {\n        id\n        text\n        complete\n      }\n    }\n  }\n  numberOfTodos\n}\n"
};

module.exports = batch;
