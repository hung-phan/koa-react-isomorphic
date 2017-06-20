/* @flow */
import { Resolver } from "found-relay";
import queryMiddleware from "farce/lib/queryMiddleware";
import {
  commitLocalUpdate,
  commitMutation,
  Environment,
  fetchQuery,
  Network,
  RecordSource,
  Store
} from "relay-runtime";
import createFetcher from "../../shared/helpers/createFetcher";
import fetch from "../../shared/helpers/fetch";

export default () => {
  const fetcher = createFetcher();
  const environment = new Environment({
    network: Network.create(fetcher.fetch),
    store: new Store(new RecordSource())
  });
  const resolver = new Resolver(environment);

  return {
    environment,
    resolver,
    fetch,
    fetcher,
    historyMiddlewares: [queryMiddleware],
    fetchQuery: fetchQuery.bind(undefined, environment),
    commitMutation: commitMutation.bind(undefined, environment),
    commitLocalUpdate: commitLocalUpdate.bind(undefined, environment)
  };
};
