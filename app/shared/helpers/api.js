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

const create = (baseUrl: string) => {
  // Default options for the Fetch API
  // https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
  const defaults = {
    mode: baseUrl ? "cors" : "same-origin",
    credentials: baseUrl ? "include" : "same-origin",
    headers: {
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
    fetch: <T>(url: string, options: { [key: string]: any } = {}): Promise<T> =>
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

let baseUrl;

if (process.env.RUNTIME_ENV === "client") {
  baseUrl = "";
} else {
  const PORT = process.env.PORT;

  if (!PORT) {
    throw new Error("Missing 'process.env.PORT'.");
  }

  baseUrl = `http://localhost:${PORT}`;
}

export default create(baseUrl);
