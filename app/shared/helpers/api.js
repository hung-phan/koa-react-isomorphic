/* @flow */
import fetch from "isomorphic-fetch";
import {
  commitLocalUpdate,
  commitMutation,
  Environment,
  fetchQuery,
  Network,
  RecordSource,
  Store
} from "relay-runtime";

export default ({
  baseUrl,
  headers = {}
}: {
  baseUrl: string,
  headers: Object
}) => {
  // Default options for the Fetch API
  // https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
  const defaults = {
    mode: baseUrl ? "cors" : "same-origin",
    credentials: baseUrl ? "include" : "same-origin",
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  // Configure Relay environment
  const environment = new Environment({
    handlerProvider: null,
    network: Network.create((operation, variables) =>
      fetch(`${baseUrl}/graphql`, {
        ...defaults,
        method: "POST",
        body: JSON.stringify({
          query: operation.text,
          variables
        })
      }).then(x => x.json())
    ),
    store: new Store(new RecordSource())
  });

  return {
    environment,
    fetch: (url: string, options: Object) =>
      fetch(`${baseUrl}${url}`, {
        ...defaults,
        ...options,
        headers: {
          ...defaults.headers,
          ...(options && options.headers)
        }
      }),
    fetchQuery: fetchQuery.bind(undefined, environment),
    commitMutation: commitMutation.bind(undefined, environment),
    commitLocalUpdate: commitLocalUpdate.bind(undefined, environment)
  };
};
