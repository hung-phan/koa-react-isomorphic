/* @flow */
import fetch from "./fetch";

class FetcherBase {
  payloads: any[];

  constructor(payloads: any[]) {
    this.payloads = payloads;
  }

  async fetch(operation: Object, variables: Object) { // eslint-disable-line
    const resp = await fetch("/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    });

    return resp.json();
  }

  toJSON() {
    return this.payloads;
  }
}

class ServerFetcher extends FetcherBase {
  constructor() {
    super([]);
  }

  fetch(operation: Object, variables: Object) {
    const superFetch = super.fetch;

    return (async () => {
      const index = this.payloads.length;
      this.payloads.push(null);
      const payload = await superFetch(operation, variables);
      this.payloads[index] = payload;
      return payload;
    })();
  }
}

class ClientFetcher extends FetcherBase {
  fetch(operation: Object, variables: Object) {
    if (this.payloads.length) {
      return this.payloads.shift();
    }

    return super.fetch(operation, variables);
  }
}

export default () => {
  if (process.env.RUNTIME_ENV === "client") {
    return new ClientFetcher(window.prerenderData || []);
  }

  return new ServerFetcher();
};
